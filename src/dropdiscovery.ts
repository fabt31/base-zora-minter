import { ethers } from "ethers";
const ZORA_FACTORY = "0x777777C338d93e2C7adf08D102d45CA7CC4Ed021";
const DROP_CREATED_TOPIC = ethers.id("SetupNewToken(address,address,string,uint256)");
export async function discoverNewDrops(fromBlock: number, provider: ethers.JsonRpcProvider) {
  const logs = await provider.getLogs({ address: ZORA_FACTORY, topics: [DROP_CREATED_TOPIC], fromBlock, toBlock: "latest" });
  return logs.map(log => ({ collection: "0x" + log.topics[1].slice(26), creator: "0x" + log.topics[2].slice(26), blockNumber: log.blockNumber }));
}
