import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { BlogItem } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"

export function BlogCard({ blog }: { blog: BlogItem }) {
    return (
        <Card className="hover:bg-gray-50 transition-colors">
            <CardContent className="flex items-center gap-2">
                <Image src={blog.image} alt={blog.title} width={152} height={152}/>
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
