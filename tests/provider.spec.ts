import { createAbstractionProvider } from "../index";

describe("Provider", () => {
  it("Can create provider", async () => {
    const provider = createAbstractionProvider();
    console.log(provider);
  })

  it("Should override KeyURL", async() => {
    const keyUrl = "https://example.com";
    const provider = createAbstractionProvider(keyUrl);
    console.log(provider)
  })
})
