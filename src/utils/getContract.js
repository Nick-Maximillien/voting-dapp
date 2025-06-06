import { ethers } from "ethers";
import abi from "./abi.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

let cached = null;

const getBallotContract = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No Ethereum provider found. Please install MetaMask.");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  if (cached) return cached;

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const { chainId } = await provider.getNetwork();
  if (Number(chainId) !== 11155111) {
    throw new Error("Please switch to the Sepolia network in MetaMask.");
  }

  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  cached = { provider, signer, contract };
  return cached;
};

export default getBallotContract;
