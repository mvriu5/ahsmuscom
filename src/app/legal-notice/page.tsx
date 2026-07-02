import type { Metadata } from "next"
import { BackButton } from "@/components/back-button"
import { Container } from "@/components/container"

export const metadata: Metadata = {
    title: "Legal Notice",
    description: "Legal notice and contact information for Marius Ahsmus.",
    alternates: {
        canonical: "/legal-notice",
    },
}

export default function ImprintPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Legal Notice",
        description: "Legal notice and contact information for Marius Ahsmus.",
        url: "https://ahsmus.com/legal-notice",
        isPartOf: {
            "@type": "WebSite",
            name: "Marius Ahsmus",
            url: "https://ahsmus.com",
        },
    }

    return (
        <Container jsonLd={jsonLd}>
            <div className="flex flex-col gap-8 px-8 font-neuton text-gray-300">
                <BackButton />
                <div className="flex flex-col gap-8 tracking-wide">
                    <h1 className="text-2xl text-white">Legal Notice</h1>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-lg text-white mb-2">Information according to § 5 TMG</h2>
                            <p>Marius Ahsmus</p>
                            <p>Straße des 18. Oktober 25</p>
                            <p>04103 Leipzig</p>
                        </div>
                        <div>
                            <h2 className="text-lg text-white mb-2">Contact</h2>
                            <p>Phone number: +4917680166904</p>
                            <p>E-Mail: marius.ahsmus@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
