import Link from "next/link"
import { Section } from "../section"
import {
    BetterAuth,
    Biomejs,
    DrizzleORM,
    ESLint,
    MistralAI,
    Motion,
    Neon,
    Nextjs,
    Polar,
    PostgreSQL,
    ReactIcon,
    Redis,
    Resend,
    Sanity,
    TailwindCSS,
    TypeScript,
    Upstash,
    Vercel
} from "../svg-icons"
import { Button, buttonVariants } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { cn } from "@/lib/utils"

const stack = [
    { name: "Next.js", icon: Nextjs, url: "https://nextjs.org/", description: "The React framework for production. I use it for all my projects." },
    { name: "React", icon: ReactIcon, url: "https://react.dev/", description: "The library for web and native user interfaces." },
    { name: "TypeScript", icon: TypeScript, url: "https://www.typescriptlang.org/", description: "JavaScript with syntax for types. My go-to for any project." },
    { name: "Tailwind CSS", icon: TailwindCSS, url: "https://tailwindcss.com/", description: "A utility-first CSS framework for rapidly building custom designs." },
    { name: "Motion", icon: Motion, url: "https://motion.dev/", description: "A production-ready animation library for React." },
    { name: "Sanity", icon: Sanity, url: "https://www.sanity.io/", description: "The headless CMS I use for my blog and projects." },
    { name: "Vercel", icon: Vercel, url: "https://vercel.com/", description: "The platform I use to deploy my projects." },
    { name: "Neon", icon: Neon, url: "https://neon.tech/", description: "Serverless Postgres. I use it for all my projects." },
    { name: "PostgreSQL", icon: PostgreSQL, url: "https://www.postgresql.org/", description: "The world's most advanced open source database." },
    { name: "Drizzle ORM", icon: DrizzleORM, url: "https://orm.drizzle.team/", description: "The TypeScript ORM I use for my projects." },
    { name: "Redis", icon: Redis, url: "https://redis.io/", description: "In-memory data store, used for caching." },
    { name: "Upstash", icon: Upstash, url: "https://upstash.com/", description: "A serverless Redis provider I used in Forge to send notifications." },
    { name: "Resend", icon: Resend, url: "https://resend.com/", description: "The email API I use for my projects." },
    { name: "Mistral AI", icon: MistralAI, url: "https://mistral.ai/", description: "An open-source large language model. I use it for the document extraction and conversion in Structly." },
    { name: "Biome", icon: Biomejs, url: "https://biomejs.dev/", description: "A fast formatter and linter for web projects." },
    { name: "BetterAuth", icon: BetterAuth, url: "https://better-auth.com/", description: "The authentication library I use to easily manage users." },
    { name: "Polar", icon: Polar, url: "https://polar.sh/", description: "A billing platform for developers which I use for payment in Structly." },
]

export function StackSection() {
    return (
        <Section title="04 Techstack">
            <p className="mb-4 text-muted-foreground">
                A selection of technologies I worked with in the past.
            </p>
            <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                    <Tooltip key={tech.url}>
                        <TooltipTrigger delay={2000}>
                            <Link
                                href={tech.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(buttonVariants({ variant: "outline", size: "xs" }))}
                            >
                                    <tech.icon className="h-6 w-6" />
                                    {tech.name}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tech.description}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </Section>
    )
}
