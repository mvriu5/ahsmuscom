import type { Metadata } from "next";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and contact information for Marius Ahsmus.",
  alternates: {
    canonical: "/legal-notice",
  },
};

export default function ImprintPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Legal Notice",
    description: "Legal notice and contact information for Marius Ahsmus.",
    url: "https://ahsmus.com/legal-notice",
    isPartOf: {
      "@type": "WebSite",
      name: "Marius Ahsmus",
      url: "https://ahsmus.com",
    },
  };

  return (
    <Container jsonLd={jsonLd}>
      <div className="border-t border-dashed border-border">
        <div className="flex flex-col gap-8 p-8">
          <BackButton />
          <div className="flex flex-col gap-8">
            <h1 className="font-neuton text-4xl">Legal Notice</h1>
            <div className="text-sm space-y-6">
              <div>
                <h2 className="text-base font-semibold mb-2">
                  Information according to § 5 TMG
                </h2>
                <p className="font-mono tracking-tight">Marius Ahsmus</p>
                <p className="font-mono tracking-tight">
                  Straße des 18. Oktober 15
                </p>
                <p className="font-mono tracking-tight">04103 Leipzig</p>
              </div>
              <div>
                <h2 className="text-base font-semibold mb-2">Contact</h2>
                <p className="font-mono tracking-tight">
                  Phone number: +4917680166904
                </p>
                <p className="font-mono tracking-tight">
                  E-Mail: marius.ahsmus@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
