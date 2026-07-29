import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === "development",
});

const isProd = process.env.NODE_ENV === 'production';

const repoName = 'start-engine';

const nextConfig: NextConfig = {
    output: 'export',
    basePath: isProd ? `/${repoName}` : '',
    images: {
        unoptimized: true,
    },
    experimental: {
        viewTransition: true,
    },
    allowedDevOrigins: ['192.168.0.33'],
    turbopack: {},
};

export default withPWA(nextConfig);
