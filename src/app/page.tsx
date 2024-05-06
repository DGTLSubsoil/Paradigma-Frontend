import Image from "next/image";
import styles from "@/styles/pages/page.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Paradigma",
};

export default function Home() {
  return (
    <div>
      <div className={styles.main}>
        {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        <ConnectButton />
      </div> */}
      </div>
    </div>
  );
}
