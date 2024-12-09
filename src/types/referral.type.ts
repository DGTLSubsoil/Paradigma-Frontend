export type Ref = [`0x${string}`[], bigint[], bigint[]];

export type RawActiveDebates = [bigint[]];

export type ActiveDebates =
  | {
      topicId: bigint;
      disputeId: bigint;
      userIndex?: bigint;
      isMultipleVote?: boolean;
    }[]
  | undefined;
