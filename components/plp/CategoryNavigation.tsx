import Link from "next/link";

import type { CategoryPageData, LinkItem } from "@/lib/api/types";

type CategoryNavigationItem = LinkItem & {
  isActive?: boolean;
};

function getCategoryHref(category: CategoryPageData) {
  return category.catId ? `/category/${category.slug}?catID=${category.catId}` : `/category/${category.slug}`;
}

function getCategoryIdFromHref(href: string) {
  const [, queryString] = href.split("?");

  if (!queryString) {
    return undefined;
  }

  return new URLSearchParams(queryString).get("catID") ?? undefined;
}

function isCurrentCategoryLink(category: CategoryPageData, href: string) {
  const hrefPath = href.split("?")[0];
  const hrefCategoryId = getCategoryIdFromHref(href);

  return hrefPath.endsWith(`/category/${category.slug}`) || Boolean(category.catId && hrefCategoryId === category.catId);
}

type CategoryNavigationProps = {
  category: CategoryPageData;
  navigationCategory?: CategoryPageData;
};

export function CategoryNavigation({ category, navigationCategory = category }: CategoryNavigationProps) {
  if (!navigationCategory.subcategories?.length) {
    return null;
  }

  const items: CategoryNavigationItem[] = [
    {
      label: `All ${navigationCategory.title}`,
      href: getCategoryHref(navigationCategory),
      isActive: isCurrentCategoryLink(category, getCategoryHref(navigationCategory))
    },
    ...navigationCategory.subcategories.map((item) => ({
      ...item,
      isActive: isCurrentCategoryLink(category, item.href)
    }))
  ];
  const hasActiveItem = items.some((item) => item.isActive);

  return (
    <nav className="plp-category-nav" aria-labelledby="plp-category-nav-heading">
      <h2 className="sr-only" id="plp-category-nav-heading">
        {navigationCategory.title}
      </h2>
      <ul className="plp-category-nav__list">
        {items.map((item, index) => {
          const isActive = item.isActive || (!hasActiveItem && index === 0);

          return (
          <li
            key={item.href}
            className={`plp-category-nav__item${isActive ? " plp-category-nav__item--active" : ""}`}
          >
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`plp-category-nav__link${isActive ? " plp-category-nav__link--active" : ""}`}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
          );
        })}
      </ul>
    </nav>
  );
}
