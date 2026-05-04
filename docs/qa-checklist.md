# QA Checklist

## Functional checks

- Homepage loads without runtime errors.
- Primary CTAs navigate to the expected PLP and PDP routes.
- Category page renders hero, filter placeholder, sort UI, and product grid.
- Product page renders gallery, pricing, purchase placeholders, and related products.
- Unknown product or category slugs render the not-found experience.

## Responsive checks

- Header navigation remains usable on mobile widths.
- Hero section stacks cleanly on tablet and mobile.
- Product cards reflow from four columns to two columns to one column.
- PDP gallery and purchase modules stack without overlap on narrow screens.

## SEO checks

- Layout metadata provides default title and description.
- Category and product routes generate route-specific metadata.
- Canonical URLs reflect the placeholder production domain pattern.
- Product page includes JSON-LD product structured data.

## Accessibility basics

- All decorative and product imagery includes alt text.
- Headings follow a logical order per page.
- Links and buttons remain keyboard focusable.
- Color contrast is reviewed against the light floral palette.

## Vercel deployment verification

- `npm run build` completes successfully in a clean environment.
- No secrets are required for the mock-backed build.
- Static assets in `public/` resolve correctly after deployment.
- Canonical domain and OG image URLs are updated before production launch.
