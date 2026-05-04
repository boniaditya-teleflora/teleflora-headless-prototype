export type MediaAsset = {
  src: string;
  alt: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type LinkGroup = {
  title: string;
  links: LinkItem[];
};

export type ProductSummary = {
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  currency: string;
  image: MediaAsset;
  badges: string[];
  deliveryNote: string;
  href?: string;
  productId?: string;
  skuId?: string;
  filters?: {
    flower?: string[];
    color?: string[];
  };
};

export type BouquetProduct = {
  id: string;
  name: string;
  price: number | string;
  href: string;
  image: string;
  alt: string;
};

export type BouquetCardItem = BouquetProduct & {
  title?: string;
  salePrice?: number | string;
  currency?: string;
  badge?: string;
  label?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  category?: string;
  availability?: string;
  deliveryNote?: string;
};

export type BouquetProductSectionConfig = {
  id: string;
  heading: string;
  subheading?: string;
  layout: "grid" | "rail" | "hero" | "theme" | "promo" | "trending" | "showcase";
  theme?: string;
  cardsVisible?: number;
  scroll?: boolean;
  cta?: LinkItem;
  products: BouquetCardItem[];
};

export type BouquetCollectionSection = {
  id: string;
  title: string;
  subtitle?: string;
  cta?: LinkItem;
  theme: "hero-purple" | "floral-banner";
  backgroundColor?: string;
  backgroundImage?: string;
  products: BouquetProduct[];
};

export type HomepageSection =
  | {
      id: string;
      type: "promoSplit";
      title: string;
      copy: string;
      inlineLink?: LinkItem;
      ctaLabel?: string;
      ctaHref?: string;
      theme: "lavender" | "deal";
      brandText?: string;
      backgroundImage?: string;
      leftImage?: MediaAsset;
      rightImage?: MediaAsset;
      imagePosition?: "left" | "right";
    }
  | {
      id: string;
      type: "bouquetGrid";
      title: string;
      subtitle?: string;
      ctaLabel?: string;
      ctaHref?: string;
      theme: "birthday" | "congrats" | "trending";
      bouquetsSourceKey?: string;
      products?: BouquetProduct[];
    }
  | {
      id: string;
      type: "subscriptionPromo";
      title: string;
      copy: string;
      ctaLabel: string;
      ctaHref: string;
      theme: "subscription";
      brandText?: string;
      leftImage: MediaAsset;
    }
  | {
      id: string;
      type: "galleryStrip";
      title: string;
      theme: "gallery";
      bouquetsSourceKey?: string;
      galleryImages?: Array<MediaAsset & { href?: string }>;
    };

export type CategoryReference = {
  slug: string;
  title: string;
  href?: string;
  catId?: string;
};

export type CategorySortOption = {
  label: string;
  value: string;
};

export type CategoryFacetOption = LinkItem & {
  count?: number;
  swatch?: string;
};

export type CategoryFacet = {
  title: string;
  options: CategoryFacetOption[];
  expanded?: boolean;
};

export type CategorySeoBlock = {
  heading: string;
  headingLevel: "h2" | "h3" | "h4";
  bodyHtml?: string;
};

export type CategorySeoContent = {
  blocks: CategorySeoBlock[];
  faqJsonLd?: {
    "@context": "https://schema.org";
    "@type": "FAQPage";
    mainEntity: Array<{
      "@type": "Question";
      name: string;
      acceptedAnswer: {
        "@type": "Answer";
        text: string;
      };
    }>;
  };
};

export type CategoryPageData = {
  slug: string;
  catId?: string;
  title: string;
  headerTitle?: string;
  breadcrumbTitle?: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  heroImage?: MediaAsset;
  breadcrumbs?: CategoryReference[];
  subcategories?: LinkItem[];
  facets?: CategoryFacet[];
  sortOptions?: CategorySortOption[];
  defaultSort?: string;
  resultCount?: number;
  seoContent?: CategorySeoContent;
  products: ProductSummary[];
};

export type ProductVariant = {
  id: string;
  label: string;
  description: string;
  price: number;
  sku: string;
  dimensions?: string;
};

export type ProductAddOn = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type ProductPageData = ProductSummary & {
  sku: string;
  images: MediaAsset[];
  category: CategoryReference;
  messageNote: string;
  giftOptionsNote: string;
  relatedProductSlugs: string[];
  variants?: ProductVariant[];
  addOns?: ProductAddOn[];
  details?: {
    description: string;
    vase?: string;
    orientation?: string;
    careTips?: string[];
  };
  trustMessages?: string[];
};

export type HomePageData = {
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
    highlights: string[];
    image: MediaAsset;
  };
  quickShop: {
    eyebrow: string;
    heading: string;
    description: string;
    occasions: string[];
    deliveryWindows: string[];
    zipPlaceholder: string;
  };
  occasionShortcuts: Array<{
    key: string;
    href: string;
    image: string;
  }>;
  homepageSections: HomepageSection[];
  bouquetCollections: {
    sections: BouquetCollectionSection[];
  };
  featuredCategories: Array<{
    slug: string;
    title: string;
    description: string;
    image: MediaAsset;
  }>;
  productRails: Array<{
    eyebrow: string;
    heading: string;
    description: string;
    cta: LinkItem;
    items: ProductSummary[];
  }>;
  featuredProducts: {
    eyebrow: string;
    heading: string;
    description: string;
    items: ProductSummary[];
  };
  campaignFeature: {
    eyebrow: string;
    heading: string;
    description: string;
    image: MediaAsset;
    cta: LinkItem;
    highlights: string[];
  };
  promotions: Array<{
    kicker: string;
    title: string;
    description: string;
    icon: MediaAsset;
  }>;
  editorialContent: {
    heading: string;
    sections: Array<{
      title: string;
      body: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  newsletter: {
    heading: string;
    description: string;
    benefits: string[];
  };
};
