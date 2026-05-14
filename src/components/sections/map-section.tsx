"use client"

import dynamic from "next/dynamic"
import { Section } from "../section"

const LocationMap = dynamic(
    async () => (await import("./map-section-map")).LocationMap,
    {
        ssr: false,
        loading: () => <div className="h-full w-full bg-muted" />,
    }
)

export function MapSection() {
    return (
        <Section title="06 Location">
            <div className="h-48 md:h-68 overflow-hidden rounded-md border border-border">
                <LocationMap />
            </div>
        </Section>
    )
}
