import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectProfessional } from "@/data/projects";
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

  const projectImage = project.image || project.project_image?.[0] || "/og-image.png";

  return {
    title: `${project.name} | Parsa`,
    description: project.description,
    robots: project.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${project.name} | Parsa`,
      description: project.description,
      url: `${SITE_URL}/projects/${project.slug}/`,
      siteName: "Parsa Niavand Portfolio",
      type: "website",
      images: [
        {
          url: projectImage,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Parsa`,
      description: project.description,
      images: [projectImage],
    },
    alternates: project.noindex
      ? undefined
      : {
          canonical: `${SITE_URL}/projects/${project.slug}/`,
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

  const projectImage = project.image || project.project_image?.[0] || "/og-image.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.name,
    "description": project.description,
    "image": `${SITE_URL}${projectImage}`,
    "applicationCategory": "DeveloperApplication",
    "author": {
      "@type": "Person",
      "name": SITE_AUTHOR,
      "url": SITE_URL,
    },
    "url": `${SITE_URL}/projects/${project.slug}/`,
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
