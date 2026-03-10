import { cn } from "@/lib/utils"
import Link from "next/link"
import { Section } from "../section"
import {
    BetterAuth,
    Docker,
    DrizzleORM,
    ESLint,
    Figma,
    Git,
    Motion,
    Nextjs,
    Playwright,
    Polar,
    PostgreSQL,
    ReactIcon,
    Redis,
    Resend,
    TailwindCSS,
    TypeScript,
    Vercel,
    Vite
} from "../svg-icons"
import { buttonVariants } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const stack = [
    {
        category: "Languages & Libraries",
        items: [
            { name: "TypeScript", icon: TypeScript, url: "https://www.typescriptlang.org/", description: "JavaScript with syntax for types. My go-to for any project." },
            { name: "React", icon: ReactIcon, url: "https://react.dev/", description: "The library for web and native user interfaces." },
        ]
    },
    {
        category: "Frameworks & UI",
        items: [
            { name: "Next.js", icon: Nextjs, url: "https://nextjs.org/", description: "The React framework for production. I use it for all my projects." },
            { name: "Tailwind CSS", icon: TailwindCSS, url: "https://tailwindcss.com/", description: "A utility-first CSS framework for rapidly building custom designs." },
            { name: "Vite", icon: Vite, url: "https://vite.dev/", description: "A fast frontend build tool I use for lean React setups outside of Next.js." },
        ]
    },
    {
        category: "Data & Backend",
        items: [
            { name: "PostgreSQL", icon: PostgreSQL, url: "https://www.postgresql.org/", description: "The world's most advanced open source database." },
            { name: "Drizzle ORM", icon: DrizzleORM, url: "https://orm.drizzle.team/", description: "The TypeScript ORM I use for my projects." },
            { name: "Redis", icon: Redis, url: "https://redis.io/", description: "In-memory data store, used for caching." },
        ]
    },
    {
        category: "Testing & Tooling",
        items: [
            { name: "ESLint", icon: ESLint, url: "https://eslint.org/", description: "A fast formatter and linter for web projects." },
            { name: "Playwright", icon: Playwright, url: "https://playwright.dev/", description: "The end-to-end testing framework I use to validate real user flows." },
        ]
    },
    {
        category: "Tools & Platforms",
        items: [
            { name: "Git", icon: Git, url: "https://git-scm.com/", description: "The version control system I use to manage code, branches, and collaboration." },
            { name: "Docker", icon: Docker, url: "https://www.docker.com/", description: "A container platform I use to standardize local development and deployments." },
            { name: "Figma", icon: Figma, url: "https://www.figma.com/", description: "The design tool I use to explore interfaces, layouts, and product ideas." },
        ]
    },
    {
        category: "Services",
        items: [
            { name: "Vercel", icon: Vercel, url: "https://vercel.com/", description: "The platform I use to deploy my projects." },
            { name: "Resend", icon: Resend, url: "https://resend.com/", description: "The email API I use for my projects." },
            { name: "BetterAuth", icon: BetterAuth, url: "https://better-auth.com/", description: "The authentication library I use to easily manage users." },
            { name: "Polar", icon: Polar, url: "https://polar.sh/", description: "A billing platform for developers which I use for payment in Structly." },
        ]
    }
]

export function StackSection() {
    return (
        <Section title="04 Techstack">
            <div className="space-y-4">
                {stack.map((group) => (
                    <div key={group.category} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <h3 className="text-xs font-medium font-mono text-muted-foreground">
                            {group.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {group.items.map((tech) => (
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
                    </div>
                ))}
            </div>
        </Section>
    )
}
