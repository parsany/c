import { Locale } from "@/translations";
import * as enProjects from "./en";
import * as ruProjects from "./ru";
import * as amProjects from "./am";
import { AcademicProject, ProfessionalProject } from "./types";

export * from "./types";

export const projectsByLocale: Record<
  Locale,
  {
    ProjectAcademic: AcademicProject[];
    ProjectProfessional: ProfessionalProject[];
  }
> = {
  en: enProjects,
  ru: ruProjects,
  am: amProjects,
};

export const ProjectAcademic = enProjects.ProjectAcademic;
export const ProjectProfessional = enProjects.ProjectProfessional;

export function getProjects(locale: Locale = "en") {
  const current = projectsByLocale[locale] || projectsByLocale.en;
  if (locale === "en") return current;

  const enMap = new Map(enProjects.ProjectProfessional.map((p) => [p.slug, p]));
  const enrichedProfessional = current.ProjectProfessional.map((p) => {
    const enFallback = enMap.get(p.slug);
    if (!enFallback) return p;
    return {
      ...p,
      category: p.category || enFallback.category,
      serviceHeadline: p.serviceHeadline || enFallback.serviceHeadline,
      keyOutcomes: (p.keyOutcomes && p.keyOutcomes.length > 0) ? p.keyOutcomes : enFallback.keyOutcomes,
    };
  });

  return {
    ...current,
    ProjectProfessional: enrichedProfessional,
  };
}

export function getProfessionalProject(slug: string, locale: Locale = "en"): ProfessionalProject | undefined {
  const current = getProjects(locale);
  const found = current.ProjectProfessional.find((p) => p.slug === slug);
  if (found) return found;
  return projectsByLocale.en.ProjectProfessional.find((p) => p.slug === slug);
}

export function getAcademicProject(id: number, locale: Locale = "en"): AcademicProject | undefined {
  const current = getProjects(locale);
  const found = current.ProjectAcademic.find((p) => p.id === id);
  if (found) return found;
  return projectsByLocale.en.ProjectAcademic.find((p) => p.id === id);
}
