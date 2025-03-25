import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'localhost:9000'],
  },
  async rewrites() {
      return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:8080/api/:path*',
          },
      ]
  }
};

export default nextConfig;
