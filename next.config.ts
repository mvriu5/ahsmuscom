import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            new URL("https://www.structly.de/*"),
            { protocol: 'https', hostname: 'cdn.sanity.io' },
        ]
    }
}

export default nextConfig
