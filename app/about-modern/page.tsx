import type { Metadata } from "next";

import { AboutModernPage } from "@/components/about/AboutPages";
import { buildAbsoluteUrl, createOpenGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Teleflora - Our Company & Contact Information | Teleflora",
  description: "Want to know more about Teleflora and our great floral products? Browse this page to learn more about our company.",
  keywords: ["About teleflora"],
  alternates: {
    canonical: buildAbsoluteUrl("/about-modern")
  },
  openGraph: {
    title: "About Teleflora - Our Company & Contact Information | Teleflora",
    description: "Want to know more about Teleflora and our great floral products? Browse this page to learn more about our company.",
    url: buildAbsoluteUrl("/about-modern"),
    siteName: "Teleflora",
    images: [createOpenGraphImage("/images/og-placeholder.svg")],
    type: "website"
  }
};

const aboutStructuredData = {
  "@context": "https://www.schema.org",
  "@type": "Organization",
  name: "Teleflora - About",
  url: buildAbsoluteUrl("/about-modern"),
  logo: "https://img.teleflora.com/image/upload/fl_lossy,f_auto,q_auto:eco/prod/logos/teleflora-logo-reverse.jpg",
  description:
    "Teleflora makes it easy to order flowers online and get same day flower delivery right to your loved one’s door, no matter what the occasion is.",
  sameAs: [
    "https://www.pinterest.com/teleflora/",
    "https://www.facebook.com/teleflora",
    "https://twitter.com/teleflora",
    "https://www.youtube.com/teleflora/"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+18008353356",
    contactType: "customer service"
  }
};

export default function ModernAboutRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }} />
      <AboutModernPage />
    </>
  );
}
