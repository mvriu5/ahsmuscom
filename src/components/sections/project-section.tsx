import { Section } from "@/components/section"
import { client } from "@/sanity/lib/client"
import { projectsQuery, type Project } from "@/sanity/lib/queries"
import { ProjectCard } from "../cards/project-card"
import { ProjectHoverCard } from "../project-hovercard"
import { HoverCard, HoverCardTrigger } from "../ui/hover-card"

export async function ProjectSection() {
    const projects: Project[] = await client.fetch(projectsQuery)

    const projectsWithHref = projects.map((project) => ({
        ...project,
        href: `/project/${project.slug.current}`,
    }))

    return (
        <Section title="02 Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectsWithHref.map((project) => (
                    <HoverCard key={project._id} followCursor>
                        <HoverCardTrigger render={
                            <ProjectCard project={project} />
                        }/>
                        <ProjectHoverCard project={project} />
                    </HoverCard>
                ))}
            </div>
        </Section>
    )
}
