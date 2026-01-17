import { Section } from "../section";
import { Button } from "../ui/button";

export function AboutSection() {
    return (
        <Section title="01 About">

            <div className="flex gap-4">
                <div className="bg-primary size-22 rounded-xl outline outline-gray-300 border-3 border-gray-200" />
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold">Marius Ahsmus</p>
                    <p className="text-sm text-secondary-foreground/75 font-semibold">Software Engineer</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Button size={"xs"} variant={"outline"}>
                            Github
                        </Button>
                        <Button size={"xs"} variant={"outline"}>
                            X / Twitter
                        </Button>
                        <Button size={"xs"} variant={"outline"}>
                            Instagram
                        </Button>
                        <Button size={"xs"} variant={"outline"}>
                            Youtube
                        </Button>
                        <Button size={"xs"} variant={"outline"}>
                            Mail
                        </Button>
                    </div>
                </div>
            </div>


        </Section>
    )
}
