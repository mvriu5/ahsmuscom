import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ProjectItem } from "@/utils/types"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HoverCardContent } from "./ui/hover-card"

export function ProjectHoverCard({ project }: { project: ProjectItem }) {
    return (
        <HoverCardContent
            className="p-0 w-[320px] overflow-hidden shadow-xl"
            side="bottom"
            sideOffset={12}
            align="end"
            onPointerEnter={undefined}
            onPointerLeave={undefined}
        >
            <div className="relative w-full aspect-video">
                <Image
                    src={project.popoverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4 space-y-2">
                <h4 className="font-bold text-base">{project.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {project.detailedDescription}
                </p>
                <div className="flex justify-end mt-3">
                    <Link
                        href={project.href}
                        target="_blank"
                        className="flex items-center gap-1 text-xs font-medium hover:underline group"
                    >
                        View Project
                        <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </HoverCardContent>
    )
}
