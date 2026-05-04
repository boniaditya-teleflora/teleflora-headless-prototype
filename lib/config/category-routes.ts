import {
  CATEGORY_ENTRIES,
  getCanonicalCategorySlug,
  getCategoryBreadcrumbs,
  getCategoryCatId,
  getCategoryConfig,
  getCategoryHref,
  getCategoryMockFile,
  getCategoryPath,
  resolveCategoryHref
} from "@/lib/config/category-config";

export type { CategoryConfig, CategoryGroup, CategoryKey } from "@/lib/config/category-config";

export type CategoryRoute = {
  key: string;
  slug: string;
  catId: string;
  title: string;
  href: string;
};

export const CATEGORY_ROUTES: CategoryRoute[] = CATEGORY_ENTRIES.map((category) => ({
  key: category.key,
  slug: category.slug,
  catId: category.catId,
  title: category.name,
  href: category.url
}));

export function getCategoryRoute(keyOrSlug: string): CategoryRoute | undefined {
  const category = getCategoryConfig(keyOrSlug);

  if (!category) {
    return undefined;
  }

  return {
    key: category.key,
    slug: category.slug,
    catId: category.catId,
    title: category.name,
    href: category.url
  };
}

export {
  getCanonicalCategorySlug,
  getCategoryBreadcrumbs,
  getCategoryCatId,
  getCategoryConfig,
  getCategoryHref,
  getCategoryMockFile,
  getCategoryPath,
  resolveCategoryHref
};
