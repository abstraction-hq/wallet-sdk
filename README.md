# Abstraction Wallet SDK

Abstraction wallet sdk allow developer connect their Dapp to Abstraction Wallet via EIP-6963

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
1. Init Wallet
```typescript
import { initAbstractionWallet } from "@abstraction-hq/wallet-sdk"

initAbstractionWallet()
```

### Use with Provider
1. Create provider
```typescript
import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk"

const provider = createAbstractionProvider()
```

2 Use provider
```typescript
const addresses = provider.request({
  method: 'eth_requestAccounts',
});
```
