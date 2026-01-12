# TypeScript Example

```ts
import detectEthereumProvider from "@metamask/detect-provider";

async function main() {
  const provider = await detectEthereumProvider();

  if (!provider) {
    console.error("No injected provider found");
    return;
  }

  const chainId = await provider.request({ method: "eth_chainId" });
  console.log("chainId:", chainId);
}

main().catch(console.error);
