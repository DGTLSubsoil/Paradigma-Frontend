"use client";

import { useActiveDisputesForUser } from "@/hooks/useContractData";
import { useAccount } from "wagmi";
import type { ActiveDebates } from "@/types/referral.type";
import ActiveTopicItems from "@/components/ui/topic/ActiveTopicItems";

export default function ActiveDebates() {
  const { address } = useAccount();
  const data = useActiveDisputesForUser(address);

  return <div>{data && <ActiveTopicItems topics={data.topics} />}</div>;
}
