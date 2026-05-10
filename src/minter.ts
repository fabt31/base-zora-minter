import { ethers } from "ethers";

const ZORA_MINTER_ABI = [
  "function mint(address minter, uint256 tokenId, uint256 quantity, bytes calldata minterArguments) payable",
  "function mintWithRewards(address minter, uint256 tokenId, uint256 quantity, bytes calldata minterArguments, address mintReferral) payable"
];
const FIXED_PRICE_MINTER = "0x04E2516A2c207E84a1839755675dfd8eF6302F0a";

interface MintConfig { collection: string; quantity: number; value?: string; referral?: string; }

export class ZoraMinter {
  private wallet: ethers.Wallet;

  constructor(config: { privateKey: string; rpc: string }) {
    const provider = new ethers.JsonRpcProvider(config.rpc);
    this.wallet = new ethers.Wallet(config.privateKey, provider);
  }

  async mint(config: MintConfig): Promise<string> {
    const contract = new ethers.Contract(config.collection, ZORA_MINTER_ABI, this.wallet);
    const mintArgs = ethers.AbiCoder.defaultAbiCoder().encode(["address"], [this.wallet.address]);
    const value = config.value ? ethers.parseEther(config.value) : BigInt(777000000000000) * BigInt(config.quantity);
    const tx = await contract.mintWithRewards(
      FIXED_PRICE_MINTER, 1, config.quantity, mintArgs,
      config.referral ?? ethers.ZeroAddress, { value }
    );
    await tx.wait();
    console.log(`✅ Minted ${config.quantity}x from ${config.collection}: ${tx.hash}`);
    return tx.hash;
  }

  async batchMint(configs: MintConfig[]): Promise<string[]> {
    const hashes: string[] = [];
    for (const config of configs) {
      try { hashes.push(await this.mint(config)); }
      catch (e) { console.error(`Failed ${config.collection}:`, e); }
    }
    return hashes;
  }
}