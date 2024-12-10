import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "placehold.co" }, { hostname: "i.scdn.co" }],
    unoptimized: true,
  },
};

export default nextConfig;
