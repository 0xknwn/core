export {};

import type { StarknetWindowObject } from "get-starknet-core";
import { getSmartrStarknetObject } from "./starknetWindowObject/smartrStarknetObject";

declare global {
  interface Window {
    starknet_smartr: StarknetWindowObject | undefined;
  }
}

export const injectSmartr = async () => {
  if (window.starknet_smartr) {
    return window.starknet_smartr;
  }

  const proxyLink = await getSmartrStarknetObject();

  window.starknet_smartr = proxyLink;

  return proxyLink;
};
