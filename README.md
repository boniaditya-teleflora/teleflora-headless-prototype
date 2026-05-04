# Teleflora Headless Prototype

A clean, mock-backed Next.js App Router storefront prototype for a florist/ecommerce experience inspired by Teleflora's headless future-state.

## What is included

- Home, category, and product detail pages
- Mock-backed data access isolated under `lib/api`
- SEO helpers and JSON-LD support
- Reusable UI components grouped by domain
- Lightweight responsive styling with a shared global stylesheet
- Documentation for scope, contracts, component ownership, and QA

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS via shared global styles

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` starts local development
- `npm run build` creates a production build
- `npm run start` serves the production build
- `npm run lint` runs Next.js linting

## Project structure

```text
teleflora-headless-prototype/
  app/
  components/
  docs/
  lib/
  public/
  styles/
```

## Notes

- All data currently comes from JSON mocks in `lib/mocks`.
- `lib/api` is intentionally shaped like a future CMS/commerce layer so external APIs can replace the mocks later with minimal page/component churn.
- The UI avoids copying Teleflora's proprietary design directly; it is a modern floral-commerce prototype intended for stakeholder review and engineering handoff.
