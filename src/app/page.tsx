import type { Metadata } from "next";
import type { Activity } from "react-activity-calendar";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeatmapSection } from "@/components/sections/heatmap-section";
import { MapSection } from "@/components/sections/map-section";
import { ProjectSection } from "@/components/sections/project-section";
import { StackSection } from "@/components/sections/stack-section";

type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function IndexPage() {
  let contributions: Activity[] = [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://ahsmus.com/#person",
        name: "Marius Ahsmus",
        url: "https://ahsmus.com",
        jobTitle: "Software Engineer",
        sameAs: ["https://github.com/mvriu5", "https://x.com/mvriu5"],
      },
      {
        "@type": "WebSite",
        "@id": "https://ahsmus.com/#website",
        url: "https://ahsmus.com",
        name: "Marius Ahsmus",
        inLanguage: "de-DE",
      },
    ],
  };

  try {
    const username = "mvriu5";
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );

    if (!response.ok) throw new Error("Failed to fetch contributions");

    const data = await response.json();

    if (data.contributions) {
      const allContributions: Contribution[] = data.contributions;
      const contributionsByDate = new Map(
        allContributions.map((c) => [c.date, c]),
      );
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 364);

      const last365daysContributions: Contribution[] = [];
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split("T")[0];
        const contrib = contributionsByDate.get(dateStr);
        last365daysContributions.push(
          contrib || { date: dateStr, count: 0, level: 0 },
        );
        currentDate.setDate(currentDate.getDate() + 1);
      }

      contributions = last365daysContributions;
    }
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    const totalDays = 365;

    contributions = Array.from({ length: totalDays }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (totalDays - i));
      const rand = Math.random();
      const level =
        rand > 0.8
          ? ((Math.floor(Math.random() * 4) + 1) as Contribution["level"])
          : 0;

      return {
        date: date.toISOString().split("T")[0],
        count: level > 0 ? Math.floor(Math.random() * 10) : 0,
        level: level,
      };
    });
  }

  return (
    <Container jsonLd={jsonLd}>
      <FadeIn>
        <AboutSection />
      </FadeIn>
      <FadeIn delay={0.1}>
        <ProjectSection />
      </FadeIn>
      <FadeIn delay={0.1}>
        <BlogSection />
      </FadeIn>
      <FadeIn delay={0.1}>
        <StackSection />
      </FadeIn>
      <FadeIn delay={0.1}>
        <HeatmapSection contributions={contributions} />
      </FadeIn>
      <FadeIn delay={0.1}>
        <MapSection />
      </FadeIn>
      <FadeIn delay={0.1}>
        <FooterSection />
      </FadeIn>
    </Container>
  );
}
