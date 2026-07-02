import { type MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://ahsmus.com"

    const routes = ["/", "/legal-notice"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }))

    return routes
}
