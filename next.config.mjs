/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nextjs.org'], // Allow images from nextjs.org (for the default template)
  },
  // Disable ESLint during builds for now
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
