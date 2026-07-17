import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
// Replace 'your-repo-name' with your exact GitHub repository name
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
};

export default nextConfig;
