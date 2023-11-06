const remotePatterns = [
  {
    // Allow any stanford domain for images, but require https.
    protocol: 'https',
    hostname: '**.stanford.edu',
  },
];
if (process.env.NODE_ENV === 'development') {
  remotePatterns.push({ hostname: '**' });
}

const nextConfig = {
  images: {
    remotePatterns: remotePatterns,
  },
  experimental: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    if (process.env.NEXT_PUBLIC_DOMAIN) {
      return [];
    }
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex,nofollow,noarchive',
          },
        ],
      },
    ];
  },
  async redirects() {
    const devRedirects = [];
    if (process.env.NODE_ENV === 'development') {
      devRedirects.push({
        source: '/style-guide',
        destination: 'http://localhost:6006',
        permanent: false,
      });
    }
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      ...devRedirects,
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer(nextConfig);
