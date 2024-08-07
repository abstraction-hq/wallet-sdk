import EventEmitter from "eventemitter3";
import { Address } from "viem";
import { Communicator } from "../communicator/communicator";
import { supportedMethods } from "../constants/supportedMethod";
import {
  MethodCategory,
  RequestArguments,
  IProvider,
  ProviderInput,
} from "../types";
import { Message } from "../types";
import { getFavicon } from "../utils/getIcon";
import RPCProvider from "./rpcProvider";
import { BUNDLER_URL } from "../constants";

function determineMethodCategory(method: string): MethodCategory | undefined {
  for (const c in supportedMethods) {
    const category = c as MethodCategory;
    if ((supportedMethods[category] as readonly string[]).includes(method)) {
      return category;
    }
  }
  return undefined;
}

export class AbstractionProvider extends EventEmitter implements IProvider {
  public rpcProvider: RPCProvider;
  communicator: Communicator;
  accounts: Address[] = [];
  isAbstractionWallet: boolean = true;
  chainId: number = 89;

  constructor(providerInput?: ProviderInput) {
    super();
    this.communicator = new Communicator(null, providerInput?.keyUrl);
    this.rpcProvider = new RPCProvider(providerInput?.rpcInput);
  }

  public get connected() {
    return this.accounts.length > 0;
  }

  public async request<T>(args: RequestArguments): Promise<T> {
    const methodCategory = determineMethodCategory(args.method) ?? "fetch";
    return (this.handlers as any)[methodCategory](args) as unknown as T;
  }

  public async disconnect(): Promise<void> {
    this.accounts = [];
  }

  protected handlers = {
    handshake: async (args: RequestArguments) => {
      if (this.connected) {
        this.emit("connect", { chainId: "1" });
        return this.accounts;
      }

      return new Promise<Address[]>(async (resolve, reject) => {
        const [handshakePopup]: [Communicator, string] =
          await this.communicator.openPopup("connect");
        const dappInfo = {
          hostname: window.origin,
          title: document.title,
          icon: `${window.origin}/${getFavicon()}`,
        };
        const payload = {
          ...args,
          dappInfo,
        };
        const handshakeResponse: Message =
          await handshakePopup.sendRequestMessage(payload);

        if (handshakeResponse.payload == "rejected") {
          reject("User rejected the connection");
          return;
        }

        this.accounts = handshakeResponse.payload as Address[];

        this.emit("connect", { chainId: "1" });
        resolve(this.accounts);
      });
    },
    sign: async (args: RequestArguments) => {
      if (!this.connected) {
        throw new Error("Not connected");
      }

      return new Promise(async (resolve, reject) => {
        const [signPopup]: [Communicator, string] =
          await this.communicator.openPopup("sign");
        const dappInfo = {
          hostname: window.origin,
          title: document.title,
          icon: `${window.origin}/${getFavicon()}`,
        };
        const payload = {
          ...args,
          dappInfo,
        };
        const signResponse: Message = await signPopup.sendRequestMessage(
          payload
        );
        if (signResponse.payload == "rejected") {
          reject("User rejected the connection");
          return;
        }
        resolve(signResponse.payload);
      });
    },
    fetch: async (args: RequestArguments) => {
      return this.rpcProvider.requestRPC(args);
    },
    state: async (args: RequestArguments) => {
      switch (args.method) {
        case "eth_accounts":
          return this.accounts;
        case "eth_coinbase":
          return this.accounts[0];
        case "net_version":
          return "0x1";
        case "wallet_getCallsStatus":
          try {
            const data = {
              jsonrpc: "2.0",
              id: 1,
              method: "eth_getUserOperationReceipt",
              params: args.params,
            };
            const response = await fetch(BUNDLER_URL, {
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            });
            return response.json();
          } catch (err) {
            console.log(err)
            throw new Error(err);
          }
        default:
          throw new Error(`Method ${args.method} is not supported.`);
      }
    },
    deprecated: async (args: RequestArguments) => {},
    unsupported: ({ method }: RequestArguments) => {
      // throw new Error(`Method ${method} is not supported.`);
    },
  };
}
