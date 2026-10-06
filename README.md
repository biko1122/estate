# Saray Estates — website prototype

Front-end design prototype for a real estate agency. Everything here is static/mock: no backend, no auth, forms don't send anything.

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # production build in dist/
```

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero + search, featured homes, why us, about, locations, testimonials, CTA |
| `/properties` | Listing with filters (state lives in the URL, e.g. `?purpose=rent&location=Maadi`) |
| `/properties/:slug` | Property details: gallery + lightbox, amenities, map, agent card, viewing request |
| `/about` | Story, mission & vision, stats, team |
| `/contact` | Contact details, form, map |
| `/favorites` | Saved homes (stored in localStorage) |

## Customising for the client

- **Brand colours and fonts:** `src/index.css` → the `@theme` block. Every component reads from these tokens.
- **Agency name, phone, email, address, hours, socials:** `src/config/site.js`
- **Logo:** `src/components/ui/Logo.jsx` (placeholder arch mark; swap for the client's SVG)
- **Listings / agents / locations / testimonials:** `src/data/*.js`
- **Photos:** IDs in `src/data/photos.js` point to Unsplash demo images. `src/utils/images.js` passes full URLs and `/local` paths through untouched, so real photos can be dropped in directly.

## Plugging in the backend later

The data files have the same shape an API would return. Replace the imports in the pages
(`properties`, `getProperty`, `getSimilar`, `agents`, …) with fetch calls; the components don't need to change.
Filtering is in `src/utils/filters.js` and can move server-side by sending the same URL params.

The "map" is an illustrated placeholder (`MapPlaceholder.jsx`); swap for Google Maps or Mapbox when there are real coordinates.
# estate
