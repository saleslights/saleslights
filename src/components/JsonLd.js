import { CANONICAL_ORIGIN } from '../lib/env';

export default function JsonLd({ data }) {
  const payload = { '@context': 'https://schema.org', ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }}
    />
  );
}

export const ORG_ID = `${CANONICAL_ORIGIN}/#organization`;
export const PERSON_ID = `${CANONICAL_ORIGIN}/about/#nick-krause`;
