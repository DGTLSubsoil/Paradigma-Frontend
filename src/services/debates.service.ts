import { unstable_cache } from "next/cache";
import { blockchainService } from "./blockchain/blockchain.service";
import { ActiveDebates } from "@/types/referral.type";
import { IDebatesData, ITopicsData } from "@/interfaces/debates.interface";

// const url = process.env.URL;
const revalidate = 60;

async function fetchData() {
  try {
    const { getTopics } = blockchainService;
    
    const data = await getTopics();

    return data;
  } catch (error) {
    throw error;
  }
}

const getCachedData = unstable_cache(async () => fetchData(), ["debates"], {
  tags: ["debates-tag"],
  revalidate: revalidate,
});

const getCashedTopicById = (id: number) => {
  async function fetchTopicItem(id: number) {
    const cachedData = await getCachedData();

    if (!cachedData) {
      return undefined;
    }

    const item = cachedData?.topics.find((topic) => topic?.id === id);

    return item;
  }
  return fetchTopicItem(id);
};

const getCachedDebateById = (debateId: number, topicId: number) => {
  async function fetchDebateItem(id: number) {
    const cachedData = await getCashedTopicById(topicId);

    if (!cachedData) {
      return undefined;
    }

    const item = cachedData?.debates.find((debate) => debate?.id === id);
    id;

    return item;
  }
  return fetchDebateItem(debateId);
};

const getCachedFilteredTopicsAndDebates = (
  disputes: ActiveDebates,
  topicsData: ITopicsData
) => {
  async function fetchFilteredTopics(
    disputes: ActiveDebates,
    topicsData: ITopicsData
  ) {
    if (!topicsData || !disputes) {
      return;
    }

    const filteredTopics: IDebatesData[] = [];

    disputes.forEach((dispute) => {
      const topic = topicsData.topics.find(
        (topic) => topic.id === Number(dispute.topicId)
      );
      if (topic) {
        const debate = topic.debates.find(
          (debate) => Number(debate.id) === Number(dispute.disputeId)
        );

        if (debate) {
          const existingTopic = filteredTopics.find(
            (filteredTopic) => filteredTopic.id === topic.id
          );
          if (existingTopic) {
            existingTopic.debates.push(debate);
          } else {
            filteredTopics.push({ id: topic.id, debates: [debate], image: topic.image, participantsCount: topic.participantsCount });
          }
        }
      }
    });

    return { topics: filteredTopics } as ITopicsData;
  }

  return fetchFilteredTopics(disputes, topicsData);
};

export const debatesService = {
  async getAll() {
    //return getCachedData();
    return fetchData();
  },

  async getTopicById(id: number) {
    return getCashedTopicById(id);
  },

  async getDebateById(debateId: number, topicId: number) {
    return getCachedDebateById(debateId, topicId);
  },

  async getFilteredTopicsAndDebates(
    disputes: ActiveDebates,
    topicsData: ITopicsData
  ) {
    return getCachedFilteredTopicsAndDebates(disputes, topicsData);
  },
};

// const response = await fetch(url + "/api/debates", {
//   headers: {
//     Accept: "application/json",
//     method: "GET",
//   },
// });

// if (response) {
//   const data: IDebate[] = await response.json();
//   return data;
// }

// const fetchFunction = unstable_cache(
//   async () => fetchTopicItem(id),
//   ["topic-" + String(id)],
//   {
//     tags: ["topic-tag-" + String(id)],
//     revalidate: revalidate,
//   }
// );

// return fetchFunction();

// const fetchFunction = unstable_cache(
//   async () => fetchDebateItem(id),
//   ["debate-" + String(id)],
//   {
//     tags: ["debate-tag-" + String(id)],
//     revalidate: revalidate,
//   }
// );

// return fetchFunction();

// async getAll() {
//   const response = await fetch(url + "/api/debates", {
//     headers: {
//       Accept: "application/json",
//       method: "GET",
//     },
//     next: { revalidate: 60 },
//   });
//   if (response) {
//     const data: IDebate[] = await response.json();
//     return data;
//   }
// },
// async getById(id: number) {
//   const response = await fetch(url + `/api/debates/${id}`, {
//     headers: {
//       Accept: "application/json",
//       method: "GET",
//     },
//     next: { revalidate: 60 },
//   });
//   if (response) {
//     const data: IDebate[] = await response.json();
//     return data[0];
//   }
// },
