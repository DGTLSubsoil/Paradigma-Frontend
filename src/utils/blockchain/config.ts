"use client";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import * as wallets from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { bsc } from "wagmi/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular Wallets",
      wallets: [
        wallets.metaMaskWallet,
        wallets.trustWallet,
        wallets.walletConnectWallet,
      ],
    },
    {
      groupName: "Other Wallets",
      wallets: [
        wallets.okxWallet,
        wallets.coinbaseWallet,
        wallets.phantomWallet,
        wallets.braveWallet,
        wallets.bitgetWallet,
        wallets.argentWallet,
        wallets.zerionWallet,
        wallets.coin98Wallet,
        wallets.safepalWallet,
        wallets.ledgerWallet,
        wallets.rainbowWallet,
        wallets.injectedWallet,
      ],
    },
  ],
  {
    appName: "App",
    projectId: walletConnectProjectId,
  }
);

export const config = createConfig({
  connectors,
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
  ssr: true,
});
