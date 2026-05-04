# Component Map

## Home page

- `app/page.tsx`
- `components/home/Hero`
- `components/home/FeaturedCategories`
- `components/home/FeaturedProducts`
- `components/home/PromoBanner`

Responsibilities:
Hero owns primary campaign messaging.
Featured category and product modules reuse shared card patterns and support future CMS-driven merchandising.

## Category page

- `app/category/[slug]/page.tsx`
- `components/plp/CategoryHero`
- `components/plp/FilterPlaceholder`
- `components/plp/SortBar`
- `components/plp/ProductGrid`
- `components/plp/ProductCard`

Responsibilities:
The page handles data lookup, metadata, and not-found behavior.
Grid and card components are reusable for homepage product modules and future search results.

## Product page

- `app/product/[slug]/page.tsx`
- `components/pdp/ProductGallery`
- `components/pdp/ProductInfo`
- `components/pdp/PurchasePanel`
- `components/pdp/RelatedProducts`

Responsibilities:
The page owns structured data injection and route metadata.
PDP modules are split so gallery, merchandising content, and purchase affordances can evolve independently.

## Layout and shared components

- `components/layout/Header`
- `components/layout/Footer`
- `components/layout/Navigation`
- `components/layout/Container`
- `components/shared/Button`
- `components/shared/SectionHeading`
- `components/shared/Breadcrumbs`
- `components/shared/Price`
- `components/shared/Badge`
- `components/shared/EmptyState`

Responsibilities:
Layout components define the global shell.
Shared components provide styling consistency, avoid duplicated markup, and keep page modules focused on composition rather than primitives.
