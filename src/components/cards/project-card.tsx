import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { cn } from "@/utils/cn"
import { ProjectItem } from "@/utils/types"
import { LinkSquare02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import Link from "next/link"

export function ProjectCard({ project }: { project: ProjectItem }) {
    return (
        <Card className="h-36 flex flex-col justify-between hover:bg-gray-50 transition-colors shadow-sm p-4">
            <CardContent className="h-full flex items-center gap-2 px-0">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                        <div
                            className={cn(
                                "rounded-full size-2 outline-2 animate-live",
                                project.live ? "bg-green-500 outline-green-500/40" : "bg-red-500 outline-red-500/40"
                            )}
                        />
                        <p className={cn("text-xs font-mono", project.live ? "text-green-600" : "text-red-600")}>{project.live ? "Online" : "Dead"}</p>
                    </div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        {project.description}
                    </CardDescription>
                </div>
            </CardContent>
            <CardFooter className="justify-end items-end h-full px-0">
                <Link href={project.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 text-xs text-gray-700 hover:text-blue-500 transition-all">
                    <HugeiconsIcon icon={LinkSquare02Icon} size={12} className="text-gray-500 group-hover:text-blue-500"/>
                    View Project
                </Link>
            </CardFooter>
        </Card>
    )
}
