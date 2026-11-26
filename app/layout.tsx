import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import { DEMO, SITE_URL } from "@/lib/site";

import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${DEMO.name} (demo site by githzweb)`, template: `%s | ${DEMO.name} (demo)` },
  description: `${DEMO.tagline} A demo catalogue website built by githzweb. Not a real shop.`,
  // Demo site: never index.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
