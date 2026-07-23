import type { Metadata } from "next";
import { Syne, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xsedes.com"),
};

export default function BobbsKitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      {children}
    </div>
  );
}
