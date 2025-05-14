import type { NextConfig } from "next";
// import bundleAnalyzer from "@next/bundle-analyzer";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/xem-phim",
        destination: "/",
        statusCode: 308,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/xem-phim",
        destination: "/movie",
      },
      {
        source: "/xem-phim/:slug",
        destination: "/movie/:slug",
      },
      {
        source: "/xem-phim/:slug/:episode",
        destination: "/movie/:slug/:episode",
      },

      {
        source: "/danh-sach/:slug",
        destination: "/list/:slug",
      },
      {
        source: "/danh-sach/:slug/page/:pageNumber",
        destination: "/list/:slug/page/:pageNumber",
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
         unoptimized: true,

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
