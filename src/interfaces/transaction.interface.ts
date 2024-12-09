import { Amount } from "@/types/transaction.type";
import { Abi } from "viem";

export interface IContractWrite {
  functionName: string;
  abi: Abi;
  address: `0x${string}`;
  gasLimit?: number;
  args?: any[];
  gasPrice?: number;
  gas?: bigint
}

export interface IApproveWrite {
  address?: `0x${string}`;
  spender?: `0x${string}`;
  amount: Amount;
}

export interface IBuyNftInDisputeWrite {
  topicId: number;
  debateId: number;
  answerId: number;
  price: Amount;
  referrer: `0x${string}`;
  tokenURI: string;
}
