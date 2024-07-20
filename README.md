# Abstraction Wallet SDK

Abstraction wallet SDK allow developers connect their Dapps to Abstraction Wallet via EIP-6963

## Install Abstraction Wallet SDK

```sh
# yarn
yarn add @abstraction-hq/wallet-skd
```

```sh
# npm
npm install @abstraction-hq/wallet-sdk
```

## Basic Usage

### Use with EIP-6963

1. Initialize Wallet

```typescript
import { initAbstractionWallet } from "@abstraction-hq/wallet-sdk";

initAbstractionWallet();
```

### Use with Provider

1. Create provider

```typescript
import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk";

const provider = createAbstractionProvider();
```

2 Use provider
2.1 Connect Wallet

```typescript
const addresses = provider.request({
  method: "eth_requestAccounts",
});
```

2.2 Send Transaction

```typescript
const txHash = await(window as any).abstraction.request({
  method: "eth_sendTransaction",
  params: [
    {
      from: address,
      to: collection,
      value: 0,
      data,
    },
  ],
});
```

2.3 Send Multiple Transaction
```typescript
const txHash = await(window as any).abstraction.request({
  method: "eth_sendTransaction",
  params: [
    {
      from: address,
      to: collection,
      value: 0,
      data,
    },
    {
      from: address,
      to: collection,
      value: 0,
      data,
    },
    {
      from: address,
      to: collection,
      value: 0,
      data,
    },
  ],
});
```
