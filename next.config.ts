import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rhvc6oqjdslrsx4e.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "ryanteodoro.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
