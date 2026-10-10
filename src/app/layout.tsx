import type { ReactNode } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
