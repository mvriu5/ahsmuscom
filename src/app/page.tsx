import { FadeIn } from "@/components/fade-in"
import { AboutSection } from "@/components/sections/about-section"
import { BlogSection } from "@/components/sections/blog-section"
import { FooterSection } from "@/components/sections/footer-section"
import { HeatmapSection } from "@/components/sections/heatmap-section"
import { MapSection } from "@/components/sections/map-section"
import { ProjectSection } from "@/components/sections/project-section"
import { StackSection } from "@/components/sections/stack-section"
import type { Metadata } from "next"
import { type Activity } from "react-activity-calendar"

type Contribution = {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
}

export const metadata: Metadata = {
    alternates: {
        canonical: "/",
    },
}

export default async function IndexPage() {
    let contributions: Activity[] = []
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://ahsmus.com/#person",
                name: "Marius Ahsmus",
                url: "https://ahsmus.com",
                jobTitle: "Software Engineer",
                sameAs: [
                    "https://github.com/mvriu5",
                    "https://x.com/mvriu5",
                ],
            },
            {
                "@type": "WebSite",
                "@id": "https://ahsmus.com/#website",
                url: "https://ahsmus.com",
                name: "Marius Ahsmus",
                inLanguage: "de-DE",
            },
        ],
    }

    try {
        const username = "mvriu5"
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
            next: { revalidate: 3600 } // Revalidate every hour
        })

        if (!response.ok) throw new Error("Failed to fetch contributions")

        const data = await response.json()

        if (data.contributions) {
            const allContributions: Contribution[] = data.contributions
            const contributionsByDate = new Map(allContributions.map(c => [c.date, c]))
            const endDate = new Date()
            const startDate = new Date()
            startDate.setDate(endDate.getDate() - 364)

            const last365daysContributions: Contribution[] = []
            const currentDate = new Date(startDate)
            while (currentDate <= endDate) {
                const dateStr = currentDate.toISOString().split("T")[0]
                const contrib = contributionsByDate.get(dateStr)
                last365daysContributions.push(contrib || { date: dateStr, count: 0, level: 0 })
                currentDate.setDate(currentDate.getDate() + 1)
            }

            contributions = last365daysContributions
        }
    } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error)
        const totalDays = 365

        contributions = Array.from({ length: totalDays }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() - (totalDays - i))
            const rand = Math.random()
            const level = rand > 0.8
                ? ((Math.floor(Math.random() * 4) + 1) as Contribution["level"])
                : 0

            return {
                date: date.toISOString().split("T")[0],
                count: level > 0 ? Math.floor(Math.random() * 10) : 0,
                level: level,
            }
        })
    }


    return (
        <div className="relative min-h-screen max-w-screen font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] xl:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] xl:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />

            <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] md:pl-[16%] lg:pl-[20%] xl:pl-[25%] w-px border-r border-dashed border-border pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] md:pr-[16%] lg:pr-[20%] xl:pr-[25%] w-px border-l border-dashed border-border pointer-events-none" />

            <main className="py-16 px-4 sm:px-[10%] md:px-[16%] lg:px-[20%] xl:px-[25%] flex flex-col gap-16">
                <FadeIn>
                    <AboutSection />
                </FadeIn>
                <FadeIn delay={0.1}>
                    <ProjectSection />
                </FadeIn>
                <FadeIn delay={0.1}>
                    <BlogSection />
                </FadeIn>
                <FadeIn delay={0.1}>
                    <StackSection/>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <HeatmapSection contributions={contributions} />
                </FadeIn>
                <FadeIn delay={0.1}>
                    <MapSection />
                </FadeIn>
                <FadeIn delay={0.1}>
                    <FooterSection/>
                </FadeIn>
            </main>
        </div>
    )
}
