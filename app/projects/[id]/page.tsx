import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectProfessional } from "@/public/JSONJS";
import ProjectDetailClient from "@/components/ProjectDetailClient";

export async function generateStaticParams() {
  return ProjectProfessional.map((project) => ({
    id: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = ProjectProfessional.find((item) => item.slug === id);
  if (!project) {
    return {
      title: "Project Not Found | Parsa",
    };
  }

  const isNoIndex = ["esp", "msk", "taxiland", "goldenbat", "alzahra", "edu-platform", "k2n-solutions", "charbag"].includes(project.slug);

  return {
    title: `${project.name} | Parsa`,
    description: project.description,
    robots: isNoIndex ? { index: false, follow: false } : undefined,
    alternates: isNoIndex
      ? undefined
      : {
          canonical: `https://parsany.com/projects/${project.slug}`,
        },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = ProjectProfessional.find((item) => item.slug === id);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.name,
    "description": project.description,
    "applicationCategory": "DeveloperApplication",
    "author": {
      "@type": "Person",
      "name": "Parsa",
      "url": "https://parsany.com"
    },
    "url": `https://parsany.com/projects/${project.slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
