import { AboutSection } from "@/components/sections/about-section"
import { BlogSection } from "@/components/sections/blog-section"
import { FooterSection } from "@/components/sections/footer-section"
import { HeatmapSection } from "@/components/sections/heatmap-section"
import { MapSection } from "@/components/sections/map-section"
import { ProjectSection } from "@/components/sections/project-section"

export default async function IndexPage() {

    return (
        <div className="relative min-h-screen max-w-screen font-sans">
            <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-[10%] lg:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-[10%] lg:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />

            <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] lg:pl-[25%] w-px border-r border-dashed border-border pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] lg:pr-[25%] w-px border-l border-dashed border-border pointer-events-none" />

            <main className="py-16 px-4 sm:px-[10%] lg:px-[25%] flex flex-col gap-16">
                <AboutSection />
                <ProjectSection />
                <BlogSection />
                <HeatmapSection />
                <MapSection />
                <FooterSection/>
            </main>
        </div>
    )
}
