import { ProjectItem } from "@/utils/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export function ProjectCard({ project }: { project: ProjectItem }) {
    return (
        <Card className="hover:bg-gray-50 transition-colors">
            <CardContent className="flex items-center gap-2">
                <div className="rounded-md flex items-center justify-center size-16 bg-primary/10">
                    <HugeiconsIcon icon={project.icon} className="size-6 text-primary" />
                </div>
                <div className="flex flex-col">
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
