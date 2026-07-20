import Link from "next/link"

const projects = [
    {
        title: "CodeZero Landing Page",
        link: "https://codezero.build",
    },
    {
        title: "Structly",
        link: "https://structly.de",
    },
    {
        title: "Forge",
        link: "https://tryforge.io",
    },
    {
        title: "Paylod AI Plugin",
        link: "https://github.com/mvriu5/payload-ai-plugin",
    },
    {
        title: "Payload Icon Picker Plugin",
        link: "https://github.com/mvriu5/payload-icon-picker",
    },
] as const

export function ProjectSection() {
    return (
        <div className="flex flex-col px-8 font-neuton">
            {projects.map((project) => (
                <Link
                    key={project.link}
                    className="w-max text-gray-300 tracking-wide hover:underline hover:text-white"
                    href={project.link}
                    rel="noopener noreferrer"
                    target={"_blank"}
                >
                    {project.title}
                </Link>
            ))}
        </div>
    )
}
