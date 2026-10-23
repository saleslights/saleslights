/* One environment policy, read by metadata, robots, sitemap, headers and forms.
   Anything other than an explicit production build is treated as staging:
   noindex everywhere, empty sitemap, forms in dry-run. Failing closed means a
   forgotten env var produces an unindexed site, never an indexed staging copy. */

const PRODUCTION_ORIGIN = 'https://saleslights.com';

export const SITE_ENV = process.env.SITE_ENV === 'production' ? 'production' : 'staging';
export const IS_PRODUCTION = SITE_ENV === 'production';
export const SITE_URL = IS_PRODUCTION
  ? PRODUCTION_ORIGIN
  : (process.env.NEXT_PUBLIC_SITE_URL || 'https://staging.saleslights.com').replace(/\/$/, '');
export const CANONICAL_ORIGIN = PRODUCTION_ORIGIN;

export const FORMS_DRY_RUN = !IS_PRODUCTION || process.env.FORMS_DRY_RUN === 'true';

export const absolute = (path = '/') => `${CANONICAL_ORIGIN}${path}`;
