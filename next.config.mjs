/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["192.168.18.224"], // Add the hostname where your images are hosted
  },
}

export default nextConfig
