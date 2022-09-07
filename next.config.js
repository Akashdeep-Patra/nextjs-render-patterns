/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['img.dummyapi.io'],
  },
  experimental: {
    runtime: 'experimental-edge',
    serverComponents: true,
  },
};

module.exports = nextConfig;
