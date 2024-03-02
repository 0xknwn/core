import EventEmitter from "eventemitter3";
import { StarknetWindowObject, StarknetChainId } from "get-starknet-core";

/** Connector icons, as base64 encoded svg. */
export type ConnectorIcons = {
  /** Dark-mode icon. */
  dark?: string;
  /** Light-mode icon. */
  light?: string;
};

/** Connector data. */
export type ConnectorData = {
  /** Connector account. */
  account?: string;
  /** Connector network. */
  chainId?: StarknetChainId;
};

/** Connector events. */
export interface ConnectorEvents {
  /** Emitted when account or network changes. */
  change(data: ConnectorData): void;
  /** Emitted when connection is established. */
  connect(data: ConnectorData): void;
  /** Emitted when connection is lost. */
  disconnect(): void;
}

export abstract class Connector extends EventEmitter<ConnectorEvents> {
  /** Unique connector id. */
  abstract get id(): string;
  /** Connector name. */
  abstract get name(): string;
  /** Connector icons. */
  abstract get icon(): ConnectorIcons;

  /** Whether connector is available for use */
  abstract available(): boolean;
  /** Whether connector is already authorized */
  abstract ready(): Promise<boolean>;
  /** Connect wallet. */
  abstract connect(): Promise<ConnectorData>;
  /** Disconnect wallet. */
  abstract disconnect(): Promise<void>;
  /** Get current account silently. Return null if the account is not authorized */
  abstract account(): Promise<string | null>;
  /** Get current chain id. */
  abstract chainId(): Promise<StarknetChainId>;
  /**  Connector StarknetWindowObject */
  abstract get wallet(): StarknetWindowObject;
}
