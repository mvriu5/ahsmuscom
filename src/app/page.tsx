import { AboutSection } from "@/components/sections/about-section"
import { ProjectSection } from "@/components/sections/project-section"
import { BlogSection } from "@/components/sections/blog-section"
import { HeatmapSection } from "@/components/sections/heatmap-section"
import Link from "next/link"

export default async function IndexPage() {

    return (
        <div className="relative min-h-screen w-full font-sans">
            {/* Vertical Lines */}
            <div className="absolute top-0 bottom-0 left-124 w-px border-r border-dashed border-primary/50 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-124 w-px border-l border-dashed border-primary/50 pointer-events-none" />

            {/* Horizontal Lines */}
            <div className="absolute left-0 right-0 top-16 h-px border-b border-dashed border-primary/50 pointer-events-none" />
            <div className="absolute left-0 right-0 bottom-16 h-px border-t border-dashed border-primary/50 pointer-events-none" />

            {/* Content */}
            <main className="py-16 px-124 flex flex-col gap-16">
                <AboutSection />
                <ProjectSection />
                <BlogSection />
                <HeatmapSection />
            </main>
        </div>
    )
}
