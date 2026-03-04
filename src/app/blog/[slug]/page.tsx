import { BackButton } from "@/components/back-button"
import { BlogCard } from "@/components/cards/blog-card"
import { FadeIn } from "@/components/fade-in"
import { PostContent } from "@/components/post-content"
import { TableOfContents } from "@/components/table-of-contents"
import { AsciiArt } from "@/components/ui/ascii-art"
import { client } from "@/sanity/lib/client"
import createImageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { Metadata } from "next"
import { type SanityDocument } from "next-sanity"
import { notFound } from "next/navigation"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`
const RECENT_POSTS_QUERY = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? createImageUrlBuilder({ projectId, dataset }).image(source)
        : null

export async function generateStaticParams() {
	const posts = await client.fetch<{ slug: { current: string } }[]>(`*[_type == "post" && defined(slug.current)]{ slug }`)
	return posts.map(post => ({	slug: post.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
	const post = await client.fetch<SanityDocument>(POST_QUERY, { slug })

	if (!post) {
		return {
			title: "Post not found",
		}
	}

	const ogImage = post.popoverImage
		? urlFor(post.popoverImage)?.width(1200).height(630).url()
		: undefined

	return {
		title: post.title,
		description: post.description,
		alternates: {
			canonical: `/blog/${post.slug.current}`,
		},
		keywords: Array.isArray(post.keywords)
			? post.keywords.filter((keyword: unknown): keyword is string => typeof keyword === "string")
			: undefined,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.publishedAt,
			url: `/blog/${post.slug.current}`,
			images: ogImage ? [{ url: ogImage, alt: post.title }] : []
		}
	}
}

const options = { next: { revalidate: 30 } }

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
	const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options)
	if (!post) notFound()

	const recentPosts = await client.fetch<SanityDocument[]>(RECENT_POSTS_QUERY, { slug }, options)
    const postImageUrl = post.popoverImage ? urlFor(post.popoverImage)?.width(1920).height(1080).url() : null
    const headings = post.detailedDescription.filter((block: any) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(block.style))

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        image: postImageUrl,
        datePublished: post.publishedAt,
        dateModified: post._updatedAt,
        author: {
            '@type': 'Person',
            name: 'Marius Ahsmus',
            url: 'https://ahsmus.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Marius Ahsmus',
            logo: {
                '@type': 'ImageObject',
                url: 'https://ahsmus.com/icon.svg',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://ahsmus.com/blog/${post.slug.current}`,
        },
    }

    return (
        <div className="relative min-h-screen max-w-screen font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />

            <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] md:pl-[16%] lg:pl-[20%] w-px border-r border-dashed border-border pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] md:pr-[16%] lg:pr-[20%] w-px border-l border-dashed border-border pointer-events-none" />

            <main className="py-16 px-4 sm:px-[10%] md:px-[16%] lg:px-[20%]">
                <FadeIn>
                    <div className="border-t border-dashed border-border">

                        <div className="flex flex-col gap-8 p-8">
                            <BackButton/>
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                                <div className="lg:col-span-1">
                                    <TableOfContents headings={headings} />
                                </div>
                                <div className="lg:col-span-3 flex flex-col">
                                    {postImageUrl && (
                                        <div
                                            className="w-full h-40 overflow-hidden rounded-md ring ring-border shadow-sm mb-8"
                                            style={{
                                                WebkitMaskImage: "radial-gradient(140% 100% at 50% 50%, black 62%, transparent 100%)",
                                                maskImage: "radial-gradient(140% 100% at 50% 50%, black 62%, transparent 100%)",
                                            }}
                                        >
                                            <AsciiArt
                                                src={postImageUrl}
                                                resolution={180}
                                                charset="standard"
                                                animationStyle="typewriter"
                                                animated={false}
                                                color="#2b7fff"
                                                backgroundColor="var(--background)"
                                                className="w-full h-full"
                                            />
                                        </div>
                                    )}
                                    <p className="text-xs text-muted-foreground font-mono">
                                        Published: {new Date(post.publishedAt).toLocaleDateString()}
                                    </p>
                                    <h1 className="text-5xl font-neuton">{post.title}</h1>
                                    <PostContent body={post.detailedDescription} />

                                    <div className="mt-16 border-t border-dashed border-border pt-8">
                                        <h2 className="text-3xl font-neuton mb-4">Newest posts</h2>
                                        {recentPosts && recentPosts.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                {recentPosts.map((p) => (
                                                    <BlogCard key={p._id} blog={{
                                                        _id: p._id,
                                                        title: p.title,
                                                        description: p.description,
                                                        href: `/blog/${p.slug.current}`
                                                    }} />
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">No other posts found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </main>
        </div>
    )
}
