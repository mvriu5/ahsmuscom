import Link from "next/link"

export default async function IndexPage() {

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-16">
            <div className={"flex items-center gap-4 justify-between"}>
                <div className={"flex flex-col"}>
                    <h1 className={"text-2xl"}>Marius Ahsmus</h1>
                    <p className={"font-mono text-sm"}>Frontend Developer</p>
                </div>
                <button
                    className={"flex items-center gap-2 px-4 py-2 rounded-sm border border-zinc-500 shadow-sm bg-zinc-800 text-zinc-200"}
                    type="button"
                >
                    Book a call
                </button>
            </div>

            <div className={"flex flex-col"}>
                <h2 className={"text-xl font-medium"}>Projects</h2>
                <Link href="https://tryforge.io" className={"hover:bg-zinc-200 rounded-sm px-4 py-2"}>
                    Forge
                </Link>
                <Link href="https://code.tech" className={"hover:bg-zinc-200 rounded-sm px-4 py-2"}>
                    Code0
                </Link>
                <Link href="/blog" className={"hover:bg-zinc-200 rounded-sm px-4 py-2"}>
                    Blog
                </Link>
            </div>

        </main>
    )
}