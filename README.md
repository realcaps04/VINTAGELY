# Vintagely

Footwear storefront — mobile app home screen built with React, TypeScript, Vite, Tailwind CSS v4 and Motion.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server          |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Lint with oxlint                   |

## Structure

```
src/
  components/    Screen sections (header, search, offers, brands, product grid, tab bar)
  data/          Product and brand catalogue
  store/         Wishlist, search and tab state
public/images/   Product and lifestyle photography
```

## Brand marks

The brand row uses neutral monogram placeholders. Replace the `mark` values in
`src/data/catalog.ts` with your own licensed logo assets before shipping.
