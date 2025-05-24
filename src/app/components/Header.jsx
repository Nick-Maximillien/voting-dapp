"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header col-12">
      <div className="row align-items-center">
        <div className="col-2 logo">
          <img className="logoImg" src="/images/logo.png" alt="" />
        </div>
        <nav className="col-8 d-flex justify-content-center">
          <ul className="nav col-8">
            <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/vote">Ballot</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
