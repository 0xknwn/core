export {};

import type { StarknetWindowObject } from "get-starknet-core";
import { getWebWalletStarknetObject } from "./webwallet/starknetWindowObject/getWebWalletStarknetObject";
import { trpcProxyClient } from "./webwallet/helpers/trpc";

declare global {
  interface Window {
    starknet_smartr: StarknetWindowObject | undefined;
  }
}

export const init = async () => {
  if (window.starknet_smartr) {
    return window.starknet_smartr;
  }

  const proxyLink = await getWebWalletStarknetObject(
    "smartr",
    trpcProxyClient({})
  );

  window.starknet_smartr = proxyLink;

  return proxyLink;
};

init();
