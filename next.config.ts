import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === "production" && {
      properties: ["^data-test", "^data-cy"],
    },
  },
};

export default nextConfig;
