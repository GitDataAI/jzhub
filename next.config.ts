import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: "http://127.0.0.1:9000/api/v1/:path*",
                basePath: false,
            },
            {
                source: "/git/:path*",
                destination: "http://127.0.0.1:9000/git/:path*",
                basePath: false,
            },
        ];
    },
    output: "standalone",
};

export default nextConfig;
