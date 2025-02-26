import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // 配置图片优化
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
