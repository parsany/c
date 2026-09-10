import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectProfessional } from "@/public/JSONJS";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import { SITE_URL, SITE_AUTHOR } from "@/lib/config";

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

  return {
    title: `${project.name} | Parsa`,
    description: project.description,
    robots: project.noindex ? { index: false, follow: false } : undefined,
    alternates: project.noindex
      ? undefined
      : {
          canonical: `${SITE_URL}/projects/${project.slug}`,
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
      "name": SITE_AUTHOR,
      "url": SITE_URL,
    },
    "url": `${SITE_URL}/projects/${project.slug}`,
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
