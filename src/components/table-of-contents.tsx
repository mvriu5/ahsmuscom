"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/utils/cn"

interface TocEntry {
    _key: string
    _type: "block"
    style: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    children: {
        _key: string
        _type: "span"
        text: string
    }[]
}

interface TableOfContentsProps {
    headings: TocEntry[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id)
                    return
                }
            }
        }

        const observer = new IntersectionObserver(handleObserver, {
            rootMargin: "-20% 0px -79% 0px",
        })

        const elements = headings.map((heading) => {
            const id = heading.children[0].text.toLowerCase().replace(/\s+/g, "-")
            return document.getElementById(id)
        }).filter((el): el is HTMLElement => el !== null)

        elements.forEach((el) => observer.observe(el))

        return () => {
            elements.forEach((el) => observer.unobserve(el))
        }
    }, [headings])

    return (
        <div className="sticky top-8 mt-2">
            <h3 className="font-semibold mb-4">Content</h3>
            <ul className="space-y-2">
                {headings.map((heading) => {
                    const id = heading.children[0].text.toLowerCase().replace(/\s+/g, "-")
                    const text = heading.children[0].text
                    return (
                        <li key={heading._key}>
                            <a
                                href={`#${id}`}
                                className={cn(
                                    "text-xs text-muted-foreground hover:text-foreground transition-colors",
                                    activeId === id && "text-foreground"
                                )}
                            >
                                <div className={cn("pl-1", activeId === id && "border-l-2 border-foreground")}>
                                    {text}
                                </div>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
