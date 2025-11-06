/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  // Aumenta o limite de body para upload de PDFs
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

module.exports = nextConfig
