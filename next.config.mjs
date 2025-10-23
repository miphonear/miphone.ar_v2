/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google
      'm.media-amazon.com', // Amazon
      'fdn2.gsmarena.com', // GSMarena
    ],
  },
}

export default nextConfig
