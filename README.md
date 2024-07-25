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
      to: address,
      value: 0,
      data,
    },
  ],
});
```

3. Sending multiple calls
```typescript
const userOpHash = await(window as any).abstraction.request({
  method: "wallet_sendCalls",
  params: [
    {
      version: "1.0",
      chainId: "0x58",
      from: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
      calls: [
        {
          to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
          value: "0x9184e72a",
          data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
        },
        {
          to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
          value: "0x9184e72a",
          data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
        },
      ]
    }
  ],
});
```

4. Get call status
```typescript
const callStatus = await(window as any).abstraction.request({
  method: "wallet_getCallsStatus",
  params: [
    userOpHash
  ],
});
```


5. Create contract
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
