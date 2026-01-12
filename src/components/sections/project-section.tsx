import { Section } from "@/components/section"
import { ProjectItem } from "@/utils/types"
import { Globe02Icon, LaptopProgrammingIcon, PaintBoardIcon } from "@hugeicons/core-free-icons"
import { ProjectCard } from "../cards/project-card"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { ProjectTooltip } from "../project-tooltip"

const projects: ProjectItem[] = [
    {
        title: "E-Commerce Platform",
        description: "A modern shopping experience built with Next.js and Stripe.",
        icon: Globe02Icon,
        popoverImage: "https://www.structly.de/opengraph-image",
        detailedDescription: "Full-stack e-commerce solution featuring real-time inventory management, secure payments via Stripe, and a responsive UI designed with Tailwind CSS.",
        href: "https://www.structly.de"
    },
    {
        title: "Portfolio Dashboard",
        description: "Analytics dashboard for tracking crypto and stock investments.",
        icon: LaptopProgrammingIcon,
        popoverImage: "/projects/dashboard.jpg",
        detailedDescription: "Interactive dashboard providing real-time data visualization using Recharts. Integrates with multiple financial APIs to track portfolio performance.",
        href: "https://example.com/dashboard"
    },
    {
        title: "Creative Studio",
        description: "Digital agency website with immersive 3D animations.",
        icon: PaintBoardIcon,
        popoverImage: "/projects/studio.jpg",
        detailedDescription: "Award-winning agency site featuring WebGL interactions powered by Three.js and React-Three-Fiber, delivering a unique user experience.",
        href: "https://example.com/studio"
    }
]

export function ProjectSection() {
    return (
        <Section title="02 Projects">
            <div className="flex flex-col gap-4">
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
