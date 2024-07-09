import { IProvider } from "./types/provider/provider";
import { AbstractionProvider } from "./provider";
import { EIP6963ProviderInfo } from "./types/provider/eip6963";

const announceProvider: Function = (provider: IProvider) => {
  const info: EIP6963ProviderInfo = {
    uuid: Math.random().toString(36).substring(2),
    name: "Abstraction Wallet",
    icon: "https://raw.githubusercontent.com/abstraction-hq/abstraction-wallet-extension/main/assets/logo.svg",
    rdns: "abstraction.world",
  };

  window.dispatchEvent(
    new CustomEvent("eip6963:announceProvider", {
      detail: Object.freeze({ info, provider: provider }),
    })
  );
};

const initAbstractionWallet: Function = (keyUrl?: string) => {
  const provider = new AbstractionProvider(keyUrl);
  window.addEventListener("eip6963:requestProvider", () => {
    announceProvider(provider);
  });
};

const createAbstractionProvider: Function = (keyUrl?: string): IProvider => {
  const provider = new AbstractionProvider(keyUrl);
  return provider;
};

export { initAbstractionWallet, createAbstractionProvider };

export * from "./communicator"
export * from "./types"
