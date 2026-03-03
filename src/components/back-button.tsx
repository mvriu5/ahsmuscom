"use client"

import Link from "next/link"
import { useWebHaptics } from "web-haptics/react"
import { Button } from "./ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons"

export function BackButton() {
    const { trigger } = useWebHaptics()

    return (
        <Link href="/" onClick={() => trigger("medium")}>
            <Button variant="ghost" size="xs" className={"text-gray-500"}>
                <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2.5} className="text-gray-500 mt-0.5"/>
                Back
            </Button>
        </Link>
    )
}
