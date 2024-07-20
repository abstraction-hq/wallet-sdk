import { IProvider, ProviderInput, EIP6963ProviderInfo } from "./types";
import { AbstractionProvider } from "./provider";

const announceProvider: Function = (provider: IProvider) => {
  const info: EIP6963ProviderInfo = {
    uuid: Math.random().toString(36).substring(2),
    name: "Abstraction Wallet",
    icon: "https://raw.githubusercontent.com/abstraction-hq/abstraction-wallet-extension/main/assets/logo.svg",
    rdns: "world.abstraction.wallet",
  };

  window.dispatchEvent(
    new CustomEvent("eip6963:announceProvider", {
      detail: Object.freeze({ info, provider: provider }),
    })
  );

  window.removeEventListener("eip6963:requestProvider", () => {})
};

const initAbstractionWallet: Function = (providerInput?: ProviderInput) => {
  const provider = new AbstractionProvider(providerInput);
  window.addEventListener("eip6963:requestProvider", () => {
    announceProvider(provider);
  });
};

const createAbstractionProvider: Function = (providerInput?: ProviderInput): IProvider => {
  const provider = new AbstractionProvider(providerInput);
  return provider;
};

export { initAbstractionWallet, createAbstractionProvider };

export * from "./communicator"
export * from "./types"
export * from "./constants"
export * from "./provider"
export * from "./utils"
