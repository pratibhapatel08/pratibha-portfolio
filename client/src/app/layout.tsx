import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratibha Patel — MERN Full Stack Developer",
  description:
    "Portfolio of Pratibha Patel, a MERN full stack developer with Agentic AI, Generative AI, and DevOps experience.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
