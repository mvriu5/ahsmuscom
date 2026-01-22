import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HoverCardContent } from "./ui/hover-card"
import type { Project } from "@/sanity/lib/queries"
import { PortableText } from "@portabletext/react"

export function ProjectHoverCard({ project }: { project: Project & { href: string } }) {
    return (
        <HoverCardContent
            className="p-0 w-[320px] overflow-hidden shadow-xl"
            side="bottom"
            sideOffset={12}
            align="end"
        >
            <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center p-4">
                <PortableText value={project.popoverContent} />
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
