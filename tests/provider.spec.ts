import { createAbstractionProvider, IProvider } from "../index";

describe("Provider", () => {
  it("Can create provider", async () => {
    const provider = createAbstractionProvider();
    console.log(provider);
  })

  it("Should override KeyURL", async() => {
    const keyUrl = "https://example.com";
    const provider = createAbstractionProvider({
      keyUrl
    });
    console.log(provider)
  })

  it("Can request rpc", async () => {
    const provider: IProvider = createAbstractionProvider();
    console.log(provider.rpcProvider)
    const transaction = await provider.request({
      method: "eth_getTransactionReceipt",
      params: ["0xc35aef2e2740f084ffe98805c4a16ab7ee762ebd97f832c206def024e1bc9a30"]
    })

    console.log(transaction)
  })
})
