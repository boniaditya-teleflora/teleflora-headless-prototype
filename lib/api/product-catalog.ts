import productsJson from "@/lib/mocks/products.json";
import { getCanonicalCategorySlug, getCategoryConfig } from "@/lib/config/category-config";

import type {
  BouquetCardItem,
  BouquetProduct,
  CategoryReference,
  HomePageData,
  ProductAddOn,
  ProductPageData,
  ProductSummary
} from "./types";

type CatalogProduct = ProductPageData & {
  id: string;
  categorySlugs: string[];
};

type ProductCatalog = {
  defaultAddOns: ProductAddOn[];
  products: CatalogProduct[];
};

type ProductRailWithRefs = Omit<HomePageData["productRails"][number], "items"> & {
  productSlugs?: string[];
  items?: ProductSummary[];
};

type FeaturedProductsWithRefs = Omit<HomePageData["featuredProducts"], "items"> & {
  productSlugs?: string[];
  items?: ProductSummary[];
};

type BouquetCollectionWithRefs = Omit<HomePageData["bouquetCollections"]["sections"][number], "products"> & {
  productSlugs?: string[];
  products?: BouquetProduct[];
};

type HomePageDataWithRefs = Omit<HomePageData, "bouquetCollections" | "productRails" | "featuredProducts"> & {
  bouquetCollections: {
    sections: BouquetCollectionWithRefs[];
  };
  productRails: ProductRailWithRefs[];
  featuredProducts: FeaturedProductsWithRefs;
};

const catalog = productsJson as ProductCatalog;

function categoryWithConfig(category: CategoryReference): CategoryReference {
  const config = getCategoryConfig(category.slug);

  if (!config) {
    return category;
  }

  return {
    slug: config.slug,
    title: category.title || config.name,
    href: config.url,
    catId: category.catId ?? config.catId
  };
}

function normalizeProduct(product: CatalogProduct): ProductPageData {
  return {
    ...product,
    category: categoryWithConfig(product.category),
    href: product.href ?? `/product/${product.slug}`,
    images: product.images?.length ? product.images : [product.image],
    addOns: product.addOns?.length ? product.addOns : catalog.defaultAddOns,
    details: product.details
      ? {
          ...product.details,
          description: product.details.description || product.longDescription || product.shortDescription
        }
      : {
          description: product.longDescription || product.shortDescription
        }
  };
}

function toSummary(product: ProductPageData): ProductSummary {
  return {
    id: product.id,
    slug: product.slug,
    aliases: product.aliases,
    name: product.name,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    price: product.price,
    salePrice: product.salePrice,
    currency: product.currency,
    image: product.image,
    badges: product.badges,
    deliveryNote: product.deliveryNote,
    href: `/product/${product.slug}`,
    productId: product.productId,
    skuId: product.skuId ?? product.sku,
    category: product.category,
    subcategory: product.subcategory,
    occasion: product.occasion,
    categorySlugs: product.categorySlugs,
    filters: product.filters,
    rating: product.rating,
    seo: product.seo,
    sourceUrl: product.sourceUrl
  };
}

function productMatchesSlug(product: CatalogProduct, slug: string) {
  return product.slug === slug || product.aliases?.includes(slug);
}

function normalizeSlug(slug: string) {
  return slug.trim().replace(/^\/product\//, "").replace(/^\/+|\/+$/g, "");
}

export function getAllCatalogProducts(): ProductPageData[] {
  return catalog.products.map(normalizeProduct);
}

export function getProductByCatalogSlug(slug: string): ProductPageData | null {
  const normalizedSlug = normalizeSlug(slug);
  const product = catalog.products.find((item) => productMatchesSlug(item, normalizedSlug));

  return product ? normalizeProduct(product) : null;
}

export function getAllProductSlugs() {
  return Array.from(
    new Set(catalog.products.flatMap((product) => [product.slug, ...(product.aliases ?? [])]))
  );
}

export function getProductSummariesBySlugs(slugs: string[]): ProductSummary[] {
  return slugs
    .map((slug) => getProductByCatalogSlug(slug))
    .filter((product): product is ProductPageData => Boolean(product))
    .map(toSummary);
}

export function getProductSummariesForCategory(categorySlug: string): ProductSummary[] {
  const canonicalSlug = getCanonicalCategorySlug(categorySlug);
  const products = getAllCatalogProducts().filter((product) =>
    product.categorySlugs?.some((slug) => getCanonicalCategorySlug(slug) === canonicalSlug)
  );

  return products.map(toSummary);
}

export function getRelatedProductSummaries(slug: string): ProductSummary[] {
  const product = getProductByCatalogSlug(slug);

  if (!product) {
    return [];
  }

  return getProductSummariesBySlugs(product.relatedProductSlugs);
}

export function getBouquetCardsBySlugs(slugs: string[]): BouquetCardItem[] {
  return getProductSummariesBySlugs(slugs).map((product) => ({
    id: product.productId ?? product.id ?? product.slug,
    name: product.name,
    price: product.salePrice ?? product.price,
    currency: product.currency,
    href: product.href ?? `/product/${product.slug}`,
    image: product.image.src,
    alt: product.image.alt,
    badge: product.badges[0],
    description: product.shortDescription,
    category: product.category?.title,
    availability: product.deliveryNote,
    deliveryNote: product.deliveryNote
  }));
}

export function hydrateHomePageData(home: HomePageDataWithRefs): HomePageData {
  return {
    ...home,
    bouquetCollections: {
      sections: home.bouquetCollections.sections.map((section) => ({
        ...section,
        products:
          section.products?.length || !section.productSlugs?.length
            ? section.products ?? []
            : getBouquetCardsBySlugs(section.productSlugs)
      }))
    },
    productRails: home.productRails.map((rail) => ({
      ...rail,
      items: rail.items?.length || !rail.productSlugs?.length ? rail.items ?? [] : getProductSummariesBySlugs(rail.productSlugs)
    })),
    featuredProducts: {
      ...home.featuredProducts,
      items:
        home.featuredProducts.items?.length || !home.featuredProducts.productSlugs?.length
          ? home.featuredProducts.items ?? []
          : getProductSummariesBySlugs(home.featuredProducts.productSlugs)
    }
  };
}
