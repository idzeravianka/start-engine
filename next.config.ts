import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        viewTransition: true,
    },
    allowedDevOrigins: ['192.168.0.33'],
};

export default nextConfig;
