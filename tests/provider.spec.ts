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
      method: "eth_chainId",
      params: []
    })

    console.log(transaction)
  })
})
