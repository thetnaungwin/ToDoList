/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
    domains: ["1lrhdf4rurszfzxn.public.blob.vercel-storage.com"],
  },
};

export default nextConfig;
