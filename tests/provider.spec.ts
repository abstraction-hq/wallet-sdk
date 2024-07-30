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
    const chainId = await provider.request({
      method: "eth_chainId",
      params: []
    })

    console.log(chainId)
  })

  // it("Can get userOp status", async () => {
  //   const provider: IProvider = createAbstractionProvider();
  //   console.log(provider.rpcProvider)
  //   const transaction = await provider.request({
  //     method: "wallet_getCallsStatus",
  //     params: [
  //       "0x28e2d9ed0d70d159285885f975b70d7a799c23465cc8096944d07b6ca32f380f"
  //     ]
  //   })

  //   console.log(transaction)
  // })
})
