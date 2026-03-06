import type { Metadata } from "next";
import { BackButton } from "@/components/back-button";
import { BlogCard } from "@/components/cards/blog-card";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { client } from "@/sanity/lib/client";
import type { Post } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog Posts",
  description:
    "Technical blog posts by Marius Ahsmus about software engineering, projects, and practical development insights.",
  alternates: {
    canonical: "/blog",
  },
};

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, description, popoverImage, detailedDescription, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Posts",
    description:
      "Technical blog posts by Marius Ahsmus about software engineering, projects, and practical development insights.",
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
  };

  return (
    <Container jsonLd={jsonLd}>
      <FadeIn>
        <div className="border-t border-dashed border-border">
          <div className="flex flex-col gap-8 p-8">
            <BackButton />
            <h1 className="font-neuton text-4xl mb-8">Blog Posts</h1>
            <ul className="flex flex-col gap-y-4 -mt-8">
              {posts.map((post) => {
                const blog = {
                  ...post,
                  href: `/blog/${post.slug.current}`,
                };

                return <BlogCard key={post._id} blog={blog} />;
              })}
            </ul>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
}
