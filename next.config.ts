import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [
      {
        // The application form now lives on the Community page. Keeps old
        // links and bookmarks working. Temporary (307) so it is easy to change.
        source: "/join",
        destination: "/community#join",
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

// MDX files under src/content are imported by the /updates routes rather than
// used as pages, so `pageExtensions` is left at its default.
const withMDX = createMDX({});

export default withMDX(nextConfig);
