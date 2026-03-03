"use client"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { File01Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useState } from "react"
import { useWebHaptics } from "web-haptics/react"

export function BlogCard({ blog }: { blog: { _id: string, title: string, description: string, href: string } }) {
    const [active, setActive] = useState(false)
    const { trigger } = useWebHaptics()

    return (
        <Card className="hover:bg-gray-50 shadow-sm transition-colors p-2 pr-4">
            <CardContent className="flex items-center gap-4 px-0">
                <div className="shrink-0 size-14 flex items-center justify-center bg-secondary/50 rounded-md ring ring-border shadow-sm">
                    <HugeiconsIcon icon={File01Icon} size={40} className="text-secondary-foreground/60"/>
                </div>
                <div className="min-w-0 w-full flex flex-col">
                    <CardTitle className="truncate">{blog.title}</CardTitle>
                    <CardDescription className="mt-0.5 truncate text-xs text-gray-600">
                        {blog.description}
                    </CardDescription>
                    <CardFooter className="mt-1 justify-end items-end px-0">
                        <Link
                            href={blog.href}
                            prefetch={active ? true : false}
                            onClick={() => trigger("medium")}
                            onMouseEnter={() => setActive(true)}
                            className="group flex items-center justify-end gap-1 text-xs text-gray-700 hover:text-blue-500 transition-all"
                        >
                            <HugeiconsIcon icon={LinkSquare02Icon} size={12} className="text-gray-500 group-hover:text-blue-500" />
                            Read Article
                        </Link>
                    </CardFooter>
                </div>
            </CardContent>
        </Card>
    )
}
