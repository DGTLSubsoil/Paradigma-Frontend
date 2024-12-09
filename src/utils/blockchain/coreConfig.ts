import { cookieStorage, createConfig, createStorage, http } from "@wagmi/core";
import { bsc } from "@wagmi/core/chains";


export const coreConfig = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
});
