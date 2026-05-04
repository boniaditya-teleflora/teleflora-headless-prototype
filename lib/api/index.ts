import { safeArray } from "@/lib/utils";
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
import type { CategoryPageData, HomePageData, ProductPageData, ProductSummary, ProductVariant } from "./types";

export async function getHomePageData() {
  return readMockJson<HomePageData>("home.json");
}

export async function getCategoryBySlug(slug: string): Promise<CategoryPageData | null> {
  const canonicalSlug = getCanonicalCategorySlug(slug);
  const categoryConfig = getCategoryConfig(slug);
  const mockFile = categoryConfig ? getCategoryMockFile(categoryConfig.key) : undefined;

  if (mockFile && categoryConfig) {
    const category = await readMockJson<CategoryPageData>(mockFile);

    return {
      ...category,
      breadcrumbTitle: categoryConfig.breadcrumbLabel ?? category.title,
      facets: category.facets?.length ? category.facets : buildCategoryFacets(category.products, categoryConfig.catId),
      subcategories: category.subcategories?.length ? category.subcategories : getCategorySubcategoryLinks(categoryConfig.key),
      breadcrumbs: category.breadcrumbs?.length ? category.breadcrumbs : getCategoryBreadcrumbs(categoryConfig.key)
    } satisfies CategoryPageData;
  }

  if (!categoryConfig) {
    return null;
  }

  const baseCategory = await readMockJson<CategoryPageData>("category-flowers.json");

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
    facets: baseCategory.facets?.length ? baseCategory.facets : buildCategoryFacets(baseCategory.products, categoryConfig.catId),
    resultCount: baseCategory.products.length
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
  if (slug === "red-roses") {
    return readMockJson<ProductPageData>("product-red-roses.json");
  }

  const categories = await Promise.all((await getCategorySlugs()).map((categorySlug) => getCategoryBySlug(categorySlug)));
  const category = categories.find((item): item is CategoryPageData => Boolean(item?.products.some((product) => product.slug === slug)));
  const product = category?.products.find((item) => item.slug === slug);

  if (!category || !product) {
    return null;
  }

  const baseSku = product.skuId ?? `TF-${product.slug.toUpperCase()}`;
  const variants: ProductVariant[] = [
    {
      id: "standard",
      label: "Standard",
      description: "Full and fresh",
      price: product.price,
      sku: baseSku,
      dimensions: "Approx. 16 in H x 15 in W"
    },
    {
      id: "deluxe",
      label: "Deluxe",
      description: "More blooms, fuller shape",
      price: product.price + 10,
      sku: `${baseSku}-D`,
      dimensions: "Approx. 17 in H x 16 in W"
    },
    {
      id: "premium",
      label: "Premium",
      description: "Most lush and expressive",
      price: product.price + 20,
      sku: `${baseSku}-P`,
      dimensions: "Approx. 18 in H x 17 in W"
    }
  ];

  return {
    ...product,
    sku: baseSku,
    images: [product.image],
    category: {
      slug: category.slug,
      title: category.title
    },
    messageNote: "Add a personal card message and signature before checkout.",
    giftOptionsNote: "Choose optional balloons, chocolates, or a plush keepsake after selecting delivery details.",
    variants,
    addOns: [
      {
        id: "balloons",
        label: "Mylar balloon",
        description: "A cheerful occasion balloon paired with the arrangement.",
        price: 5.99
      },
      {
        id: "chocolates",
        label: "Chocolates",
        description: "A small box of chocolates for a sweeter delivery.",
        price: 12.99
      }
    ],
    details: {
      description: product.shortDescription,
      vase: "Delivered in a coordinated keepsake vase selected by a local florist.",
      orientation: "All-around",
      careTips: ["Refresh water daily.", "Keep away from direct heat.", "Trim stems after two days."]
    },
    trustMessages: ["Hand-arranged by a local florist", "Same-day delivery may be available", "Secure checkout with delivery review"],
    relatedProductSlugs: category.products.filter((item) => item.slug !== product.slug).map((item) => item.slug)
  } satisfies ProductPageData;
}

export async function getProductSlugs() {
  const categories = await Promise.all((await getCategorySlugs()).map((categorySlug) => getCategoryBySlug(categorySlug)));

  return Array.from(new Set(categories.flatMap((category) => category?.products.map((product) => product.slug) ?? [])));
}

export async function getRelatedProducts(slug: string): Promise<ProductSummary[]> {
  const product = await getProductBySlug(slug);
  const category = product ? await getCategoryBySlug(product.category.slug) : null;

  if (!product || !category) {
    return [];
  }

  const allowedSlugs = new Set(safeArray(product.relatedProductSlugs));

  return category.products.filter((item) => allowedSlugs.has(item.slug));
}
