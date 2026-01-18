import { AboutSection } from "@/components/sections/about-section"
import { BlogSection } from "@/components/sections/blog-section"
import { HeatmapSection } from "@/components/sections/heatmap-section"
import { MapSection } from "@/components/sections/map-section"
import { ProjectSection } from "@/components/sections/project-section"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import Link from "next/link"

export default async function IndexPage() {

    return (
        <div className="relative min-h-screen w-full font-sans">
            {/* Vertical Lines */}
            <div className="absolute top-0 bottom-0 left-4 sm:left-148 w-px border-r border-dashed border-gray-400 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-4 sm:right-148 w-px border-l border-dashed border-gray-400 pointer-events-none" />

            {/* Horizontal Lines */}
            <div className="absolute left-0 right-0 top-16 h-px border-b border-dashed border-gray-400 pointer-events-none" />
            <div className="absolute left-0 right-0 bottom-16 h-px border-t border-dashed border-gray-400 pointer-events-none" />

            {/* Content */}
            <main className="py-16 px-4 sm:px-148 flex flex-col gap-16">
                <AboutSection />
                <ProjectSection />
                <BlogSection />
                <HeatmapSection />
                <MapSection />
            </main>
            <div className="w-full px-8 sm:px-156 flex justify-between">
                <p className="flex items-center gap-1 text-sm py-8">
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
        </div>
    )
}
