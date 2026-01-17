import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { BlogItem } from "@/utils/types"
import { File01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import Link from "next/link"

export function BlogCard({ blog }: { blog: BlogItem }) {
    return (
        <Card className="hover:bg-gray-50 transition-colors">
            <CardContent className="flex items-center gap-2">
                <div className="size-16 flex items-center justify-center bg-secondary/50 rounded-lg border border-border">
                    <HugeiconsIcon icon={File01Icon} size={48} className="text-secondary-foreground/50"/>
                </div>
                <div className="w-full flex flex-col">
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        {blog.description}
                    </CardDescription>
                    <Link href={blog.href} className="text-end text-xs underline hover:text-primary hover:underline transition-all">
                        Read Article
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
