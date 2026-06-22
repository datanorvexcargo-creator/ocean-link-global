/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'kommodo.ai' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lenis'],
  },
};

export default nextConfig;
