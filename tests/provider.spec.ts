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

  it("Get call status", async () => {
    const provider: IProvider = createAbstractionProvider();
    const callStatus = await provider.request({
      method: "wallet_getCallsStatus",
      params: ["0x6b4f1165bfee4d6164ab44f52bd9e5bfa40da28491a33960ad9952aa3f202799"]
    })

    console.log(callStatus)
  })
})
