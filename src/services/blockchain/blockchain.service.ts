import {
  sporeABI,
  paradABI,
  sporeAddress,
  coreConfig,
  paradAddress,
} from "@/utils/blockchain/blockchainData";
import { readContract, readContracts } from "@wagmi/core";
import {
  IDebatesData,
  IMetadata,
  ITopicData, ITopicMetadata,
  ITopicsData,
} from "@/interfaces/debates.interface";
import {
  convertBigIntArrayToNumber,
  convertEnumToString,
} from "@/utils/converter";
import { title } from "process";
import fetchFromIPFS from "@/utils/blockchain/fetchFromIPFS";
import fetchTopicMetadataFromIPFS from "@/utils/blockchain/fetchFromIPFS";

const contract = {
  address: sporeAddress,
  abi: sporeABI,
};

const fetchUri = async (
  uri: string | undefined
): Promise<IMetadata | undefined> => {
  if (!uri) {
    return;
  }
  try {
    const response = await fetch(uri);
    const result = await response.json();

    return result as IMetadata;
  } catch (error) {
    throw new Error("Failed to fetch uri:" + error || "Unknown error");
  }
};

const getTopicList = async (): Promise<number[]> => {
  try {
    const result = await readContract(coreConfig, {
      ...contract,
      functionName: "readGroupIdKeys",
    });

 
    

    return result as number[];
  } catch (error) {
    throw new Error("Failed to get topics:" + error || "Unknown error");
  }
};

/* const getBulkIsHotForGroups = async (): Promise<bigint[]> => {
  try {
    const result = await readContract(coreConfig, {
      ...contract,
      functionName: "getBulkIsHotForGroups",
    });

    return result as bigint[];
  } catch (error) {
    throw new Error("Failed to get topics:" + error || "Unknown error");
  }
} */

const getUriForDispute = async (
  topicId: number | string,
  debateId: number | string
): Promise<{
  uri: string | undefined;
  metadata: IMetadata | undefined;
}> => {
  try {
    const uri = await readContract(coreConfig, {
      ...contract,
      functionName: "getUriForDispute",
      args: [topicId, debateId],
    });

    const metadata = await fetchUri(uri as string);

    return { uri: uri as string | undefined, metadata };
  } catch (error) {
    throw new Error(
      "Failed to get uri for dispute:" + error || "Unknown error"
    );
  }
};


const getDisputesByTopicList = async (
  topicList: number[] | bigint[]
): Promise<ITopicsData> => {
  try {
    const getDisputesContractCalls = topicList.map((topicId) => ({
      address: contract.address,
      abi: contract.abi,
      functionName: "getDisputes",
      args: [topicId],
    }));

    const rawResultTemp = await readContracts(coreConfig, {
      contracts: getDisputesContractCalls
    });

    const rawResult: any = []

    rawResultTemp.forEach((topic: any, topicIndex: number) => {

      
    rawResult[topicIndex] = topic.result

    rawResult[topicIndex].forEach((dispute: any) => {
      dispute.topicId = Number(topicList[topicIndex])
    })
    });

    const grpIdContractCalls = topicList.map((topicId) => ({
      address: contract.address,
      abi: contract.abi,
      functionName: "groupIdURIs",
      args: [topicId],
    }));

    const topicsURIsTemp = await readContracts(coreConfig, {
      contracts: grpIdContractCalls
    });

    const topicsURIs = topicsURIsTemp.map((topic: any, topicIndex: number) => ({
      topicId: Number(topicList[topicIndex]),
      ipfsUrl: topic.result,
    }));
    
    // Fetched image and title from IPFS
/*     console.log(topicsURIs); */
    
    type MetadataURIs = {
      topicId: number;
      name: string;
      image: string;
    }

    const metadataURIs: MetadataURIs[] = (
      await Promise.all(
        topicsURIs.map(async (topic: any) => {
          const metadata = await fetchTopicMetadataFromIPFS(topic as string);
          return {
            ...metadata,
            topicId: Number(metadata?.topicId),
          } as MetadataURIs;
        })
      )
    ).filter((item) => item !== null); // or item !== undefined

    //////////////////////

    const getParticipantsContractCalls = topicList.map((topicId) => ({
      address: contract.address,
      abi: contract.abi,
      functionName: "getParticipantsInGroup",
      args: [topicId],
    }));

    const participantsResult = await readContracts(coreConfig, {
      contracts: getParticipantsContractCalls
    });

    const topicsParticipants = participantsResult.map((participants: any, topicIndex: number) => ({
      topicId: Number(topicList[topicIndex]),
      participants: Number(participants.result),
    }));

    const getTopicParticipants: any = (topicId: number) => {
      return (topicsParticipants.find((el: any) => el.topicId === topicId))?.participants
    }
    

    /* console.log(metadataURIs); */
    
    

    const result: ITopicsData = {
      topics: await Promise.all(
        rawResult.map(async (item: any) => ({
          id: item[0].topicId,
          title: metadataURIs.find(el => el.topicId === Number(item[0].topicId))?.name || "No title provided",
          image: metadataURIs.find(el => el.topicId === Number(item[0].topicId))?.image || "",
          participantsCount: getTopicParticipants(
            item[0].topicId
          ),
          debates: await Promise.all(
            item.map(async (debate: any, debateIndex: number) => {
              const { uri, metadata } = await getUriForDispute(
                debate.topicId,
                debateIndex
              );                

              return {
                id: debateIndex,
                status: convertEnumToString(debate.status),
                isHot: debate.isHot,
                point: debate.point,
                members: debate.members,
                memberShares: convertBigIntArrayToNumber(debate.memberShares),
                memberChoices: convertBigIntArrayToNumber(debate.memberChoices),
                qtyMembers: Number(debate.qtyMembers),
                needQtyMembers: Number(debate.needQtyMembers),
                qtyAnswers: Number(debate.qtyAnswers),
                pointScores: convertBigIntArrayToNumber(debate.pointScores),
                prizePool: Number(debate.prizePool),
                nftUris: debate.nftUris,
                uri,
                metadata,
              };
            })
          ), 
        }))
      ),
    };
      

    return result;
  } catch (error) {
    throw new Error(
      "Failed to get disputes by topic list:" + error || "Unknown error"
    );
  }
};

const getDecimalsOfToken = async (address: `0x${string}`): Promise<number> => {
  try {
    const result = await readContract(coreConfig, {
      address,
      abi: paradABI,
      functionName: "decimals",
    });

    return result as number;
  } catch (error) {
    throw new Error(
      "Failed to get decimals of token:" + error || "Unknown error"
    );
  }
};

export const blockchainService = {
  async getTopics(): Promise<ITopicsData | undefined> {
    try {
      const topicList = await getTopicList();      
      const debates = await getDisputesByTopicList(topicList);
      console.log("topicList from blockchainService")
      console.log(topicList)
      console.log("debates from blockchainService")
      console.log(debates)
      

      debates.topics.sort((a: any, b: any) => a.id - b.id);

      return debates
    } catch (error) {
      console.error(error)
      //throw new Error();
    }
  },
  async getDecimalsOfToken(address: `0x${string}`): Promise<number> {
    try {
      return await getDecimalsOfToken(address);
    } catch (error) {
      throw new Error();
    }
  },
  async getDecimalsOfPARAD(): Promise<number> {
    try {
      return await getDecimalsOfToken(paradAddress);
    } catch (error) {
      throw new Error();
    }
  },
};
