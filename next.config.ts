import type { NextConfig } from "next";

const WP_CMS_URL = process.env.NEXT_PUBLIC_WP_CMS_URL || 'http://cms.bowlingnavi.com';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'cms.bowlingnavi.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.bowlingnavi.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        // CMSの画像をNext.js経由でプロキシ（Mixed Content対策）
        source: '/wp-content/:path*',
        destination: `${WP_CMS_URL}/wp-content/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/columns/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
