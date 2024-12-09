"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { customTheme } from "@/utils/rainbowTheme";
import { config, coreConfig } from "@/utils/blockchain/blockchainData";

const queryClient = new QueryClient();

export default function Providers({ children, cookieInitState }: { children: React.ReactNode, cookieInitState: any }) {
/*   const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []); */

  return (
    <WagmiProvider config={config} initialState={cookieInitState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme} locale="en-US">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
