// app/about/page.tsx
export default function About() {
  return (
    <div className="about">
      <h1>About This Voting Application</h1>
      <p>
        In many cooperatives and community groups — especially in agriculture — trust and transparency are the
        foundation of effective governance. But too often, decision-making processes are held behind closed doors,
        prone to bias, or slow to reach consensus.
      </p>
      <p>
        This decentralized voting application leverages blockchain technology to solve exactly that. Every vote cast
        is recorded on an immutable ledger, ensuring full transparency, eliminating tampering, and empowering
        all members — from smallholder farmers to board members — to participate equally in decisions.
      </p>
      <p>
        Built using Ethereum smart contracts and Ethers.js, this DApp is lean by design — no bloat, just secure,
        verifiable voting. It’s ideal for cooperatives looking to modernize how they govern: from electing leaders
        to approving budgets and new initiatives.
      </p>
      <p>
        Whether your group is a farming collective, a rural SACCO, or a community NGO, this tool shows how
        blockchain can rebuild trust from the ground up — one vote at a time.
      </p>
    </div>
  );
}
