'use client'
import React from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function RootLayout(props: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="body">
        <div>
          <Header />
          {props.children}
          <Footer />       
        </div>
      </body>
    </html>

  )
};
