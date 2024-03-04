import type {
  AccountChangeEventHandler,
  NetworkChangeEventHandler,
  StarknetWindowObject,
  WalletEvents,
} from "get-starknet-core";
import { constants } from "starknet";
import { Permission } from "get-starknet-core";

export const userEventHandlers: WalletEvents[] = [];

export type Variant = "smartr";

export interface SmartrStarknetWindowObjectOptions {
  id: Variant;
  icon: string;
  name: string;
  version: string;
}

export type LoginStatus = {
  isLoggedIn?: boolean;
  hasSession?: boolean;
  isPreauthorized?: boolean;
};

export type SmartrStarknetWindowObject = StarknetWindowObject & {
  getLoginStatus(): Promise<LoginStatus>;
};

export const getSmartrStarknetWindowObject = (
  options: SmartrStarknetWindowObjectOptions
): SmartrStarknetWindowObject => {
  const wallet: SmartrStarknetWindowObject = {
    ...options,
    getLoginStatus: async () => {
      return {
        isLoggedIn: true,
      };
    },
    request: async (call) => {
      console.log("request", call);
      switch (call.type) {
        case "wallet_requestAccounts": {
          return ["0x1234"];
        }

        case "starknet_signTypedData": {
          return ["0x1234"];
        }

        case "wallet_getPermissions": {
          return [Permission.Accounts];
        }

        case "starknet_addInvokeTransaction": {
          const hash = "0x1234";

          return { transaction_hash: hash };
        }

        case "wallet_requestChainId": {
          return constants.StarknetChainId.SN_MAIN as constants.StarknetChainId;
        }

        case "wallet_addStarknetChain": {
          //TODO: add with implementation
          //const params = call.params as AddStarknetChainParameters
          throw Error("not implemented");
        }
        case "wallet_switchStarknetChain": {
          //TODO: add with implementation
          //const params = call.params as SwitchStarknetChainParameter
          throw Error("not implemented");
        }
        case "wallet_watchAsset": {
          //TODO: add with implementation
          //const params = call.params as WatchAssetParameters
          /* return remoteHandle.call("watchAsset", params) */
          throw Error("not implemented");
        }
        default:
          throw new Error("not implemented");
      }
    },
    on: (event, handleEvent) => {
      if (event === "accountsChanged") {
        userEventHandlers.push({
          type: event,
          handler: handleEvent as AccountChangeEventHandler,
        });
      } else if (event === "networkChanged") {
        userEventHandlers.push({
          type: event,
          handler: handleEvent as NetworkChangeEventHandler,
        });
      } else {
        throw new Error(`Unknwown event: ${event}`);
      }
    },
    off: (event, handleEvent) => {
      if (event !== "accountsChanged" && event !== "networkChanged") {
        throw new Error(`Unknwown event: ${event}`);
      }

      const eventIndex = userEventHandlers.findIndex(
        (userEvent) =>
          userEvent.type === event && userEvent.handler === handleEvent
      );

      if (eventIndex >= 0) {
        userEventHandlers.splice(eventIndex, 1);
      }
    },
  };

  // TODO: handle network and account changes
  return wallet;
};
