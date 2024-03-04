import type { Signature } from "starknet";
import {
  Account,
  AccountInterface,
  ProviderInterface,
  SignerInterface,
  typedData,
} from "starknet";
import type { StarknetMethods } from "../types/window";

class UnimplementedSigner implements SignerInterface {
  async getPubKey(): Promise<string> {
    throw new Error("Method not implemented");
  }

  async signMessage(): Promise<Signature> {
    throw new Error("Method not implemented");
  }

  async signTransaction(): Promise<Signature> {
    throw new Error("Method not implemented");
  }

  async signDeclareTransaction(): Promise<Signature> {
    throw new Error("Method not implemented");
  }

  async signDeployAccountTransaction(): Promise<Signature> {
    throw new Error("Method not implemented");
  }
}

export class MessageAccount extends Account implements AccountInterface {
  public signer = new UnimplementedSigner();

  constructor(provider: ProviderInterface, public address: string) {
    super(provider, address, new UnimplementedSigner());
  }

  execute: StarknetMethods["execute"] = async (
    calls,
    abis,
    transactionsDetail
  ) => {
    try {
      // TODO: add tx execution and return txHash
      return {
        transaction_hash: "0x1234",
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error while execute a transaction");
    }
  };

  signMessage: StarknetMethods["signMessage"] = async (
    typedData: typedData.TypedData
  ): Promise<Signature> => {
    try {
      // TODO: add typeData signature and return signature
      return ["0x1234"];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error while sign a message");
    }
  };
}
