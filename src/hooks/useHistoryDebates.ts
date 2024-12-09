import { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { sporeContractBase } from "./useContractData";
import { fetchTopicMetadataFromIPFS_2 } from "@/utils/blockchain/fetchFromIPFS";

export function useHistoryDebates() {
    const { address } = useAccount();
  const [items, setItems] = useState()

  const { data } = useReadContract({
    ...sporeContractBase,
    functionName: "getDisputeCompleteUser",
    args: [address]
  });

  const {data: data2} = (useReadContracts({
    contracts: data && Array.isArray(data) ? data?.map(item => {
      return {
        ...sporeContractBase,
        functionName: "getUriForDispute",
        args: [item.groupId, item.index]
      }
    }) : []
  }));

  const data3: any[] | undefined = useMemo(() => {
    if (data && Array.isArray(data) && data2) {
      return data.map((obj: any, index: any) => ({ 
        ...obj,
        ...data2[index]
      }));
    }
  }, [data, data2]);

  const {data: qtyInfo} = (useReadContracts({
    contracts: data3?.map(item => {
      return {
        ...sporeContractBase,
        functionName: "disputes",
        args: [item.groupId, item.index]
      }
    }) 
  }));

  const data4: any = useMemo(() => {
    return data3?.map(async (el, idx) => {
      return (await fetchTopicMetadataFromIPFS_2(el))
    }) 
  }, [data3]) 
  
  useEffect(() => {
    if(!address) setItems([] as any)
  
    if(data4 && qtyInfo){
      Promise.all(data4).then((res) => {
        const result: any = res.map((el: any, idx: any) => {   
          const qtyMembers = (qtyInfo[idx] as { result: any[] }).result[4];
          const needQtyMembers = (qtyInfo[idx] as { result: any[] }).result[3];

          return {
            ...el,
            qtyMembers,
            needQtyMembers
          }
        })

        setItems(result)
      })
    }  
  }, [data4, qtyInfo, address])  

  return {
    items
  }
}