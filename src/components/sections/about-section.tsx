import { HugeiconsIcon } from "@hugeicons/react"
import { Section } from "../section"
import { GitHub, Instagram, XformerlyTwitter } from "../svg-icons"
import { Button } from "../ui/button"
import { Mail01Icon } from "@hugeicons/core-free-icons"
import { Booker } from "../booker-embed"

export function AboutSection() {
    return (
        <Section title="01 About">
            <div className="flex gap-4">
                <div className="shrink-0 bg-blue-500 size-22 rounded-xl outline outline-gray-300 border-3 border-gray-200" />
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold">Marius Ahsmus</p>
                    <p className="text-sm text-secondary-foreground/75 font-semibold">Software Engineer</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Button size={"xs"} variant={"outline"}>
                            <GitHub/>
                            Github
                        </Button>
                        <Button size={"xs"} variant={"outline"}>
                            <XformerlyTwitter/>
                            X (formerly Twitter)
                        </Button>
                        <Button size={"xs"} variant={"outline"}>
                            <Instagram/>
                            Instagram
                        </Button>
                        <Button size={"xs"} variant={"outline"}>
                            <HugeiconsIcon icon={Mail01Icon} strokeWidth={2.5}/>
                            Mail
                        </Button>
                        <Booker/>
                    </div>
                </div>
            </div>
        </Section>
    )
}
