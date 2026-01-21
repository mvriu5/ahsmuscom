import { Button } from "@/components/ui/button"
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export default function ImprintPage() {
    return (
        <div className="relative min-h-screen max-w-screen font-sans">
            <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-[10%] lg:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-[10%] lg:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />

            <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] lg:pl-[25%] w-px border-r border-dashed border-border pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] lg:pr-[25%] w-px border-l border-dashed border-border pointer-events-none" />

            <main className="py-16 px-4 sm:px-[10%] lg:px-[25%]">

                <div className="border-t border-dashed border-border">

                    <div className="flex flex-col gap-16 p-8">
                        <Link href="/">
                            <Button variant="ghost" className={"text-gray-500"}>
                                <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2.5} className="text-gray-500 mt-0.5"/>
                                Back
                            </Button>
                        </Link>

                        <div className="flex flex-col gap-4">
                            <h1 className="font-mono text-xl font-semibold">Imprint</h1>
                            <div className="text-sm">
                                <p>Marius Ahsmus</p>
                                <p>Straße des 18. Oktober 15</p>
                                <p>04103 Leipzig</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
