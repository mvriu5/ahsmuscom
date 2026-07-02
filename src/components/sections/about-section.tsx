"use client"

import Image from "next/image"
import Link from "next/link"
import { useWebHaptics } from "web-haptics/react"

export function AboutSection() {
    const { trigger } = useWebHaptics()

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("marius.ahsmus@gmail.com")
    }

    return (
        <div className="flex flex-col px-8 gap-8 font-neuton tracking-wide">
            <div className="flex items-center gap-2">
                <Image src="/icon.svg" alt="Marius Ahsmus Logo Icon" width={36} height={36} className="-ml-1.5 mt-1 saturate-0 brightness-500" />
                <div className="flex flex-col">
                    <h1 className="text-2xl text-white">Marius Ahsmus</h1>
                    <p className="text-lg text-gray-300 -mt-2">Software Engineer</p>
                </div>
            </div>

            <div className="flex flex-col">
                <Link
                    href={"https://github.com/mvriu5"}
                    rel="noopener noreferrer"
                    target={"_blank"}
                    onClick={() => trigger("medium")}
                    className="w-max active:scale-98 text-gray-300 tracking-wide hover:underline hover:text-white"
                >
                    <div className={"active:scale-98"}>Github</div>
                </Link>
                <Link
                    href={"https://x.com/mvriu5"}
                    rel="noopener noreferrer"
                    target={"_blank"}
                    onClick={() => trigger("medium")}
                    className="w-max active:scale-98 text-gray-300 tracking-wide hover:underline hover:text-white"
                >
                    X / Twitter
                </Link>

                <button
                    className={"w-max active:scale-98 text-gray-300 tracking-wide hover:underline hover:text-white cursor-pointer"}
                    onClick={() => {
                        trigger("success")
                        handleCopyEmail()
                    }}
                >
                    Mail
                </button>
            </div>
        </div>
    )
}
