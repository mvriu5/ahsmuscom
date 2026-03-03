"use client"

import { LinkSquare02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { ReactNode } from "react"
import { useWebHaptics } from "web-haptics/react"

interface SectionProps {
    children: ReactNode
    title?: string
    link?: string
}

export function Section({ title, link, children }: SectionProps) {
    const { trigger } = useWebHaptics()

    return (
        <div className="w-full flex flex-col gap-4 border-t border-dashed border-border">
            <div className="px-8 w-full flex items-center gap-2 justify-between border-b border-dashed border-border">
                {title &&
                    <h2 className="text-4xl text-foreground/85 font-neuton p-2">{title}</h2>
                }
                {link &&
                    <Link
                        href={link}
                        onClick={() => trigger("medium")}
                        className="group flex items-center gap-1 text-xs text-gray-700 hover:text-blue-500 transition-all"
                    >
                        <HugeiconsIcon icon={LinkSquare02Icon} size={12} className="text-gray-500 group-hover:text-blue-500"/>
                        See all
                    </Link>
                }
            </div>
            <div className="px-8">
                {children}
            </div>
        </div>
    )
}
