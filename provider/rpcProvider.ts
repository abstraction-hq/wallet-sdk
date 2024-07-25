import { RPCProviderInput } from "../types";
import { mainnet } from "../constants";
import { Chain, createPublicClient, defineChain, http, PublicClient } from "viem";

export default class RPCProvider {
  ethClient: PublicClient;

  constructor(input?: RPCProviderInput) {
    let chain: Chain;
    if (input) {
      chain = defineChain({
        id: 88,
        name: "Viction Mainnet",
        nativeCurrency: {
          decimals: 18,
          name: "Viction",
          symbol: "VIC",
        },
        rpcUrls: {
          default: {
            http: [input.rpcUrl, "https://rpc.viction.xyz"],
            webSocket: [input.wsUrl, "wss://ws.viction.xyz"],
          },
        },
        blockExplorers: {
          default: { name: "Explorer", url: "https://vicscan.xyz" },
        },
        testnet: false,
      })
    } else {
      chain = mainnet
    }

    // @ts-ignore
    this.ethClient = createPublicClient({
      chain: chain,
      transport: http()
    }) as PublicClient
  }

  public async requestRPC(args: any) {
    return this.ethClient.request(args)
  }

  public async getClient() {
    return this.ethClient
  }
}
