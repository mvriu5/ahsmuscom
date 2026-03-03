import { Section } from "@/components/section"
import { client } from "@/sanity/lib/client"
import { projectsQuery, type Project } from "@/sanity/lib/queries"
import { ProjectCard } from "../cards/project-card"

export async function ProjectSection() {
    const projects: Project[] = await client.fetch(projectsQuery)

    return (
        <Section title="02 Projects" link="/projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </Section>
    )
}
