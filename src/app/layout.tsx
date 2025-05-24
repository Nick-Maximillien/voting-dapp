'use client'
import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function RootLayout(props: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/bootstrap/css/bootstrap-grid.min.css" />
      </head>
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
