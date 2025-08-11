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
    domains: ['lh3.googleusercontent.com'], // ✅ dominio permitido para <Image>
  },
}

export default nextConfig
