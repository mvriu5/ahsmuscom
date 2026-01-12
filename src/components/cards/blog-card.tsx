import { BlogItem } from "@/utils/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export function BlogCard({ blog }: { blog: BlogItem }) {
    return (
        <Card className="hover:bg-gray-50 transition-colors">
            <CardContent className="flex items-center gap-2">
                <div className="rounded-md flex items-center justify-center size-16 bg-primary/10">
                    <HugeiconsIcon icon={blog.icon} className="size-6 text-primary" />
                </div>
                <div className="flex flex-col">
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        {blog.description}
                    </CardDescription>
                </div>
            </CardContent>
            <CardFooter className="justify-end">
                <Link href={blog.href} className="text-xs underline hover:text-primary hover:underline transition-all">
                    Read Article
                </Link>
            </CardFooter>
        </Card>
    )
}
