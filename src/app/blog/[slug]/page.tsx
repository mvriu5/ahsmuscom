import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SanityDocument } from "next-sanity";
import { cache } from "react";
import { BackButton } from "@/components/back-button";
import { BlogCard } from "@/components/cards/blog-card";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { PostContent } from "@/components/post-content";
import { TableOfContents } from "@/components/table-of-contents";
import { AsciiArt } from "@/components/ui/ascii-art";
import { client } from "@/sanity/lib/client";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const RECENT_POSTS_QUERY = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]`;
const options = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
const getPost = cache(async (slug: string) =>
  client.fetch<SanityDocument>(POST_QUERY, { slug }, options),
);
const getRecentPosts = cache(async (slug: string) =>
  client.fetch<SanityDocument[]>(RECENT_POSTS_QUERY, { slug }, options),
);

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post" && defined(slug.current)]{ slug }`,
  );
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const ogImage = post.popoverImage
    ? urlFor(post.popoverImage)?.width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug.current}`,
    },
    keywords: Array.isArray(post.keywords)
      ? post.keywords.filter(
          (keyword: unknown): keyword is string => typeof keyword === "string",
        )
      : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/blog/${post.slug.current}`,
      images: ogImage ? [{ url: ogImage, alt: post.title }] : [],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, recentPosts] = await Promise.all([
    getPost(slug),
    getRecentPosts(slug),
  ]);

  if (!post) notFound();

  const postImageUrl = post.popoverImage
    ? urlFor(post.popoverImage)?.width(1920).height(1080).url()
    : null;
  const headings = post.detailedDescription.filter(
    (block: { style?: string }) =>
      ["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.style ?? ""),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: postImageUrl,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: {
      "@type": "Person",
      name: "Marius Ahsmus",
      url: "https://ahsmus.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Marius Ahsmus",
      logo: {
        "@type": "ImageObject",
        url: "https://ahsmus.com/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ahsmus.com/blog/${post.slug.current}`,
    },
  };

  return (
    <Container jsonLd={jsonLd}>
      <FadeIn>
        <div className="border-t border-dashed border-border">
          <div className="flex flex-col lg:gap-8 p-8">
            <BackButton />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <TableOfContents headings={headings} />
              </div>
              <div className="lg:col-span-3 flex flex-col">
                {postImageUrl && (
                  <div
                    className="w-full h-28 md:h-40 overflow-hidden rounded-md ring ring-border shadow-sm mb-8"
                    style={{
                      WebkitMaskImage:
                        "radial-gradient(140% 100% at 50% 50%, black 62%, transparent 100%)",
                      maskImage:
                        "radial-gradient(140% 100% at 50% 50%, black 62%, transparent 100%)",
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
                    <div className="flex flex-col gap-8">
                      {recentPosts.map((p) => (
                        <BlogCard
                          key={p._id}
                          blog={{
                            _id: p._id,
                            title: p.title,
                            description: p.description,
                            href: `/blog/${p.slug.current}`,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No other posts found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
}
