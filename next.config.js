/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add this to handle dynamic routes in static export
  trailingSlash: true,
  generateStaticParams: async () => {
    return []
  }
};

module.exports = nextConfig;