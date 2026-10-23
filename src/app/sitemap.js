import { IS_PRODUCTION, absolute } from '../lib/env';
import { PAGES } from '../content/seo';
import { POSTS } from '../content/posts';

export default function sitemap() {
  if (!IS_PRODUCTION) return [];
  const pages = Object.keys(PAGES).map((path) => ({ url: absolute(path), changeFrequency: path === '/lab/' ? 'weekly' : 'monthly', priority: path === '/' ? 1 : 0.7 }));
  const posts = POSTS.map((p) => ({ url: absolute(`/lab/${p.slug}/`), lastModified: p.date, changeFrequency: 'yearly', priority: 0.6 }));
  return [...pages, ...posts];
}
