# Scope

## Purpose

Create a production-minded headless storefront prototype for Teleflora that demonstrates how a clean Next.js App Router codebase can support stakeholder review now and API-backed evolution later.

## Goals

- Deliver polished Home, PLP, and PDP routes using mock commerce data.
- Keep the codebase simple to run locally and straightforward to deploy on Vercel.
- Separate mock data, page composition, SEO helpers, and reusable components for clean handoff.
- Favor server-rendered pages, maintainable styling, and extensible TypeScript types.

## Non-goals

- Checkout, cart, account, search, and order management flows.
- Real commerce, inventory, or CMS integrations.
- Authentication, localization, or multi-market pricing.
- Complex filtering logic beyond a presentational placeholder.

## Assumptions

- The prototype is optimized for stakeholder demos and engineering foundation work rather than full transactional readiness.
- Mock JSON shapes intentionally resemble future API responses.
- Canonical URLs use a placeholder Vercel domain and should be replaced with the real production domain later.
- The product catalog is intentionally small, with one fully modeled PDP and related products sourced from the category mock.
