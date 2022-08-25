/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.dummyapi.io'],
  },
  experimental: {
    runtime: 'experimental-edge',
  },
};

module.exports = nextConfig;
