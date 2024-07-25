import { defineChain } from "viem";

export const NETWORKS = "mainnet"

export const mainnet = defineChain({
  id: 88,
  name: "Viction Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Viction",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz"],
      webSocket: ["wss://ws.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://vicscan.xyz" },
  },
  testnet: true,
});
