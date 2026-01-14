import { Section } from "@/components/section"
import { BlogItem } from "@/utils/types"
import { BlogCard } from "../cards/blog-card"
import { ProjectTooltip } from "../project-tooltip"; // We can reuse ProjectTooltip as BlogItem is alias of ProjectItem
import { Tooltip, TooltipTrigger } from "../ui/tooltip"

const blogs: BlogItem[] = [
    {
        title: "The Future of Web Development",
        description: "Exploring the latest trends in frontend frameworks and serverless architecture.",
        image: "",
        popoverImage: "/blog/web-dev-future.jpg",
        detailedDescription: "An in-depth look at how Next.js, React Server Components, and Edge computing are reshaping how we build the web.",
        href: "/blog/future-of-web-dev"
    }
]

export function BlogSection() {
    return (
        <Section title="03 Blog">
            <div className="flex flex-col gap-4">
                {blogs.map((blog, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger delay={500} render={
                            <BlogCard blog={blog}/>
                        }/>
                        <ProjectTooltip project={blog}/>
                    </Tooltip>
                ))}
            </div>
        </Section>
    )
}
