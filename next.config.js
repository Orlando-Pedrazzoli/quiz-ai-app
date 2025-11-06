/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Adiciona suporte para pdf-parse
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  }
}

module.exports = nextConfig