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

### Init provider with EIP-6963

```typescript
import { initAbstractionWallet } from "@abstraction-hq/wallet-sdk";

initAbstractionWallet();
```

### Create provider

```typescript
import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk";

const provider = createAbstractionProvider();
```

### Use provider
1. Connect Wallet

```typescript
const addresses = provider.request({
  method: "eth_requestAccounts",
});
```

2. Send Transaction

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

3. Send Multiple Transaction
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

4. Create contract
```typescript
const txHash = await(window as any).abstraction.request({
  method: "eth_sendTransaction",
  params: [
    {
      from: address,
      value: 0,
      data: CONTRACT_BYTECODE,
    },
  ],
  salt: // Salt to create contract with create2 - account.nonce() if not provide
});
```
