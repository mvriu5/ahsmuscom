import type { NextConfig } from "next"
import { withPlausibleProxy } from "next-plausible"

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            new URL("https://www.structly.de/*"),
            { protocol: 'https', hostname: 'cdn.sanity.io' },
        ]
    }
}

export default withPlausibleProxy({
    src: "https://analytics.ahsmus.com/js/script.js",
})(nextConfig)
