import { type MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import type { SanityDocument } from 'next-sanity'

const POSTS_QUERY = `*[_type == "post"]{ "slug": slug.current, _updatedAt }`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ahsmus.com'

    const staticRoutes = [
        '/',
        '/blog',
        '/imprint',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }))

    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY)
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
    }))

    return [...staticRoutes, ...postRoutes]
}
