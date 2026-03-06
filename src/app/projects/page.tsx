import type { Metadata } from "next";
import { BackButton } from "@/components/back-button";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { client } from "@/sanity/lib/client";
import type { Project } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software projects by Marius Ahsmus, including architecture decisions, implementation details, and live demos.",
  alternates: {
    canonical: "/projects",
  },
};

const PROJECTS_QUERY = `*[_type == "project"]{
    _id,
    title,
    link,
    description,
    detailedDescription,
    live,
    popoverContent
}`;

const options = { next: { revalidate: 30 } };

export default async function ProjectsPage() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects",
    description:
      "Selected software projects by Marius Ahsmus, including architecture decisions, implementation details, and live demos.",
    url: "https://ahsmus.com/projects",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: project.link,
        name: project.title,
      })),
    },
  };

  return (
    <Container jsonLd={jsonLd}>
      <FadeIn>
        <div className="border-t border-dashed border-border">
          <div className="flex flex-col gap-8 p-8">
            <BackButton />

            <h1 className="font-neuton text-4xl mb-8">Projects</h1>
            <ul className="flex flex-col gap-y-4 -mt-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
}
