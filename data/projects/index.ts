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
  return projectsByLocale[locale] || projectsByLocale.en;
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
