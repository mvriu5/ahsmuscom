import { Section } from "@/components/section"
import { BlogItem } from "@/utils/types"
import { BlogCard } from "../cards/blog-card"

const blogs: BlogItem[] = [
    {
        title: "The Future of Web Development",
        description: "Exploring the latest trends in frontend frameworks and serverless architecture.",
        popoverImage: "/blog/web-dev-future.jpg",
        detailedDescription: "An in-depth look at how Next.js, React Server Components, and Edge computing are reshaping how we build the web.",
        href: "/blog/future-of-web-dev"
    },
]

export function BlogSection() {
    return (
        <Section title="03 Blog">
            <div className="flex flex-col gap-4">
                {blogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog}/>
                ))}
            </div>
        </Section>
    )
}
