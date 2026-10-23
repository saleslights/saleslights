/** @type {import('next').NextConfig} */
const isProduction = process.env.SITE_ENV === 'production';

const security = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ['image/webp'] },
  async headers() {
    const headers = [...security];
    if (!isProduction) headers.push({ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' });
    return [{ source: '/:path*', headers }];
  },
};

export default nextConfig;
