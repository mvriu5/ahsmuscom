import { Toaster } from "sonner"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import type {ReactNode} from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import localFont from 'next/font/local'

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
  title: {
    default: "Marius Ahsmus | Software Engineer",
    template: "%s | Marius Ahsmus",
  },
  description: "Personal portfolio and blog of Marius Ahsmus, a software engineer based in Leipzig.",
  openGraph: {
    title: "Marius Ahsmus | Designer & Developer",
    description: "Personal portfolio and blog of Marius Ahsmus, a software engineer based in Leipzig.",
    type: "website",
    locale: "de_DE",
    siteName: "Marius Ahsmus",
  },
  // TODO: Add twitter card metadata and a default OG image.
}

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={`${geistMono.variable} ${fontSans.variable} ${neuton.variable}`}>
            <body className={"antialiased"}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
                <Toaster />
            </body>
        </html>
    )
}
