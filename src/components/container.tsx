import type { ReactNode } from "react"

type JsonLd = Record<string, unknown>

type ContainerProps = {
    children: ReactNode
    jsonLd?: JsonLd
}

export function Container({ children, jsonLd }: ContainerProps) {
    return (
        <div className="relative min-h-screen max-w-screen bg-black dark">
            {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>}

            <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] md:pl-[16%] lg:pl-[20%] xl:pl-[25%] w-px border-r border-dashed border-border pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] md:pr-[16%] lg:pr-[20%] xl:pr-[25%] w-px border-l border-dashed border-border pointer-events-none" />

            <main className={"min-h-screen py-16 px-0 sm:px-[10%] md:px-[16%] lg:px-[20%] xl:px-[25%] flex flex-col gap-8"}>{children}</main>
        </div>
    )
}
