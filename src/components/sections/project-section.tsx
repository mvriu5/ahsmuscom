import { Section } from "@/components/section"
import { ProjectItem } from "@/utils/types"
import { ProjectCard } from "../cards/project-card"
import { ProjectTooltip } from "../project-tooltip"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"

const projects: ProjectItem[] = [
    {
        title: "E-Commerce Platform",
        description: "A modern shopping experience built with Next.js and Stripe.",
        popoverImage: "https://www.structly.de/opengraph-image",
        detailedDescription: "Full-stack e-commerce solution featuring real-time inventory management, secure payments via Stripe, and a responsive UI designed with Tailwind CSS.",
        href: "https://www.structly.de",
        live: true
    },
    {
        title: "Portfolio Dashboard",
        description: "Analytics dashboard for tracking crypto and stock investments.",
        popoverImage: "/projects/dashboard.jpg",
        detailedDescription: "Interactive dashboard providing real-time data visualization using Recharts. Integrates with multiple financial APIs to track portfolio performance.",
        href: "https://example.com/dashboard",
        live: true
    },
    {
        title: "Creative Studio",
        description: "Digital agency website with immersive 3D animations.",
        popoverImage: "/projects/studio.jpg",
        detailedDescription: "Award-winning agency site featuring WebGL interactions powered by Three.js and React-Three-Fiber, delivering a unique user experience.",
        href: "https://example.com/studio",
        live: false
    }
]

export function ProjectSection() {
    return (
        <Section title="02 Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger delay={500} render={
                            <ProjectCard project={project}/>
                        }/>
                        <ProjectTooltip project={project}/>
                    </Tooltip>
                ))}
            </div>
        </Section>
    )
}
