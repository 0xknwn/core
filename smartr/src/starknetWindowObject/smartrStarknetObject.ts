import type { SmartrStarknetWindowObject } from "./smartrStarknetWindowObject";
import { getSmartrStarknetWindowObject } from "./smartrStarknetWindowObject";

export const getSmartrStarknetObject =
  async (): Promise<SmartrStarknetWindowObject> => {
    const globalWindow = typeof window !== "undefined" ? window : undefined;
    if (!globalWindow) {
      throw new Error("window is not defined");
    }
    const starknetWindowObject = getSmartrStarknetWindowObject({
      id: "smartr",
      icon: "https://www.smartr.network/favicon.ico",
      name: "smartr Wallet",
      version: "0.0.1",
    });

    return starknetWindowObject;
  };
