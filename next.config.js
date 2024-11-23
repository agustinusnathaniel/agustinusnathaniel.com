const { withContentCollections } = require('@content-collections/next');

/**
 * @docs
 * - https://scotthelme.co.uk/content-security-policy-an-introduction/
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */
const ContentSecurityPolicy = `
  default-src 'self' *.sznm.dev *.agustinusnathaniel.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' umami.sznm.dev cdn.vercel-insights.com vercel.live *.sznm.dev *.agustinusnathaniel.com;
  frame-src giscus.app vercel.live www.youtube.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/ *.sznm.dev *.agustinusnathaniel.com;
  img-src * blob: data: *.freepik.com;
  media-src 'none';
  connect-src *;
  font-src 'self' https://fonts.gstatic.com/ *.sznm.dev *.agustinusnathaniel.com;
`;

/**
 * @docs
 * - https://nextjs.org/docs/advanced-features/security-headers
 */
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'geolocation=()',
  },
];

const portfolioZoneUrl = process.env.PORTFOLIO_ZONE_URL ?? '';
const portfolioDataPrefix = `/_next/data/${process.env.PORTFOLIO_BUILD_ID}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy#without-nonces
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  eslint: {
    dirs: ['src'],
  },
  transpilePackages: ['lodash-es'],
  experimental: {
    scrollRestoration: true,
  },
  redirects: () => {
    return [
      {
        source: '/snippets/:id',
        destination: '/notes/:id',
        permanent: false,
      },
    ];
  },
  rewrites: () => ({
    beforeFiles: [
      {
        source: '/portfolio',
        destination: `${portfolioZoneUrl}/portfolio`,
      },
      {
        source: '/portfolio/:path*',
        destination: `${portfolioZoneUrl}/portfolio/:path*`,
      },
      {
        source: `${portfolioDataPrefix}/portfolio.json`,
        destination: `${portfolioZoneUrl}${portfolioDataPrefix}/portfolio.json`,
      },
      {
        source: `${portfolioDataPrefix}/portfolio/:path*`,
        destination: `${portfolioZoneUrl}${portfolioDataPrefix}/portfolio/:path*`,
      },
      {
        source: '/api/portfolio/:path*',
        destination: `${portfolioZoneUrl}/api/portfolio/:path*`,
      },
      {
        source: '/assets/portfolio/:path*',
        destination: `${portfolioZoneUrl}/assets/portfolio/:path*`,
      },
    ],
  }),
};

/** @type {import('next').NextConfig} */
module.exports = withContentCollections(nextConfig);
