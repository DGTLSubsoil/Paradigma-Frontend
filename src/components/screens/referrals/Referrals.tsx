"use client";

import styles from "@/styles/components/screens/referrals/referrals.module.css";
import Referral from "./Referral";
import { useAccount, useClient } from "wagmi";
import { useWindowSize } from "@/hooks/useWindowSize";
import GreenButton from "@/components/buttons/Green";
import { useGetComplexRefInfoForUser } from "@/hooks/useContractData";

const testReferrals = [
  {
    address: "0x952DB5D35D8C876291372a3000131927630d290C",
    volume: 100,
    income: 50,
  },
  {
    address: "0xDcD6d7D4D3A4967A7EB3A80074588b0641F97d0f",
    volume: 200,
    income: 100,
  },
  {
    address: "0x246Cc4C0F1011271DB3492308Cdf547eE2D85EDC",
    volume: 300,
    income: 150,
  },
  {
    address: "0xe0bf91caaAB2a3Bcc810eFE6b07F40cd88308e8D",
    volume: 400,
    income: 200,
  },
  {
    address: "0x952DB5D35D8C876291372a3000131927630d290C",
    volume: 100,
    income: 50,
  },
  {
    address: "0xDcD6d7D4D3A4967A7EB3A80074588b0641F97d0f",
    volume: 200,
    income: 100,
  },
  {
    address: "0x246Cc4C0F1011271DB3492308Cdf547eE2D85EDC",
    volume: 300,
    income: 150,
  },
  {
    address: "0xe0bf91caaAB2a3Bcc810eFE6b07F40cd88308e8D",
    volume: 400,
    income: 200,
  },
  {
    address: "0x952DB5D35D8C876291372a3000131927630d290C",
    volume: 100,
    income: 50,
  },
  {
    address: "0xDcD6d7D4D3A4967A7EB3A80074588b0641F97d0f",
    volume: 200,
    income: 100,
  },
  {
    address: "0x246Cc4C0F1011271DB3492308Cdf547eE2D85EDC",
    volume: 300,
    income: 150,
  },
  {
    address: "0xe0bf91caaAB2a3Bcc810eFE6b07F40cd88308e8D",
    volume: 400,
    income: 200,
  },
];

export default function Referrals() {
  const client = useClient();
  const explorer = client?.chain?.blockExplorers?.default?.url;
  const { width } = useWindowSize();
  const { address } = useAccount();
  const refInfo = useGetComplexRefInfoForUser(address);

  const isEmptyRefs =
    !refInfo || !refInfo[0].length || !refInfo[1].length || !refInfo[2].length;
  const isMobile = width && width <= 760;

  return (
    <div className={styles.referrals}>
      <div className={styles.referrals__container}>
        <div className={styles.referrals__container__head}>
          <h1>Referrals</h1>
          <GreenButton
            title="Invite Friends"
            style={{ width: 203, height: 50 }}
            isFullWidthInMobile
            hideCubes
          />
        </div>
        <div className={styles.referrals__container__body}>
          <div className={styles.referrals__container__body__head}>
            <div className={styles.referrals__container__body__head__container}>
              {isMobile ? (
                <p>List of Referrals</p>
              ) : (
                <>
                  <h5>Referral Address</h5>
                  <span>
                    Volume{" "}
                    <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>
                      ($PARAD)
                    </span>
                  </span>
                  <p>Your Income</p>
                </>
              )}
            </div>
          </div>
          {!isEmptyRefs ? (
            <div className={styles.referrals__container__body__list}>
              {explorer &&
                testReferrals &&
                width &&
                refInfo.map((referral, index) => (
                  <Referral
                    key={index}
                    address={referral[0] as `0x${string}`}
                    volume={referral[1] as bigint}
                    income={referral[2] as bigint}
                    style={!index ? { marginTop: "-6px" } : {}}
                    explorer={explorer}
                    width={width}
                  />
                ))}
            </div>
          ) : (
            <h3 style={{ textAlign: "center" }}>No Referrals Found</h3>
          )}
        </div>
      </div>
    </div>
  );
}
