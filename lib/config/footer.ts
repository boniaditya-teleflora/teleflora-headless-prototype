import type { LinkItem } from "@/lib/api/types";
import { getCategoryHref } from "@/lib/config/category-routes";

type FooterSocialLink = LinkItem & {
  icon: "facebook" | "instagram" | "tiktok" | "youtube";
};

type FooterBadge = {
  label: string;
  detail: string;
  kind: "shopper-approved" | "bbb";
};

type FooterAppBadge = {
  store: "apple" | "google";
  label: string;
  sublabel: string;
  href: string;
};

export type FooterLinkColumn = {
  title: string;
  links: LinkItem[];
};

const placeholderHref = "/";
const flowersHref = getCategoryHref("flowers");

export const footerConfig = {
  signup: {
    heading: "Join The Club!",
    description: "Receive Teleflora emails and be the first to know about exclusive offers, promotions, and more.",
    placeholder: "Enter E-Mail Address",
    buttonLabel: "GO"
  },
  social: {
    heading: "Connect with Teleflora",
    description: "Get the latest news and offers.",
    links: [
      { label: "Facebook", href: placeholderHref, icon: "facebook" },
      { label: "Instagram", href: placeholderHref, icon: "instagram" },
      { label: "TikTok", href: placeholderHref, icon: "tiktok" },
      { label: "YouTube", href: placeholderHref, icon: "youtube" }
    ] satisfies FooterSocialLink[]
  },
  app: {
    heading: "Get the App!",
    description: "Order flowers right from the Teleflora app.",
    badges: [
      { store: "apple", label: "App Store", sublabel: "Download on the", href: placeholderHref },
      { store: "google", label: "Google Play", sublabel: "GET IT ON", href: placeholderHref }
    ] satisfies FooterAppBadge[]
  },
  trust: {
    heading: "EXPERIENCE THE TELEFLORA DIFFERENCE",
    badges: [
      { label: "96,000+ 5-Star Ratings", detail: "Shopper Approved", kind: "shopper-approved" },
      { label: "Accredited Business", detail: "Rating: A+", kind: "bbb" }
    ] satisfies FooterBadge[]
  },
  linkColumns: [
    {
      title: "Our Company",
      links: [
        { label: "About Us", href: placeholderHref },
        { label: "Careers", href: placeholderHref },
        { label: "Our Services", href: placeholderHref },
        { label: "Partnership Program", href: placeholderHref },
        { label: "Affiliate Program", href: placeholderHref },
        { label: "Become a Teleflora Florist", href: placeholderHref },
        { label: "The Teleflora Difference", href: placeholderHref },
        { label: "Feedback", href: placeholderHref }
      ]
    },
    {
      title: "Flower Guides",
      links: [
        { label: "Corporate Gifting", href: flowersHref },
        { label: "Floral Facts & Inspiration", href: flowersHref },
        { label: "Gift Giving Guides", href: flowersHref },
        { label: "Sympathy & Funeral Guide", href: flowersHref },
        { label: "Wedding Flower Guide", href: flowersHref },
        { label: "Find a Florist", href: flowersHref },
        { label: "Same-Day Flower Delivery", href: flowersHref }
      ]
    },
    {
      title: "Shop Teleflora",
      links: [
        { label: "Local Flower Delivery", href: flowersHref },
        { label: "International Flower Delivery", href: flowersHref },
        { label: "Send Flowers to Mexico", href: flowersHref },
        { label: "Military Discount", href: placeholderHref },
        { label: "First Responders Discount", href: placeholderHref },
        { label: "Compra en Español", href: placeholderHref },
        { label: "Acheter en Français", href: placeholderHref }
      ]
    },
    {
      title: "Shop By Category",
      links: [
        { label: "Valentine's Day Flowers", href: getCategoryHref("valentines-day") },
        { label: "Easter Flowers", href: getCategoryHref("easter") },
        { label: "Mother's Day Flowers", href: getCategoryHref("mothers-day") },
        { label: "Thanksgiving Flowers", href: getCategoryHref("thanksgiving") },
        { label: "Christmas Flowers", href: getCategoryHref("christmas") },
        { label: "Funeral & Sympathy", href: getCategoryHref("sympathy") },
        { label: "Shop by Occasion +", href: getCategoryHref("occasions") },
        { label: "Birthday Flowers +", href: getCategoryHref("birthday") },
        { label: "Shop More Holidays +", href: getCategoryHref("occasions") },
        { label: "Seasonal Bouquets +", href: getCategoryHref("seasonal-flowers") }
      ]
    },
    {
      title: "Help",
      links: [
        { label: "Help Center", href: placeholderHref },
        { label: "Order Status", href: placeholderHref },
        { label: "Customer FAQs", href: placeholderHref },
        { label: "Order & Delivery Info", href: placeholderHref },
        { label: "Chat with an Expert", href: placeholderHref },
        { label: "Contact Customer Service", href: placeholderHref },
        { label: "Privacy Policy", href: placeholderHref },
        { label: "UNSUBSCRIBE", href: placeholderHref },
        { label: "Terms of Use", href: placeholderHref },
        { label: "Sitemap", href: placeholderHref }
      ]
    }
  ] satisfies FooterLinkColumn[],
  language: {
    label: "CHANGE LANGUAGE:",
    options: [{ label: "English", value: "en" }]
  },
  legal: {
    label: "Do Not Sell or Share My Personal Information",
    href: placeholderHref
  }
};
