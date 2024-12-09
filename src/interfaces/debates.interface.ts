import { ActiveDebates } from "@/types/referral.type";

export type Status = "Waiting Members" | "Going" | "Completed" | "Unknown";

export interface IMetadata {
  preview: string;
  point: string;
  answer_data: [
    {
      id: number;
      answer: string;
      image: string;
      tokenURI: string;
    }
  ];
}

export interface IDebate {
  id: number | string;
  status: number;
  isHot: boolean;
  point: string;
  members: string[];
  memberShares: number[];
  memberChoices: number[];
  qtyMembers: number;
  needQtyMembers: number;
  qtyAnswers: number;
  pointScores: number[];
  prizePool: number;
  nftUris: string[];
  uri?: string;
  metadata?: IMetadata;
}

export interface IDebatesData {
  id: number | string;
  title?: string;
  participantsCount?: number;
  image?: string;
  debates: IDebate[];
}

export interface IDebateData {
  id?: number | string;
  debate: IDebate;
}

export interface ITopicData {
  topic: IDebatesData;
}

export interface ITopicsData {
  topics: IDebatesData[];
}

export interface ITopicsDataOrUndefined {
  topics?: IDebatesData[];
}


export interface ITopicMetadata {
  name: string;
  image: string;
  topicId: number | bigint;
}
