"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/utils/cn"
import { HugeiconsIcon } from "@hugeicons/react"
import { TextAlignLeft01Icon, TextAlignLeftIcon } from "@hugeicons/core-free-icons"

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

const throttle = (func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastExec = 0

    return () => {
        const elapsed = Date.now() - lastExec
        const execute = () => {
            func()
            lastExec = Date.now()
        }

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        if (elapsed > delay) {
            execute()
        } else {
            timeoutId = setTimeout(execute, delay - elapsed)
        }
    }
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeIds, setActiveIds] = useState<string[]>([])
    const tocListRef = useRef<HTMLUListElement>(null)
    const [barStyle, setBarStyle] = useState({ top: 0, height: 0, opacity: 0 })

    useEffect(() => {
        const elements = headings
            .map((heading) => {
                const id = heading.children[0].text.toLowerCase().replace(/\s+/g, "-")
                return document.getElementById(id)
            })
            .filter((el): el is HTMLElement => el !== null)

        if (elements.length === 0) return

        const handleScroll = () => {
            const newActiveIds = elements
                .filter((el) => {
                    const rect = el.getBoundingClientRect()
                    const viewportHeight = window.innerHeight
                    const topOffset = viewportHeight * 0.15
                    const bottomOffset = viewportHeight * 0.85
                    return rect.top < bottomOffset && rect.bottom > topOffset
                })
                .map((el) => el.id)

            setActiveIds(newActiveIds)
        }

        const throttledHandler = throttle(handleScroll, 100)

        window.addEventListener("scroll", throttledHandler)
        handleScroll() // Initial check

        return () => {
            window.removeEventListener("scroll", throttledHandler)
        }
    }, [headings])

    useEffect(() => {
        if (!tocListRef.current) return

        if (activeIds.length === 0) {
            setBarStyle((prev) => ({ ...prev, opacity: 0 }))
            return
        }

        const listItems = Array.from(tocListRef.current.querySelectorAll("li"))
        const activeElements = activeIds
            .map((id) => listItems.find((item) => item.id === `toc-${id}`))
            .filter((el): el is HTMLLIElement => el !== null && el !== undefined)

        if (activeElements.length === 0) {
            setBarStyle((prev) => ({ ...prev, opacity: 0 }))
            return
        }

        const sortedActiveElements = activeElements.sort((a, b) => a.offsetTop - b.offsetTop)
        const firstElement = sortedActiveElements[0]
        const lastElement = sortedActiveElements[sortedActiveElements.length - 1]

        const top = firstElement.offsetTop
        const bottom = lastElement.offsetTop + lastElement.offsetHeight
        const height = bottom - top

        setBarStyle({ top, height, opacity: 1 })
    }, [activeIds])

    return (
        <div className="sticky top-8 mt-2">
            <div className="flex items-center gap-2 mb-2">
                <HugeiconsIcon icon={TextAlignLeftIcon} size={14} strokeWidth={3} className="text-gray-600"/>
                <h3 className="font-semibold">Content</h3>
            </div>
            <ul ref={tocListRef} className="relative border-l border-neutral-200 dark:border-neutral-700">
                <div
                    className="absolute w-0.5 bg-foreground rounded-full transition-all duration-300 ease-in-out"
                    style={{ left: "-1.5px", ...barStyle }}
                />
                {headings.map((heading) => {
                    const id = heading.children[0].text.toLowerCase().replace(/\s+/g, "-")
                    const text = heading.children[0].text
                    return (
                        <li key={heading._key} id={`toc-${id}`}>
                            <a
                                href={`#${id}`}
                                className={cn(
                                    "block py-1 pl-4 text-xs text-muted-foreground hover:text-foreground transition-colors",
                                    activeIds.includes(id) && "text-foreground"
                                )}
                            >
                                {text}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
