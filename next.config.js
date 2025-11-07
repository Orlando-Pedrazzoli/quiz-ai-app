/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  turbopack: {
    resolveAlias: {
      canvas: '',
      encoding: '',
    },
  },
};

module.exports = nextConfig;
