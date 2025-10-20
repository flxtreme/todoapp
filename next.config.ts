import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/todoapp',
  assetPrefix: '/todoapp/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
