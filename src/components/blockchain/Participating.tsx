"use client";

import { useIsUserInDispute } from "@/hooks/useContractData";
import { useAccount } from "wagmi";

interface ParticipatingProps {
  topicId: number | string;
  debateId: number | string;
}

export default function Participating({
  topicId,
  debateId: disputeId,
}: ParticipatingProps) {
  const { address } = useAccount();
  const isParticipating = useIsUserInDispute(topicId, disputeId, address);

  return isParticipating ? (
    <>You&apos;re Participating</>
  ) : (
    <>Not Participating</>
  );
}
