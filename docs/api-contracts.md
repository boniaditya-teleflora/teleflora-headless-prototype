# API Contracts

## Intent

`lib/api` currently reads JSON from `lib/mocks`, but each function is shaped like a future remote integration layer. Route components should not care whether the backing source is file-based, CMS-driven, or commerce-driven.

## Home endpoint

### Mock function

`getHomePageData(): Promise<HomePageData>`

### Future endpoint shape

`GET /api/home`

```json
{
  "hero": {
    "eyebrow": "string",
    "heading": "string",
    "subheading": "string",
    "primaryCta": { "label": "string", "href": "string" },
    "secondaryCta": { "label": "string", "href": "string" },
    "highlights": ["string"],
    "image": { "src": "string", "alt": "string" }
  },
  "featuredCategories": [
    {
      "slug": "string",
      "title": "string",
      "description": "string",
      "image": { "src": "string", "alt": "string" }
    }
  ],
  "featuredProducts": {
    "eyebrow": "string",
    "heading": "string",
    "description": "string",
    "items": ["ProductSummary"]
  },
  "promotions": [
    {
      "kicker": "string",
      "title": "string",
      "description": "string",
      "icon": { "src": "string", "alt": "string" }
    }
  ]
}
```

## Category endpoint

### Mock function

`getCategoryBySlug(slug: string): Promise<CategoryPageData | null>`

### Future endpoint shape

`GET /api/categories/:slug`

```json
{
  "slug": "flowers",
  "title": "Flowers",
  "description": "string",
  "seoTitle": "string",
  "seoDescription": "string",
  "heroImage": { "src": "string", "alt": "string" },
  "products": ["ProductSummary"]
}
```

## Product endpoint

### Mock function

`getProductBySlug(slug: string): Promise<ProductPageData | null>`

### Future endpoint shape

`GET /api/products/:slug`

```json
{
  "slug": "red-roses",
  "name": "string",
  "shortDescription": "string",
  "price": 84.99,
  "currency": "USD",
  "image": { "src": "string", "alt": "string" },
  "badges": ["string"],
  "deliveryNote": "string",
  "sku": "string",
  "images": [{ "src": "string", "alt": "string" }],
  "category": {
    "slug": "flowers",
    "title": "Flowers"
  },
  "messageNote": "string",
  "giftOptionsNote": "string",
  "relatedProductSlugs": ["string"]
}
```

## Supporting type notes

- `ProductSummary` is the shared card/listing shape used by the homepage, category page, and related product modules.
- `MediaAsset` deliberately stores a URL and alt text only; later integrations can enrich this with dimensions, focal points, or responsive sources.
- `relatedProductSlugs` is a lightweight prototype stand-in for a recommendations service or merchandising rule engine.
