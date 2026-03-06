"use client"

import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { ComponentType } from "react"
import { SeoChart } from "@/components/blog-blocks/seo-chart"
import { CodeBlock } from "@/components/code-block"

interface ReactComponentBlockValue {
    component?: string
}

const reactComponentMap: Record<string, ComponentType> = {
    seochart: SeoChart,
}

const portableTextComponents: PortableTextComponents = {
    types: {
        // @ts-ignore
        code: CodeBlock,
        reactComponent: ({ value }: { value: ReactComponentBlockValue }) => {
            const key = value?.component?.toLowerCase()
            const Component = key ? reactComponentMap[key] : undefined

            if (!Component) {
                return null
            }

            return <Component />
        },
    },
    block: {
        h1: ({ children }) => <h1 id={children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-neuton my-4">{children}</h1>,
        h2: ({ children }) => <h2 id={children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-neuton my-3">{children}</h2>,
        h3: ({ children }) => <h3 id={children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-xl font-neuton my-2">{children}</h3>,
        normal: ({ children }) => <p className="text-secondary-foreground/80 text-base">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-muted-foreground/50 pl-4 italic my-4">
                {children}
            </blockquote>
        ),
    },
}

interface PostContentProps {
    body: any;
}

export function PostContent({ body }: PostContentProps) {
    return (
         <div className="prose max-w-none">
            {Array.isArray(body) && <PortableText value={body} components={portableTextComponents} />}
         </div>
    )
}
