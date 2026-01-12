import { ReactNode } from "react"

interface SectionProps {
    title: string
    children: ReactNode
}

export function Section({title, children}: SectionProps) {
    return (
        <div className="w-full flex flex-col p-8 gap-4">
            <h1 className="text-2xl font-mono font-semibold">{title}</h1>
            {children}
        </div>
    )
}
