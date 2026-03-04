import { BackButton } from "@/components/back-button"
import type { Metadata } from "next"

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
        <div className="relative min-h-screen max-w-screen font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] xl:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] xl:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />

            <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] md:pl-[16%] lg:pl-[20%] xl:pl-[25%] w-px border-r border-dashed border-border pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] md:pr-[16%] lg:pr-[20%] xl:pr-[25%] w-px border-l border-dashed border-border pointer-events-none" />

            <main className="py-16 px-4 sm:px-[10%] md:px-[16%] lg:px-[20%] xl:px-[25%]">

                <div className="border-t border-dashed border-border">

                    <div className="flex flex-col gap-8 p-8">
                        <BackButton/>

                        <div className="flex flex-col gap-8">
                            <h1 className="font-neuton text-4xl">Legal Notice</h1>
                            <div className="text-sm space-y-6">
                                <div>
                                    <h2 className="text-base font-semibold mb-2">Information according to § 5 TMG</h2>
                                    <p className="font-mono tracking-tight">Marius Ahsmus</p>
                                    <p className="font-mono tracking-tight">Straße des 18. Oktober 15</p>
                                    <p className="font-mono tracking-tight">04103 Leipzig</p>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold mb-2">Contact</h2>
                                    <p className="font-mono tracking-tight">Phone number: +4917680166904</p>
                                    <p className="font-mono tracking-tight">E-Mail: marius.ahsmus@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
