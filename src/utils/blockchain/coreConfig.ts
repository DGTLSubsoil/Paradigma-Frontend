import { createConfig, http } from "@wagmi/core";
import { bsc } from "@wagmi/core/chains";

export const coreConfig = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
  ssr: true,
});
