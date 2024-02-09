/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: process.env.NEXT_LOCALHOST ? 'standalone' : 'export',
  distDir: 'dist',
  images: { loader: 'custom' },
  async rewrites() {
    if (!process.env.NEXT_LOCALHOST) {
      return []
    }

    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
