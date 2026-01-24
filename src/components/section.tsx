import { ReactNode } from "react"

interface SectionProps {
    title?: string
    children: ReactNode
}

export function Section({title, children}: SectionProps) {
    return (
        <div className="w-full flex flex-col gap-4 border-t border-dashed border-border">
            {title &&
                <h1 className="px-8 text-4xl text-foreground/85 font-neuton border-b border-dashed border-border p-2">{title}</h1>
            }
            <div className="px-8">
                {children}
            </div>
        </div>
    )
}
