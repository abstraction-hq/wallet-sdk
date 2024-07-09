import EventEmitter from "eventemitter3";
import { Address, toHex } from "viem";
import { Communicator } from "./communicator/communicator";
import { supportedMethods } from "./constants/supportedMethod";
import { MethodCategory, RequestArguments, IProvider } from "./types/provider/provider";
import { Message } from "./types/communicator/message";
import { getFavicon } from "./utils/getIcon";

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
  communicator: Communicator;
  accounts: Address[] = [];
  isAbstractionWallet: boolean = true;
  chainId: number = 89;

  constructor(keyUrl?: string) {
    super();
    this.communicator = new Communicator(null, keyUrl);
  }

  public get connected() {
    return this.accounts.length > 0;
  }

  public async request<T>(args: RequestArguments): Promise<T> {
    console.log("request", toHex(this.chainId))
    const methodCategory = determineMethodCategory(args.method) ?? "fetch";
    return this.handlers[methodCategory](args) as unknown as T;
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
        const [handshakePopup]: [Communicator, string] = await this.communicator.openPopup("connect");
        const dappInfo = {
          hostname: window.origin,
          title: document.title,
          icon: `${window.origin}/${getFavicon()}`,
        };
        const payload = {
          ...args,
          dappInfo
        };
        const handshakeResponse: Message = await handshakePopup.sendRequestMessage(payload);

        this.accounts = handshakeResponse.payload as Address[];

        this.emit("connect", { chainId: "1" });
        resolve(this.accounts);
      });
    },
    sign: async (args: RequestArguments) => {
      console.log(this.accounts);
      if (!this.connected) {
        throw new Error("Not connected");
      }

      return new Promise(async (resolve, reject) => {
        const [signPopup]: [Communicator, string] =
          await this.communicator.openPopup("sign");
        const signResponse: Message = await signPopup.sendRequestMessage(args);
        resolve(signResponse.payload);
      });
    },
    fetch: async (args: RequestArguments) => {},
    state: async (args: RequestArguments) => {
      switch (args.method) {
        case "eth_chainId":
          return toHex(this.chainId);
        case "eth_accounts":
          return this.accounts;
        case "eth_coinbase":
          return this.accounts[0];
        case "net_version":
          return "0x1";
        default:
          return undefined;
      }
    },
    deprecated: async (args: RequestArguments) => {},
    unsupported: ({ method }: RequestArguments) => {
      // throw standardErrors.rpc.methodNotSupported(`Method ${method} is not supported.`);
    },
  };
}
