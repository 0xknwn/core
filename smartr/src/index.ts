export {};

import type { StarknetWindowObject } from "get-starknet-core";
import { getSmartrStarknetObject } from "./starknetWindowObject/smartrStarknetObject";
import { trpcProxyClient } from "./helpers/trpc";

declare global {
  interface Window {
    starknet_smartr: StarknetWindowObject | undefined;
  }
}

export const init = async () => {
  if (window.starknet_smartr) {
    return window.starknet_smartr;
  }

  const proxyLink = await getSmartrStarknetObject(trpcProxyClient({}));

  window.starknet_smartr = proxyLink;

  return proxyLink;
};

init();
