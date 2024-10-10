/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Adjust the limit as per your needs
    },
  },
};

export default nextConfig;
