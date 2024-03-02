import type { CreateTRPCProxyClient } from "@trpc/client";
import type { AppRouter } from "../helpers/trpc";
import type { SmartrStarknetWindowObject } from "./smartrStarknetWindowObject";
import { getSmartrStarknetWindowObject } from "./smartrStarknetWindowObject";

export const getSmartrStarknetObject = async (
  proxyLink: CreateTRPCProxyClient<AppRouter>
): Promise<SmartrStarknetWindowObject> => {
  const globalWindow = typeof window !== "undefined" ? window : undefined;
  if (!globalWindow) {
    throw new Error("window is not defined");
  }
  const starknetWindowObject = getSmartrStarknetWindowObject(
    {
      id: "smartr",
      icon: "https://www.smartr.network/favicon.ico",
      name: "smartr Wallet",
      version: "0.0.1",
    },
    proxyLink
  );

  return starknetWindowObject;
};
