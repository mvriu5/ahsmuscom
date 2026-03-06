"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Section } from "../section"
import { useWebHaptics } from "web-haptics/react"

const Penflow = dynamic(() => import("penflow/react").then((mod) => mod.Penflow), { ssr: false })

export function FooterSection() {
    const { trigger } = useWebHaptics()

    return (
        <Section>
            <div className="w-full p-8 flex items-center justify-between -mb-16">
                <div className="flex flex-col gap-2">
                    <p className="w-full flex items-center gap-1 text-sm">
                        <span className="font-mono tracking-tighter text-xs">made with</span>
                        <HugeiconsIcon icon={FavouriteIcon} size={16} className="fill-red-500 text-red-500/50 animate-live"/>
                        <span className="font-mono tracking-tighter text-xs">in</span>
                        <Tooltip>
                            <TooltipTrigger>
                                <Image src={"/leipzig.png"} alt="Leipzig" width={12} height={12} className="ml-1"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Leipzig [ˈlaɪ̯pt͡sɪç]</p>
                            </TooltipContent>
                        </Tooltip>
                    </p>
                    <Penflow
                        text="M. Ahsmus"
                        quality="balanced"
                        fontUrl={"/BrittanySignature.ttf"}
                        size={12}
                        speed={0.05}
                        className="-mt-0.5"
                        seed="demo"
                    />
                </div>

                <Link
                    href={"/legal-notice"}
                    onClick={() => trigger("medium")}
                    className="self-start text-sm text-nowrap text-secondary-foreground/50 hover:text-foreground hover:underline">
                    Legal Notice
                </Link>
            </div>
        </Section>
    )
}
