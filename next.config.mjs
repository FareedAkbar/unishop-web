/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["192.168.18.224", "192.168.18.225"], // Add the hostname where your images are hosted
  },
}

export default nextConfig
