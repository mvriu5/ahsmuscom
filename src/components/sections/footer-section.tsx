"use client"

import Link from "next/link"
import { useWebHaptics } from "web-haptics/react"

export function FooterSection() {
    const { trigger } = useWebHaptics()

    return (
        <Link
            href={"/legal-notice"}
            onClick={() => trigger("medium")}
            className="w-max font-neuton tracking-wide text-gray-400 hover:text-white hover:underline active:scale-98 mx-8"
        >
            Legal Notice
        </Link>
    )
}
