import { ethers } from "ethers";
export async function getCollectionStats(collection: string, provider: ethers.JsonRpcProvider) {
  const abi = ["function totalSupply() view returns (uint256)", "function contractURI() view returns (string)", "function name() view returns (string)"];
  try {
    const contract = new ethers.Contract(collection, abi, provider);
    const [supply, name] = await Promise.all([contract.totalSupply(), contract.name()]);
    return { collection, name, totalMinted: supply.toString() };
  } catch { return { collection, name: "Unknown", totalMinted: "0" }; }
}
