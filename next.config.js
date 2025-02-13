/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeholder.com"], // Add any domains you're loading images from
  },
}

module.exports = nextConfig

