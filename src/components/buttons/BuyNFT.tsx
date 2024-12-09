"use client";

import styles from "@/styles/components/buttons/purple.module.css";
import Image from "next/image";
import { waitForTransactionReceipt } from '@wagmi/core';
import { SVG } from "@/../public/static/images/svg/svg";
import { useAccount } from "wagmi";
import { Address, parseUnits } from 'viem'
import {
  useApproveWrite,
  useBuyNftInDisputeWrite,
} from "@/hooks/useContractWrite";
import {
  useAdminWalletAddress,
  useParadAllowance,
  useParadBalance,
  useParadDecimals,
} from "@/hooks/useContractData";
import {useEffect, useMemo, useState} from "react";
import {BuyNFTModalButton} from "@/components/modal/BuyNFT";
import {notifyError} from "@/components/Toasts";
import { coreConfig, sporeAddress } from "@/utils/blockchain/blockchainData";
import { resetCache } from "@/actions";

interface BuyNFTButtonProps {
  title: string;
  topicId: number;
  debateId: number;
  answerId: number;
  price: string;
  type?: "button" | "submit" | "reset";
  isActive?: boolean;
  hideCubes?: boolean;
  isFullWidthInMobile?: boolean;
  style?: React.CSSProperties;
  tokenURI: string;
}


const isZeroAddress = (address: string) => {
  return /^0x0+$/.test(address);
};

const isEthereumAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};


export default function BuyNFTButton({
  title,
  topicId,
  debateId,
  answerId,
  price,
  type,
  isActive,
  style,
  hideCubes,
  isFullWidthInMobile,
  tokenURI
}: BuyNFTButtonProps) {
  const { address } = useAccount();

  const decimals = useParadDecimals();
  const adminWalletAddress = useAdminWalletAddress();
  const { allowance, refetchAllowance } = useParadAllowance(address);
  const { balance } = useParadBalance(address);
  const [ referrer, setReferrer ] = useState<null | string>(null);

  useEffect(() => {
    if (address && adminWalletAddress) {
      const partnerAddressFromUrl = new URLSearchParams(window.location.search).get("ref");
      
      if (partnerAddressFromUrl && !isEthereumAddress(partnerAddressFromUrl as string)) {
        notifyError("Referrer address is not valid");
      }

      if (!partnerAddressFromUrl || isZeroAddress(partnerAddressFromUrl as string)) {
        setReferrer(adminWalletAddress as string);
        return;
      }

      if (address === partnerAddressFromUrl) {
        notifyError("Can not set your own address as referrer");
        return;
      }

      setReferrer(partnerAddressFromUrl);
    }
  }, [address, adminWalletAddress]);

  const formattedPrice = decimals ? parseUnits(String(price), decimals) : 0n;  

  const { write: approveWrite, txStatus: txStatusApproved } = useApproveWrite();

  const { write: buyWrite } = useBuyNftInDisputeWrite();

  const isEnoughtAllowance = (multiplier: number) => {
    return allowance as bigint >= formattedPrice * BigInt(multiplier) * BigInt(105) / BigInt(100) && referrer
  }

  const handleBuyNFT = async (multiplier: number) => {
    console.log(multiplier);
    
    const multiplierBigInt = BigInt(multiplier)

    if (multiplierBigInt > 0 && balance && formattedPrice && balance >= formattedPrice * multiplierBigInt) {
      if (isEnoughtAllowance(multiplier)) {
        try {
          const buyTx = await buyWrite({
            args: [topicId, debateId, answerId, formattedPrice * multiplierBigInt, referrer, tokenURI],
          });  

          resetCache(buyTx as Address);

          await waitForTransactionReceipt(coreConfig, {
            hash: buyTx as Address
          }); 

          await refetchAllowance()

          
        } catch (error) {
          console.error(error);
          
        }
      } else {
        try {
          const approveTx = await approveWrite({
            args: [sporeAddress, formattedPrice * multiplierBigInt * BigInt(105) / BigInt(100)]
          });

          await waitForTransactionReceipt(coreConfig, {
            hash: approveTx as Address
          }); 

          await refetchAllowance()

          const buyTx = await buyWrite({
            args: [topicId, debateId, answerId, formattedPrice * multiplierBigInt, referrer, tokenURI],
          });  

          resetCache(buyTx as Address)

          await waitForTransactionReceipt(coreConfig, {
            hash: buyTx as Address
          }); 

          await refetchAllowance()



        } catch (error) {
          console.error(error);
        }
      }
    }
  };

/*   useEffect(() => {
    if (approveTxStatus === "success") {
      buyWrite();
      setMultiplier(BigInt(0));
    }
  }, [approveTxStatus]); */

  return (
        <BuyNFTModalButton
            button={
              <button
                  className={`${styles.purple__button} ${styles.purple__button__text} ${
                      isActive ? styles.active : ""
                  } ${isFullWidthInMobile ? styles.mobile_width : ""}`}
                  type={type}
                  style={style}
              >
                {!hideCubes && (
                    <Image
                        className={styles.purple__button__cubes}
                        src={SVG.hugeCubesDark}
                        alt="cubes"
                        style={{color: "black"}}
                    />
                )}
                Buy
              </button>
            }
            basePrice={price}
            formattedPrice={formattedPrice}
            allowance={allowance as bigint}
            handleBuyNFT={handleBuyNFT}
        />
  );
}
