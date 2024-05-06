export type Ref = [`0x${string}`[], bigint[], bigint[]];

export type RawActiveDebates = [bigint[], bigint[]];

export type ActiveDebates =
  | {
      topicId: bigint;
      disputeId: bigint;
    }[]
  | undefined;
