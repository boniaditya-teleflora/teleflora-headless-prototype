import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { buildAbsoluteUrl, createOpenGraphImage } from "@/lib/seo";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://teleflora-headless-prototype.vercel.app"),
  title: {
    default: "Teleflora Headless Prototype",
    template: "%s | Teleflora Headless Prototype"
  },
  description:
    "A headless florist storefront prototype built with Next.js, mock commerce data, and production-minded structure.",
  icons: {
    icon: [{ url: "https://assets.teleflora.com/images/favicon.png", type: "image/png" }],
    shortcut: [{ url: "https://assets.teleflora.com/images/favicon.png", type: "image/png" }],
    apple: [{ url: "https://assets.teleflora.com/images/favicon.png", type: "image/png" }]
  },
  alternates: {
    canonical: buildAbsoluteUrl("/")
  },
  openGraph: {
    title: "Teleflora Headless Prototype",
    description:
      "A modern floral ecommerce storefront prototype designed for stakeholder review and future API integration.",
    url: buildAbsoluteUrl("/"),
    siteName: "Teleflora Headless Prototype",
    images: [createOpenGraphImage("/images/og-placeholder.svg")],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleflora Headless Prototype",
    description:
      "A modern floral ecommerce storefront prototype designed for stakeholder review and future API integration.",
    images: [buildAbsoluteUrl("/images/og-placeholder.svg")]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://assets.teleflora.com" />
        <link rel="preload" as="style" href="https://assets.teleflora.com/css/fonts.css?v=262" />
        <link rel="stylesheet" href="https://assets.teleflora.com/css/fonts.css?v=262" />
      </head>
      <body>
        <div className="site-shell">
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
