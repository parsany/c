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

  const isNoIndex = ["esp", "msk", "taxiland", "goldenbat", "alzahra", "edu-platform"].includes(project.slug);

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

  return <ProjectDetailClient project={project} />;
}
