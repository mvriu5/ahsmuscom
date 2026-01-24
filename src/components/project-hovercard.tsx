import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HoverCardContent } from "./ui/hover-card"
import type { Project } from "@/sanity/lib/queries"

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
            <div className="flex justify-end pt-2">
                <Link
                    href={project.link ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium hover:underline group"
                >
                    View Project
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </HoverCardContent>
    )
}
