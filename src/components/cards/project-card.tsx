import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { cn } from "@/utils/cn"
import { ProjectItem } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"

export function ProjectCard({ project }: { project: ProjectItem }) {
    return (
        <Card className=" hover:bg-gray-50 transition-colors shadow-sm">
            <CardContent className="flex items-center gap-2">
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
            <CardFooter className="justify-end">
                <Link href={project.href} target="_blank" rel="noopener noreferrer" className="text-xs underline hover:text-primary hover:underline transition-all">
                    View Project
                </Link>
            </CardFooter>
        </Card>
    )
}
