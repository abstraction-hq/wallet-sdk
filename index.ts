import { AbstractionProvider } from "./provider";
import { EIP6963ProviderInfo } from "./types/provider/eip6963";

const announceProvider: Function = (provider: any) => {
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

const initAbstractionWallet: Function = () => {
  const provider = new AbstractionProvider()
  window.addEventListener("eip6963:requestProvider", () => {
    announceProvider(provider);
  });
};

export { initAbstractionWallet };
