# BA PyroCalc Remastered

PyroCalc is now structured as a small full-stack dashboard instead of a single-page calculator. The app keeps the pyroxene planning core, then layers in account tracking, historical snapshots, CRUD planning workflows, and a lightweight API for persistent storage.

## What changed

- Multi-account dashboard with account metadata and balance management
- Historical snapshot tracking and recent transaction logging
- Banner forecast workspace with projected pyroxene sources
- CRUD recruitment plans tied to target banners
- Express API with file-backed persistence for local development
- Local fallback mode so the frontend still works without the API running

## Stack

- Vue 3 + Vite
- TypeScript
- Express
- JSON-backed local persistence with a PostgreSQL-friendly data shape

## Run the app

Install dependencies:

```sh
npm install
```

Start the full stack locally:

```sh
npm run dev:full
```

Frontend only:

```sh
npm run dev
```

Backend only:

```sh
npm run api
```

Build and type-check:

```sh
npm run build
```

## Notes

- API data is stored in `server/data/pyrocalc-db.json`.
- If the API is unavailable, the Vue app falls back to `localStorage` using the same seeded demo dataset.
- The backend is intentionally lightweight, but the shapes map cleanly to a future PostgreSQL migration if you want to add Prisma, Drizzle, or another ORM next.
