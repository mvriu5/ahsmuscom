import { Section } from "@/components/section";
import { BlogCard } from "../cards/blog-card";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/sanity/lib/queries";
import { postsQuery } from "@/sanity/lib/queries";


export async function BlogSection() {
    const blogs: Post[] = await client.fetch(postsQuery);

    const blogsWithImageUrl = blogs.map(blog => ({
        ...blog,
        href: `/blog/${blog.slug.current}`,
        popoverImage: blog.popoverImage ? urlFor(blog.popoverImage).url() : undefined
    }));

    return (
        <Section title="03 Blog">
            <div className="flex flex-col gap-4">
                {blogsWithImageUrl.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </Section>
    );
}
