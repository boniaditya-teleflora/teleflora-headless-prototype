import type { Metadata } from "next";

import type { CategoryPageData, ProductPageData } from "@/lib/api/types";

const SITE_NAME = "Teleflora Headless Prototype";
const SITE_URL = "https://teleflora-headless-prototype.vercel.app";

export function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function createOpenGraphImage(pathname: string) {
  return {
    url: buildAbsoluteUrl(pathname),
    width: 1200,
    height: 630,
    alt: "Teleflora Headless Prototype social preview"
  };
}

export function generateCategoryMetadata(category: {
  slug: string;
  title: string;
  description: string;
}) {
  const title = category.title;
  const pathname = `/category/${category.slug}`;

  return {
    title,
    description: category.description,
    alternates: {
      canonical: buildAbsoluteUrl(pathname)
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: category.description,
      url: buildAbsoluteUrl(pathname),
      siteName: SITE_NAME,
      type: "website",
      images: [createOpenGraphImage("/images/og-placeholder.svg")]
    }
  } satisfies Metadata;
}

export function generateProductMetadata(product: ProductPageData) {
  const pathname = `/product/${product.slug}`;
  const primaryImage = product.images[0]?.src ?? "/images/og-placeholder.svg";
  const title = product.seo?.title ?? product.name;
  const description = product.seo?.description ?? product.shortDescription;

  return {
    title,
    description,
    alternates: {
      canonical: buildAbsoluteUrl(pathname)
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: buildAbsoluteUrl(pathname),
      siteName: SITE_NAME,
      type: "website",
      images: [createOpenGraphImage(primaryImage)]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [buildAbsoluteUrl(primaryImage)]
    }
  } satisfies Metadata;
}

export function getProductStructuredData(product: ProductPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    category: product.category.title,
    image: product.images.map((image) => buildAbsoluteUrl(image.src)),
    brand: {
      "@type": "Brand",
      name: "Teleflora Headless Prototype"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: (product.salePrice ?? product.price).toFixed(2),
      availability: "https://schema.org/InStock",
      url: buildAbsoluteUrl(`/product/${product.slug}`)
    }
  };
}
