'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="hero">
      <h1>Decentralized Voting Platform</h1>
      <p>Transparent. Trustless. Built with Blockchain.</p>
      <button onClick={() => router.push("/vote")}>Launch DApp</button>
    </div>
  );
}
