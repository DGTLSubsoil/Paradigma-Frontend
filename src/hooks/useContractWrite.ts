"use client";

import {
  IApproveWrite,
  IBuyNftInDisputeWrite,
  IContractWrite,
} from "@/interfaces/transaction.interface";
import {
  paradABI,
  paradAddress,
  sporeABI,
  sporeAddress,
} from "@/utils/blockchain/blockchainData";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { notifyError, notifyInfo, notifySuccess } from "@/components/Toasts";

export const useContractWrite = ({
  address,
  abi,
  functionName,
  args,
}: IContractWrite) => {
  const config = {
    address: address,
    abi: abi,
    functionName: functionName,
    args: args,
  };

  const { data, status, error, isPending, isSuccess, writeContract } =
    useWriteContract();

  const { status: txStatus } = useWaitForTransactionReceipt({
    hash: data,
  });

  const write = async () => {
    writeContract(config);
  };

  useEffect(() => {
    if (error) {
      const message = error.message.includes("User rejected")
        ? "Transaction Rejected"
        : error.message.includes("The total cost")
        ? "Not Enough Balance"
        : error.message.includes("Connector not connected")
        ? "Connection Is Required"
        : error.message.includes("missing role")
        ? "Not Enough Permissions"
        : error.message.includes("unknown error")
        ? "Unknown Error"
        : error.message;

      toast.dismiss();
      notifyError(message);
      return;
    }

    const timeout = setTimeout(() => {
      if (isPending) {
        toast.dismiss();
        notifyInfo("Sign the transaction with your wallet");
      }
    }, 500);

    if (isSuccess && txStatus !== "success") {
      toast.dismiss();
      notifySuccess("Transaction signed");
    }

    if (txStatus === "success") {
      toast.dismiss();
      notifySuccess("Transaction completed");
    }

    return () => clearTimeout(timeout);
  }, [error, isPending, isSuccess, txStatus]);

  return {
    data,
    status,
    txStatus,
    error,
    write,
  };
};

export const useApproveWrite = ({ address, spender, amount }: IApproveWrite) =>
  useContractWrite({
    address: address || paradAddress,
    abi: paradABI,
    functionName: "approve",
    args: [spender || sporeAddress, amount],
  });

export const useBuyNftInDisputeWrite = ({
  topicId,
  debateId,
  answerId,
  price,
  referrer,
}: IBuyNftInDisputeWrite) =>
  useContractWrite({
    address: sporeAddress,
    abi: sporeABI,
    functionName: "buyNftInDispute",
    args: [topicId, debateId, answerId, price, referrer],
  });
