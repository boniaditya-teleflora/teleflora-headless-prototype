import {
  CATEGORY_ENTRIES,
  getCanonicalCategorySlug,
  getCategoryBreadcrumbs,
  getCategoryConfig,
  getCategoryMockFile,
  getCategoryNavigationRoot,
  getCategorySubcategoryLinks
} from "@/lib/config/category-config";
import { buildCategoryFacets } from "@/lib/plp/category-filters";

import { readMockJson } from "./mock-loader";
import {
  getAllProductSlugs,
  getProductByCatalogSlug,
  getProductSummariesBySlugs,
  getProductSummariesForCategory,
  getRelatedProductSummaries,
  hydrateHomePageData
} from "./product-catalog";
import type { CategoryPageData, HomePageData, ProductSummary } from "./types";

type CategoryPageMockData = Omit<CategoryPageData, "products"> & {
  productSlugs?: string[];
  products?: ProductSummary[];
};

export async function getHomePageData() {
  const home = await readMockJson<HomePageData>("home.json");

  return hydrateHomePageData(home);
}

function hydrateCategoryProducts(category: CategoryPageMockData, fallbackSlug: string) {
  if (category.productSlugs?.length) {
    return getProductSummariesBySlugs(category.productSlugs);
  }

  if (category.products?.length) {
    return category.products;
  }

  return getProductSummariesForCategory(fallbackSlug);
}

export async function getCategoryBySlug(slug: string): Promise<CategoryPageData | null> {
  const canonicalSlug = getCanonicalCategorySlug(slug);
  const categoryConfig = getCategoryConfig(slug);
  const mockFile = categoryConfig ? getCategoryMockFile(categoryConfig.key) : undefined;

  if (mockFile && categoryConfig) {
    const category = await readMockJson<CategoryPageMockData>(mockFile);
    const products = hydrateCategoryProducts(category, categoryConfig.slug);

    return {
      ...category,
      products,
      breadcrumbTitle: categoryConfig.breadcrumbLabel ?? category.title,
      facets: category.facets?.length ? category.facets : buildCategoryFacets(products, categoryConfig.catId),
      subcategories: category.subcategories?.length ? category.subcategories : getCategorySubcategoryLinks(categoryConfig.key),
      breadcrumbs: category.breadcrumbs?.length ? category.breadcrumbs : getCategoryBreadcrumbs(categoryConfig.key),
      resultCount: category.resultCount ?? products.length
    } satisfies CategoryPageData;
  }

  if (!categoryConfig) {
    return null;
  }

  const baseCategory = await readMockJson<CategoryPageMockData>("category-flowers.json");
  const products = getProductSummariesForCategory(categoryConfig.slug);
  const fallbackProducts = products.length ? products : hydrateCategoryProducts(baseCategory, canonicalSlug);

  return {
    ...baseCategory,
    slug: canonicalSlug,
    catId: categoryConfig.catId,
    title: categoryConfig.name,
    headerTitle: categoryConfig.name,
    breadcrumbTitle: categoryConfig.breadcrumbLabel ?? categoryConfig.name,
    description:
      categoryConfig.description ??
      `${categoryConfig.name} arranged by local Teleflora florists with the same product-listing experience and reusable category-page structure.`,
    seoTitle: categoryConfig.seoTitle ?? `${categoryConfig.name} | Teleflora`,
    seoDescription: categoryConfig.seoDescription ?? `Shop ${categoryConfig.name.toLowerCase()} with local florist delivery from Teleflora.`,
    breadcrumbs: getCategoryBreadcrumbs(categoryConfig.key),
    subcategories: getCategorySubcategoryLinks(categoryConfig.key),
    products: fallbackProducts,
    facets: baseCategory.facets?.length ? baseCategory.facets : buildCategoryFacets(fallbackProducts, categoryConfig.catId),
    resultCount: fallbackProducts.length
  } satisfies CategoryPageData;
}

export async function getCategoryNavigationContextBySlug(slug: string) {
  const navigationRoot = getCategoryNavigationRoot(slug);

  if (!navigationRoot) {
    return null;
  }

  return getCategoryBySlug(navigationRoot.slug);
}

export async function getCategorySlugs() {
  return Array.from(new Set(CATEGORY_ENTRIES.map((category) => category.slug)));
}

export async function getProductBySlug(slug: string) {
  return getProductByCatalogSlug(slug);
}

export async function getProductSlugs() {
  return getAllProductSlugs();
}

export async function getRelatedProducts(slug: string): Promise<ProductSummary[]> {
  return getRelatedProductSummaries(slug);
}
