import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryHero } from "@/components/plp/CategoryHero";
import { CategoryNavigation } from "@/components/plp/CategoryNavigation";
import { CategorySeoContent } from "@/components/plp/CategorySeoContent";
import { PlpControls } from "@/components/plp/PlpControls";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { getCategoryBySlug, getCategoryNavigationContextBySlug, getCategorySlugs } from "@/lib/api";
import { generateCategoryMetadata } from "@/lib/seo";
import type { ProductSummary } from "@/lib/api/types";
import { filterProductsByCategoryFilters, hasActiveCategoryFilters } from "@/lib/plp/category-filters";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return generateCategoryMetadata({
      slug,
      title: "Category Not Found",
      description: "The requested floral collection could not be found."
    });
  }

  return generateCategoryMetadata({
    slug: category.slug,
    title: category.seoTitle,
    description: category.seoDescription
  });
}

function sortProducts(products: ProductSummary[], sortValue?: string) {
  const sortedProducts = [...products];

  if (sortValue === "bestsellers" || sortValue === "top-picks") {
    return sortedProducts.sort(
      (firstProduct, secondProduct) =>
        Number(secondProduct.badges.includes("Bestseller")) - Number(firstProduct.badges.includes("Bestseller"))
    );
  }

  if (sortValue === "price-low-high") {
    return sortedProducts.sort((firstProduct, secondProduct) => firstProduct.price - secondProduct.price);
  }

  if (sortValue === "price-high-low") {
    return sortedProducts.sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price);
  }

  return sortedProducts;
}

function getSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getBreadcrumbs(category: NonNullable<Awaited<ReturnType<typeof getCategoryBySlug>>>) {
  const currentLabel = category.breadcrumbTitle ?? category.title;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(category.breadcrumbs
      ?.filter((item) => item.slug !== category.slug && item.title !== category.title && item.title !== currentLabel)
      .map((item) => ({ label: item.title, href: item.href ?? `/category/${item.slug}` })) ?? []),
    { label: currentLabel }
  ];
  const seenItems = new Set<string>();

  return breadcrumbItems.filter((item) => {
    const itemKey = `${item.label}-${item.href ?? "current"}`;

    if (seenItems.has(itemKey)) {
      return false;
    }

    seenItems.add(itemKey);
    return true;
  });
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const selectedSort = getSearchParamValue(query.sort) ?? category.defaultSort ?? "bestsellers";
  const navigationCategory = (await getCategoryNavigationContextBySlug(slug)) ?? category;
  const selectedFilters = {
    price: getSearchParamValue(query.price) || undefined,
    flower: getSearchParamValue(query.flower) || undefined,
    color: getSearchParamValue(query.color) || undefined
  };
  const hasActiveFilters = hasActiveCategoryFilters(selectedFilters);
  const filteredProducts = filterProductsByCategoryFilters(category.products, selectedFilters);
  const products = sortProducts(filteredProducts, selectedSort);
  const catId = getSearchParamValue(query.catID) ?? category.catId;
  const zip = getSearchParamValue(query.zip) ?? "";
  const deliveryDate = getSearchParamValue(query.deliveryDate) ?? "";
  const breadcrumbs = getBreadcrumbs(category);

  return (
    <div className="plp-page page-section">
      <div className="page-stack">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
        <CategoryHero category={category} />
        <Container className="plp-layout">
          <CategoryNavigation category={category} navigationCategory={navigationCategory} />
          <section className="plp-results" aria-labelledby="category-heading">
            <PlpControls
              category={category}
              controlsCategory={navigationCategory}
              options={navigationCategory.sortOptions}
              selectedSort={selectedSort}
              catId={catId}
              filters={selectedFilters}
              zip={zip}
              deliveryDate={deliveryDate}
            />
            <ProductGrid products={products} emptyTitle="No arrangements match these filters." variant="category" />
            {!hasActiveFilters && category.resultCount && category.resultCount > products.length ? (
              <div className="plp-pagination" aria-label={`More ${category.title} products`}>
                <a href={`/category/${category.slug}?catID=${catId ?? ""}&page=2`}>Load More</a>
              </div>
            ) : null}
            <CategorySeoContent content={category.seoContent} />
          </section>
        </Container>
      </div>
    </div>
  );
}
