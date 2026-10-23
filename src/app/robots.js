import { IS_PRODUCTION, CANONICAL_ORIGIN } from '../lib/env';

/* Staging stays crawlable so crawlers can SEE the noindex header and meta;
   blocking it here would hide the noindex instruction. Production advertises the sitemap. */
export default function robots() {
  if (!IS_PRODUCTION) return { rules: [{ userAgent: '*', allow: '/' }] };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Bingbot'], allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
    host: CANONICAL_ORIGIN,
  };
}
