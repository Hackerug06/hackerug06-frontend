/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push("tailwindcss-animate")
    }
    return config
  },
}

module.exports = nextConfig

      
