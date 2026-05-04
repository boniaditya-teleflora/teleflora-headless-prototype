import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.teleflora.com",
        pathname: "/image/upload/**"
      },
      {
        protocol: "https",
        hostname: "img.teleflora.com",
        pathname: "/images/**"
      },
      {
        protocol: "https",
        hostname: "assets.teleflora.com",
        pathname: "/assets/products/**"
      },
      {
        protocol: "https",
        hostname: "shopperapproved.com",
        pathname: "/award/images/**"
      },
      {
        protocol: "https",
        hostname: "seal-sanjose.bbb.org",
        pathname: "/logo/**"
      }
    ]
  },
  reactStrictMode: true,
  turbopack: {
    root: path.join(__dirname)
  }
};

export default nextConfig;
