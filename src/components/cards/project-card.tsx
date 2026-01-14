import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { ProjectItem } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"

export function ProjectCard({ project }: { project: ProjectItem }) {
    return (
        <Card className=" hover:bg-gray-50 transition-colors h-28">
            <CardContent className="flex items-center gap-2">
                <Image src={project.image} alt={project.title} width={152} height={152} className="-mt-12 -ml-4"/>
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
