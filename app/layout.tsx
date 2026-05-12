import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Motive — Find the car that fits your life",
  description:
    "AI-powered car matching based on your lifestyle, budget, and real-world needs. Not specs. Not horsepower. Practical intelligence.",
  keywords: "car finder, car comparison, best car for family, car ownership costs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
