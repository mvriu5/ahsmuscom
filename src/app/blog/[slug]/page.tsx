import Image from "next/image"
import Link from "next/link"
import { PortableText, type SanityDocument } from "next-sanity"
import { client } from "@/sanity/lib/client"
import type {SanityImageSource} from "@sanity/image-url/lib/types/types"
import createImageUrlBuilder from "@sanity/image-url"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? createImageUrlBuilder({ projectId, dataset }).image(source)
        : null

const options = { next: { revalidate: 30 } }

export default async function Blog({params}: { params: Promise<{ slug: string }> }) {
    const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options)
    const postImageUrl = post.image
        ? urlFor(post.image)?.width(550).height(310).url()
        : null

    return (
        <div className="relative min-h-screen max-w-screen font-sans">
            <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-[10%] lg:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-[10%] lg:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />

            <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] lg:pl-[25%] w-px border-r border-dashed border-border pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] lg:pr-[25%] w-px border-l border-dashed border-border pointer-events-none" />

            <main className="py-16 px-4 sm:px-[10%] lg:px-[25%]">

                <div className="border-t border-dashed border-border">

                    <div className="flex flex-col gap-16 p-8">
                        <Link href="/">
                            <Button variant="ghost" className={"text-gray-500"}>
                                <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2.5} className="text-gray-500 mt-0.5"/>
                                Back
                            </Button>
                        </Link>

                        {postImageUrl && (
                            <Image
                                src={postImageUrl}
                                alt={post.title}
                                className="aspect-video rounded-xl"
                                width="550"
                                height="310"
                            />
                        )}
                        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
                        <div className="prose">
                            <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
                            {Array.isArray(post.body) && <PortableText value={post.body} />}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
