# base-zora-minter

> Zora Protocol Minting Tools for Base L2

Automate Zora NFT minting on Base. Batch mint, collect free mints, track new drops, and analyze collection stats — all optimized for Base L2 gas costs.

## Features
- 🎨 Batch mint across multiple Zora collections
- 🆓 Free mint automation (Zora free collect)
- 🔔 New drop alerts (webhook + Telegram)
- 📊 Collection analytics (floor, volume, unique holders)
- ⚡ Gas-optimized batch transactions
- 🔍 Drop discovery from Zora API

## Setup
```bash
git clone https://github.com/fabt31/base-zora-minter
cd base-zora-minter
npm install
cp .env.example .env
```

## Mint a Collection
```typescript
import { ZoraMinter } from "./src/minter";

const minter = new ZoraMinter({ privateKey: process.env.PK, rpc: "https://mainnet.base.org" });

// Mint from a Zora drop
await minter.mint({ collection: "0xZoraCollection", quantity: 1, value: "0.000777" });

// Batch mint multiple collections
await minter.batchMint([
  { collection: "0xDrop1", quantity: 1 },
  { collection: "0xDrop2", quantity: 2 },
]);
```

## Zora on Base
- Zora Factory: `0x777777C338d93e2C7adf08D102d45CA7CC4Ed021`
- ERC1155 Factory: `0x777777722D078c97c6ad07d9f36801e653E356Ae`
- Minter (Fixed Price): `0x04E2516A2c207E84a1839755675dfd8eF6302F0a`

## License
MIT