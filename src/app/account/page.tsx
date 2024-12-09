import AccountInfo from "@/components/screens/AccountInfo";
import ActiveDebates from "@/components/screens/debates/ActiveDebates";
import HistoryDebates from "@/components/screens/debates/HistoryDebates";
import Referrals from "@/components/screens/referrals/Referrals";
import styles from "@/styles/pages/account.module.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Paradigma",
};

export default function AccountPage() {
  return (
    <div className={styles.account}>
      <div className={styles.account__container}>
        <AccountInfo />
        <div className={styles.account__container__data}>
          <ActiveDebates />
          <HistoryDebates/>
          <Referrals />
        </div>
      </div>
    </div>
  );
}
