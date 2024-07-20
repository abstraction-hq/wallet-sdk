import EventEmitter from "eventemitter3";
import { supportedMethods } from "../../constants/supportedMethod";
import RPCProvider from "../../provider/rpcProvider";

export type MethodCategory = keyof typeof supportedMethods;
export type Method<C extends MethodCategory = MethodCategory> =
  (typeof supportedMethods)[C][number];

export interface RequestArguments {
  readonly method: Method | string;
  readonly params?: readonly unknown[] | object;
}

interface ProviderConnectInfo {
  readonly chainId: string;
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

interface ProviderMessage {
  type: string;
  data: unknown;
}

export interface RPCProviderInput {
  rpcUrl?: string;
  wsUrl?: string;
}

export interface ProviderInput {
  keyUrl?: string;
  rpcInput?: RPCProviderInput;
}

export interface IProvider extends EventEmitter {
  rpcProvider: RPCProvider
  request<T>(args: RequestArguments): Promise<T>;
  disconnect(): Promise<void>;
  on(event: "connect", listener: (info: ProviderConnectInfo) => void): this;
  on(event: "disconnect", listener: (error: ProviderRpcError) => void): this;
  on(event: "chainChanged", listener: (chainId: string) => void): this;
  on(event: "accountsChanged", listener: (accounts: string[]) => void): this;
  on(event: "message", listener: (message: ProviderMessage) => void): this;
}
