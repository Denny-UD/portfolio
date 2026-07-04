import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export is not needed — Vercel handles this automatically
  // All pages are statically generated at build time

  images: {
    // No external images used — all icons are from Lucide
    // If adding external images, add domains here
  },

  // Enable React strict mode for development
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;