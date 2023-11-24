const drupalUrl = new URL(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL);

const imagePatterns = [
  {
    protocol: drupalUrl.protocol.replace(':', ''),
    hostname: drupalUrl.hostname,
  },
];
if (process.env.NEXT_IMAGE_DOMAIN && drupalUrl.hostname !== process.env.NEXT_IMAGE_DOMAIN) {
  imagePatterns.push({hostname: process.env.NEXT_IMAGE_DOMAIN})
}

const nextConfig = {
  images: {
    remotePatterns: imagePatterns,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/_next/image',
          destination: '/_next/image?url=/no-image.png',
          has: [{ type: 'query', key: 'url', value: (`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}.*`) }],
          missing: [{ type: 'query', key: 'url', value: '(.*itok=([\\w|-]+))' }],
        },
        {
          source: '/_next/image',
          destination: '/_next/image?url=:url',
          has: [{ type: 'query', key: 'url', value: '(?<url>.*[jpg|png|jpeg|gif]\?itok=([\\w|-]+)).*' }],
        },
      ],
    };
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

if (process.env.NODE_ENV === 'development') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  module.exports = withBundleAnalyzer(nextConfig);
}