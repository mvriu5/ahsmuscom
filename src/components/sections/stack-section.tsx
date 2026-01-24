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
import { Button } from "../ui/button"

const stack = [
    { name: "Next.js", icon: Nextjs, url: "https://nextjs.org/" },
    { name: "React", icon: ReactIcon, url: "https://react.dev/" },
    { name: "TypeScript", icon: TypeScript, url: "https://www.typescriptlang.org/" },
    { name: "Tailwind CSS", icon: TailwindCSS, url: "https://tailwindcss.com/" },
    { name: "Motion", icon: Motion, url: "https://motion.dev/" },
    { name: "Sanity", icon: Sanity, url: "https://www.sanity.io/" },
    { name: "Vercel", icon: Vercel, url: "https://vercel.com/" },
    { name: "Neon", icon: Neon, url: "https://neon.tech/" },
    { name: "PostgreSQL", icon: PostgreSQL, url: "https://www.postgresql.org/" },
    { name: "Drizzle ORM", icon: DrizzleORM, url: "https://orm.drizzle.team/" },
    { name: "Redis", icon: Redis, url: "https://redis.io/" },
    { name: "Upstash", icon: Upstash, url: "https://upstash.com/" },
    { name: "Resend", icon: Resend, url: "https://resend.com/" },
    { name: "Mistral AI", icon: MistralAI, url: "https://mistral.ai/" },
    { name: "Biome", icon: Biomejs, url: "https://biomejs.dev/" },
    { name: "ESLint", icon: ESLint, url: "https://eslint.org/" },
    { name: "BetterAuth", icon: BetterAuth, url: "https://better-auth.com/" },
    { name: "Polar", icon: Polar, url: "https://polar.sh/" },
]

export function StackSection() {
    return (
        <Section title="05 Techstack">
            <p className="mb-4 text-muted-foreground">
                A selection of technologies I worked with in the past.
            </p>
            <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                    <Link
                        key={tech.url}
                        href={tech.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" size="xs">
                            <tech.icon className="h-6 w-6" />
                            <span className="">
                                {tech.name}
                            </span>
                        </Button>
                    </Link>
                ))}
            </div>
        </Section>
    )
}
