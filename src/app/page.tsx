import { Container } from "@/components/container"
import { FadeIn } from "@/components/fade-in"
import { AboutSection } from "@/components/sections/about-section"
import { FooterSection } from "@/components/sections/footer-section"
import { ProjectSection } from "@/components/sections/project-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
    alternates: {
        canonical: "/",
    },
}

export default async function IndexPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://ahsmus.com/#person",
                name: "Marius Ahsmus",
                url: "https://ahsmus.com",
                jobTitle: "Software Engineer",
                sameAs: ["https://github.com/mvriu5", "https://x.com/mvriu5"],
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

    return (
        <Container jsonLd={jsonLd}>
            <FadeIn>
                <AboutSection />
            </FadeIn>
            <FadeIn delay={0.1}>
                <ProjectSection />
            </FadeIn>
            <FadeIn delay={0.1} className="mt-auto">
                <FooterSection />
            </FadeIn>
        </Container>
    )
}
