import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { File01Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export function BlogCard({ blog }: { blog: { _id: string, title: string, description: string, href: string } }) {
    return (
        <Card className="hover:bg-gray-50 transition-colors p-2 pr-4">
            <CardContent className="flex items-center gap-2 px-0">
                <div className="size-16 flex items-center justify-center bg-secondary/50 rounded-md ring ring-border shadow-sm">
                    <HugeiconsIcon icon={File01Icon} size={40} className="text-secondary-foreground/60"/>
                </div>
                <div className="w-full flex flex-col">
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription className="text-xs text-gray-600">
                        {blog.description}
                    </CardDescription>
                    <Link href={blog.href} className="group w-full flex items-center justify-end gap-1 text-xs text-gray-700 hover:text-blue-500 transition-all">
                        <HugeiconsIcon icon={LinkSquare02Icon} size={12} className="text-gray-500 group-hover:text-blue-500"/>
                        Read Article
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
