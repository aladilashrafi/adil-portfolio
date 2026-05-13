/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adilashrafi.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.adilashrafi.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  // ISR + SSR hybrid — pages revalidate every 60s
  // Each page controls its own revalidation via generateStaticParams / revalidate export
  output: 'standalone',
};

module.exports = nextConfig;
