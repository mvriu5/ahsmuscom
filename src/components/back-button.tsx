"use client"

import Link from "next/link"
import { useWebHaptics } from "web-haptics/react"

export function BackButton() {
    const { trigger } = useWebHaptics()

    return (
        <Link href="/" onClick={() => trigger("medium")} className="w-max active:scale-98 text-gray-400 hover:underline hover:text-white">
            Back
        </Link>
    )
}
