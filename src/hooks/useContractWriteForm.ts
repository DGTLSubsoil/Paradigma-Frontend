"use client";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { sporeAddress, sporeABI } from "@/utils/blockchain/blockchainData";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { notifyError, notifyInfo, notifySuccess } from "@/components/Toasts";

export const useContractWrite = (
  functionName: string,
  _args: { [key: string]: string | boolean }
) => {
  const config = {
    address: sporeAddress,
    abi: sporeABI,
    functionName: functionName,
    args: Object.values(_args),
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

// args: [
//   _args?.groupId,
//   _args?.status,
//   _args?.point,
//   _args?.qtyMembers,
//   _args?.needQtyMembers,
//   _args?.prizePool,
//   _args?.qtyAnswers,
// ],
export const useCreateDispute = (_args: { [key: string]: string }) =>
  useContractWrite("createDispute", _args);

// args: [keccak256(toHex(_args?.role)), _args?.account],
export const useGrantRole = (_args: { [key: string]: string }) =>
  useContractWrite("grantRole", _args);

// args: [keccak256(toHex(_args?.role)), _args?.account],
export const useRevokeRole = (_args: { [key: string]: string }) =>
  useContractWrite("revokeRole", _args);

// args: [keccak256(toHex(_args?.role)), _args?.account],
export const useRenounceRole = (_args: { [key: string]: string }) =>
  useContractWrite("renounceRole", _args);

// args: [_args?.groupId, _args?.groupIndex, _args?.point],
export const useSetDisputePoint = (_args: { [key: string]: string }) =>
  useContractWrite("setDisputePoint", _args);

// args: [_args?.groupId, _args?.groupIndex, _args?.status],
export const useSetStatusDispute = (_args: { [key: string]: string }) =>
  useContractWrite("setStatusDispute", _args);

// args: [_args?.groupId, _args?.groupIndex, _args?.isHot],
export const useSetIsHotDispute = (_args: {
  [key: string]: string | boolean;
}) => useContractWrite("setIsHotDispute", _args);

// args: [_args?.groupId, _args?.groupIndex, _args?.newURI],
export const useUpdateUriForDispute = (_args: { [key: string]: string }) =>
  useContractWrite("updateUriForDispute", _args);

// args: [_args?.value],
export const useSetRefValue = (_args: { [key: string]: string }) =>
  useContractWrite("setRefValue", _args);

// args: [_args?.address],
export const useSetPARADContract = (_args: { [key: string]: string }) =>
  useContractWrite("setPARADContract", _args);

// args: [_args?.address],
export const useSetSporeNFT = (_args: { [key: string]: string }) =>
  useContractWrite("setSporeNFT", _args);

// args: [_args?.tokenAddress, _args?.amount],
export const useReceiveERC20 = (_args: { [key: string]: string }) =>
  useContractWrite("receiveERC20", _args);

// args: [_args?.amount],
export const useWithdrawPARAD = (_args: { [key: string]: string }) =>
  useContractWrite("withdrawPARAD", _args);
