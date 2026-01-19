import { HugeiconsIcon } from "@hugeicons/react"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import Image from "next/image"
import Link from "next/link"
import { Section } from "../section"

export function FooterSection() {
    return (
        <Section>
            <div className="w-full px-8 flex justify-between -mb-16">
                <p className="w-full flex items-center gap-1 text-sm">
                    <span>Made with</span>
                    <HugeiconsIcon icon={FavouriteIcon} size={16} className="fill-red-500 text-red-500/50 animate-live"/>
                    <span>in</span>
                    <Tooltip>
                        <TooltipTrigger>
                            <Image src={"/leipzig.png"} alt="Leipzig" width={16} height={16}/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="">Leipzig [ˈlaɪ̯pt͡sɪç]</p>
                        </TooltipContent>
                    </Tooltip>
                </p>
                <Link href={"/imprint"} className="py-8 text-sm text-end text-secondary-foreground/50 hover:text-foreground hover:underline">Imprint</Link>
            </div>
        </Section>
    )
}
