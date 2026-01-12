import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [new URL("https://www.structly.de/*")]
    }
}

export default nextConfig
