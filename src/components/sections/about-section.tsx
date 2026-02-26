"use client"

import { Calendar01Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { Section } from "../section"
import { GitHub, Instagram, XformerlyTwitter } from "../svg-icons"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function AboutSection() {
    const handleCopyEmail = () => {
        navigator.clipboard.writeText("marius.ahsmus@gmail.com")
        toast.success("Email copied to clipboard", { position: "top-center" })
    }

    return (
        <Section title="01 About">
            <div className="flex gap-4">
                <div className="shrink-0 size-22 rounded-xl outline outline-gray-300 border-3 border-gray-200 overflow-hidden">
                    <Image
                        src="/icon.svg"
                        alt="Marius Ahsmus Logo Icon"
                        width={300}
                        height={300}
                        className="w-full h-full p-2 -ml-1"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-neuton">Marius Ahsmus</h1>
                    <p className="text-sm text-secondary-foreground/75 font-semibold">Software Engineer</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Link href={"https://github.com/mvriu5"} rel="noopener noreferrer" target={"_blank"}>
                            <Button size={"xs"} variant={"outline"}>
                                <GitHub/>
                                Github
                            </Button>
                        </Link>
                        <Link href={"https://x.com/mvriu5"} rel="noopener noreferrer" target={"_blank"}>
                            <Button size={"xs"} variant={"outline"}>
                                <XformerlyTwitter/>
                                X / Twitter
                            </Button>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger render={
                                <Button size={"xs"} variant={"outline"} onClick={handleCopyEmail}>
                                    <HugeiconsIcon icon={Mail01Icon} strokeWidth={2.5}/>
                                    Mail
                                </Button>
                            }/>
                            <TooltipContent>
                                Click to copy email to clipboard
                            </TooltipContent>
                        </Tooltip>
                        <Link href={"https://cal.com/mvriu5/15min"} rel="noopener noreferrer" target={"_blank"}>
                            <Button
                                size="xs"
                                variant="outline"
                                className="bg-blue-100 border-blue-300 text-blue-500 hover:text-blue-500 hover:bg-blue-200"
                            >
                                <HugeiconsIcon icon={Calendar01Icon} />
                                Book a call
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    )
}
