import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JsonLd, { ORG_ID, PERSON_ID } from '../components/JsonLd';
import { CANONICAL_ORIGIN, IS_PRODUCTION, SITE_URL } from '../lib/env';
import { LINKS } from '../content/site';

const DESCRIPTION =
  'Saleslights builds and operates revenue infrastructure for B2B companies: an agentic GTM engine, an in-market sales professional and senior strategy from founder Nick Krause. New York.';

export const metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: { default: 'Saleslights — Revenue infrastructure, operated', template: '%s | Saleslights' },
  description: DESCRIPTION,
  applicationName: 'Saleslights',
  authors: [{ name: 'Nick Krause', url: `${CANONICAL_ORIGIN}/about/` }],
  creator: 'Nick Krause',
  publisher: 'Saleslights',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '48x48' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Saleslights',
    url: CANONICAL_ORIGIN,
    title: 'Saleslights — Revenue infrastructure, operated',
    description: DESCRIPTION,
    locale: 'en_US',
    images: [{ url: '/brand/og-default-1200x630.png', width: 1200, height: 630, alt: 'Saleslights' }],
  },
  twitter: { card: 'summary_large_image', images: ['/brand/og-default-1200x630.png'] },
  robots: IS_PRODUCTION
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } }
    : { index: false, follow: false, nocache: true },
  other: { 'saleslights-env': IS_PRODUCTION ? 'production' : 'staging', 'saleslights-origin': SITE_URL },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#FAF8F2' };

const ORG = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Saleslights',
  legalName: 'Saleslights, Inc.',
  url: CANONICAL_ORIGIN,
  logo: `${CANONICAL_ORIGIN}/android-chrome-512x512.png`,
  description: DESCRIPTION,
  email: LINKS.email,
  areaServed: 'US',
  address: { '@type': 'PostalAddress', addressLocality: 'New York', addressRegion: 'NY', addressCountry: 'US' },
  founder: { '@id': PERSON_ID },
  sameAs: [LINKS.linkedin],
  knowsAbout: ['Go-to-market engineering', 'Revenue operations', 'Sales training', 'Cold calling', 'AI search optimization', 'B2B lead generation'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/inter-tight-latin-500-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {!IS_PRODUCTION && <div className="staging-bar" role="note">Staging preview — not indexed. Checkout here uses Stripe test mode.</div>}
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={ORG} />
      </body>
    </html>
  );
}
