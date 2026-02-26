import { TooltipProvider } from "@/components/ui/tooltip"
import type { Metadata } from "next"
import PlausibleProvider from 'next-plausible'
import { Geist_Mono, Inter } from "next/font/google"
import localFont from 'next/font/local'
import type { ReactNode } from "react"
import { Toaster } from "sonner"
import "./globals.css"

const fontSans = Inter({ subsets:['latin'], variable:'--font-sans' })

const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] })

const neuton = localFont({
    src: [{
        path: '../../public/Neuton-Regular.ttf',
        weight: '400'
    }],
    variable: '--font-neuton'
})


export const metadata: Metadata = {
    metadataBase: new URL("https://ahsmus.com"),
    title: {
        default: "Marius Ahsmus | Software Engineer",
        template: "%s | Marius Ahsmus",
    },
    description: "Personal portfolio and blog of Marius Ahsmus, a software engineer based in Leipzig.",
    openGraph: {
        title: "Marius Ahsmus | Software Engineer",
        description: "Personal portfolio and blog of Marius Ahsmus, a software engineer based in Leipzig.",
        url: "https://ahsmus.com",
        type: "website",
        locale: "de_DE",
        siteName: "Marius Ahsmus",
        images: [
            {
                url: "https://ahsmus.com/opengraph_image.jpeg",
                alt: "Marius Ahsmus",
                width: 2752,
                height: 1536,
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Marius Ahsmus | Software Engineer",
        description: "Personal portfolio and blog of Marius Ahsmus, a software engineer based in Leipzig.",
        site: "@mvriu5",
        creator: "@mvriu5",
        images: [
            {
                url: "https://ahsmus.com/twitter_image.jpeg",
                alt: "Marius Ahsmus",
                width: 1536,
                height: 1536,
            }
        ]
    },
    robots: {
        index: true,
        follow: true
    }
}

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={`${geistMono.variable} ${fontSans.variable} ${neuton.variable}`}>
            <body className={"antialiased"}>
                <PlausibleProvider domain="ahsmus.com" selfHosted customDomain="https://analytics.ahsmus.com">
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                    <Toaster />
                </PlausibleProvider>
            </body>
        </html>
    )
}
