import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons"
import { BlogCard } from "@/components/cards/blog-card"
import { FadeIn } from "@/components/fade-in"
import { Post } from "@/sanity/lib/queries"
import type { Metadata } from "next"
import { BackButton } from "@/components/back-button"

export const metadata: Metadata = {
    title: "Blog Posts",
    description: "Technical blog posts by Marius Ahsmus about software engineering, projects, and practical development insights.",
    alternates: {
        canonical: "/blog",
    },
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, description, popoverImage, detailedDescription, publishedAt}`

const options = { next: { revalidate: 30 } }

export default async function IndexPage() {
    const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Blog Posts",
        description: "Technical blog posts by Marius Ahsmus about software engineering, projects, and practical development insights.",
        url: "https://ahsmus.com/blog",
        mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://ahsmus.com/blog/${post.slug.current}`,
                name: post.title,
            })),
        },
    }

    return (
        <div className="relative min-h-screen max-w-screen font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] xl:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] xl:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />

            <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] md:pl-[16%] lg:pl-[20%] xl:pl-[25%] w-px border-r border-dashed border-border pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] md:pr-[16%] lg:pr-[20%] xl:pr-[25%] w-px border-l border-dashed border-border pointer-events-none" />

            <main className="py-16 px-4 sm:px-[10%] md:px-[16%] lg:px-[20%] xl:px-[25%]">
                <FadeIn>
                    <div className="border-t border-dashed border-border">

                        <div className="flex flex-col gap-16 p-8">
                            <BackButton/>
                            <h1 className="font-neuton text-4xl">Blog Posts</h1>
                            <ul className="flex flex-col gap-y-4 -mt-8">
                                {posts.map((post) => {
                                    const blog = {
                                        ...post,
                                        href: `/blog/${post.slug.current}`
                                    }

                                    return (
                                        <BlogCard key={post._id} blog={blog} />
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </FadeIn>
            </main>
        </div>
    )
}
