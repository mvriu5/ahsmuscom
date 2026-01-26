import type { Project } from "@/sanity/lib/queries"
import { HoverCardContent } from "../ui/hover-card"

export function ProjectHoverCard({ project }: { project: Project }) {
    return (
        <HoverCardContent
            className="p-4 w-[320px] overflow-hidden shadow-xl space-y-2"
            side="bottom"
            sideOffset={12}
            align="end"
        >
            <h4 className="font-bold text-base">{project.title}</h4>
            <p className="text-sm text-white/75">
                {project.detailedDescription}
            </p>
        </HoverCardContent>
    )
}
