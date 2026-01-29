import Image from "next/image"
import Link from "next/link"
import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/lib/client"
import type {SanityImageSource} from "@sanity/image-url/lib/types/types"
import createImageUrlBuilder from "@sanity/image-url"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons"
import { PostContent } from "@/components/post-content"
import type { Metadata } from "next"
import { FadeIn } from "@/components/fade-in"
import { TableOfContents } from "@/components/table-of-contents"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`
const RECENT_POSTS_QUERY = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? createImageUrlBuilder({ projectId, dataset }).image(source)
        : null

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const post = await client.fetch<SanityDocument>(POST_QUERY, await params)

    if (!post) {
        return {
            title: "Post not found",
        }
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.publishedAt,
            url: `/blog/${post.slug.current}`,
            images: [
                {
                    url: '',
                    alt: post.title,
                },
            ],
        },
    }
}


const options = { next: { revalidate: 30 } }

export default async function Blog({params}: { params: Promise<{ slug: string }> }) {
    const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options)
    const recentPosts = await client.fetch<SanityDocument[]>(RECENT_POSTS_QUERY, await params, options)
    const postImageUrl = post.popoverImage
        ? urlFor(post.popoverImage)?.width(1920).height(1080).url()
        : null

    const headings = post.detailedDescription.filter((block: any) =>
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(block.style)
    )

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
                url: 'https://ahsmus.com/logo.png',
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
                            <Link href="/">
                                <Button variant="ghost" size={"xs"} className={"text-gray-500"}>
                                    <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2.5} className="text-gray-500 mt-0.5"/>
                                    Back
                                </Button>
                            </Link>


                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                                <div className="lg:col-span-1">
                                    <TableOfContents headings={headings} />
                                </div>
                                <div className="lg:col-span-3 flex flex-col">
                                    {postImageUrl && (
                                        <div className="w-full h-52 overflow-hidden rounded-md ring-2 ring-border shadow-md mb-8">
                                            <Image
                                                src={postImageUrl}
                                                alt={post.title}
                                                width={1080}
                                                height={330}
                                            />
                                        </div>
                                    )}
                                    <p className="text-xs text-muted-foreground font-mono">
                                        Published: {new Date(post.publishedAt).toLocaleDateString()}
                                    </p>
                                    <h1 className="text-5xl font-neuton">{post.title}</h1>
                                    <PostContent body={post.detailedDescription} />
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </main>
        </div>
    )
}
