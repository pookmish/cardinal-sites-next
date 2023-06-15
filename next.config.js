const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  experimental: {
    serverActions: true,
  },
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
    if (process.env.DEV === 'true') {
      devRedirects.push({
        source: '/style-guide',
        destination: 'http://localhost:6006',
        permanent: false
      });
    }
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      ...devRedirects
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer(nextConfig);
