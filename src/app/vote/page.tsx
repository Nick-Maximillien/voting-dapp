"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import getBallotContract from "@utils/getContract";
import toast, { Toaster } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const shortenAddress = (addr: string) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

export default function Home() {
  const [delegateAddress, setDelegateAddress] = useState("");
  const [voteId, setVoteId] = useState(0);
  const [giveVoteAddress, setGiveVoteAddress] = useState("");
  const [proposals, setProposals] = useState<{ name: string; voteCount: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const { signer } = await getBallotContract();
      const address = await signer.getAddress();
      setWalletAddress(address);
      toast.success("Wallet connected");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Connection failed");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    toast("Wallet disconnected");
  };

  const handleDelegate = async () => {
    try {
      const { contract } = await getBallotContract();
      setLoading(true);
      const tx = await contract.delegate(delegateAddress);
      await tx.wait();
      toast.success("Delegation successful!");
      setDelegateAddress("");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Delegation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    try {
      const { contract } = await getBallotContract();
      const count = await contract.getProposalsLength();

      if (voteId < 0 || voteId >= count) {
        toast.error("Invalid proposal ID");
        return;
      }

      setLoading(true);
      const tx = await contract.vote(voteId);
      await tx.wait();
      toast.success("Voted successfully!");
      setVoteId(0);
      await loadProposals();
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Vote failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGiveRight = async () => {
    try {
      const { contract } = await getBallotContract();
      setLoading(true);
      const tx = await contract.giveRightToVote(giveVoteAddress);
      await tx.wait();
      toast.success("Right to vote granted!");
      setGiveVoteAddress("");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Granting vote rights failed.");
    } finally {
      setLoading(false);
    }
  };

  const loadProposals = async () => {
    try {
      const { contract } = await getBallotContract();
      const count = await contract.getProposalsLength();
      const loaded = [];
      for (let i = 0; i < count; i++) {
        const proposal = await contract.proposals(i);
        loaded.push({
          name: proposal.name,
          voteCount: proposal.voteCount.toString(),
        });
      }
      setProposals(loaded);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load proposals");
      console.error(err);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <Toaster position="top-center" />
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Secure & Transparent Voting</h1>
          {walletAddress ? (
            <button
              onClick={disconnectWallet}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Disconnect ({shortenAddress(walletAddress)})
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Voting Results</h2>
          {proposals.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={proposals}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="voteCount" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6">
                <table className="proposal-table">
                <thead>
                  <tr>
                    <th>Vote Choice</th>
                    <th>Proposal</th>
                    <th>Vote Count</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((proposal, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                      <td>{index}</td>
                      <td><strong>{proposal.name}</strong></td>
                      <td>{proposal.voteCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>              
              </div>
            </>
          ) : (
            <p>No proposals found.</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Delegate address"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleDelegate}
            disabled={loading || !delegateAddress}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Delegating..." : "Delegate"}
          </button>
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Proposal ID"
            value={voteId}
            onChange={(e) => setVoteId(Number(e.target.value))}
            className="border p-2 w-full mb-2"
            min={0}
          />
          <button
            onClick={handleVote}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Voting..." : "Vote"}
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Address to give right to vote"
            value={giveVoteAddress}
            onChange={(e) => setGiveVoteAddress(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleGiveRight}
            disabled={loading || !giveVoteAddress}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Granting..." : "Give Right to Vote"}
          </button>
        </div>
      </div>
    </main>
  );
}
