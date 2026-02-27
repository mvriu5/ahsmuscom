import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons"
import { ProjectCard } from "@/components/cards/project-card"
import { Project } from "@/sanity/lib/queries"
import { FadeIn } from "@/components/fade-in"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Projects",
    description: "Selected software projects by Marius Ahsmus, including architecture decisions, implementation details, and live demos.",
    alternates: {
        canonical: "/projects",
    },
}

const PROJECTS_QUERY = `*[_type == "project"]{
    _id,
    title,
    link,
    description,
    detailedDescription,
    live,
    popoverContent
}`

const options = { next: { revalidate: 30 } }

export default async function ProjectsPage() {
    const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Projects",
        description: "Selected software projects by Marius Ahsmus, including architecture decisions, implementation details, and live demos.",
        url: "https://ahsmus.com/projects",
        mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: project.link,
                name: project.title,
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
                            <Link href="/">
                                <Button variant="ghost" size="xs" className={"text-gray-500"}>
                                    <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2.5} className="text-gray-500 mt-0.5"/>
                                    Back
                                </Button>
                            </Link>

                            <h1 className="font-neuton text-4xl">Projects</h1>
                            <ul className="flex flex-col gap-y-4 -mt-8">
                                {projects.map((project) => (
                                    <ProjectCard key={project._id} project={project} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </FadeIn>
            </main>
        </div>
    )
}
