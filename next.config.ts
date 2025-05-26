import type { NextConfig } from "next";
// import bundleAnalyzer from "@next/bundle-analyzer";
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/sitemap_index.xml", // Áp dụng cho đường dẫn sitemap index
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/phim",
        destination: "/",
        statusCode: 308,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/phim",
        destination: "/movie",
      },
      {
        source: "/phim/:slug",
        destination: "/movie/:slug",
      },
      {
        source: "/danh-muc/:slug",
        destination: "/list/:slug",
      },
      {
        source: "/xem/:slug/:episode",
        destination: "/watch/:slug/:episode",
      },

      {
        source: "/the-loai/:slug",
        destination: "/category/:slug",
      },
      {
        source: "/the-loai/:slug/page/:pageNumber",
        destination: "/category/:slug/page/:pageNumber",
      },
      {
        source: "/quoc-gia/:slug",
        destination: "/country/:slug",
      },
      {
        source: "/quoc-gia/:slug/page/:pageNumber",
        destination: "/country/:slug/page/:pageNumber",
      },
      {
        source: "/tim-kiem",
        destination: "/search",
      },
    ];
  },

  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.ophim.live",
      },
    ],
  },
};
// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

module.exports = nextConfig;
