# saleslights.com

Saleslights marketing site: Next.js 16 (App Router), run as a Node server behind Apache.

- `src/content/site.js` — public prices, offers and links.
- `src/content/seo.js` — per-route SEO contract; `scripts/verify-routes.mjs` gates against it.
- `src/content/posts.js` — AI Lab posts.
- `src/lib/env.js` — one environment policy: anything other than `SITE_ENV=production` is noindex with an empty sitemap, forms run dry and checkout uses Stripe test mode.
- `deploy/` — deploy script (`staging` | `production`) and Apache vhosts.

```bash
npm ci
SITE_ENV=staging npm run build && PORT=3910 npm start
BASE_URL=http://127.0.0.1:3910 EXPECT_ENV=staging npm run verify
node scripts/qa-screens.mjs http://127.0.0.1:3910 ./qa   # full-page screenshots, overflow and console checks
```

This repository is public: keep credentials, client material and internal notes out of it. Forms read `FORMS_DATA_DIR` and optional `SMTP_*` / `NOTIFY_TO` from the server environment only.

Typeface: Inter Tight (SIL Open Font License).
