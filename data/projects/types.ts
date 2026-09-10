export interface AcademicProject {
  id: number;
  name: string;
  description: string;
  date: string;
  image: string;
  link: string;
  video?: string;
  tag: string[];
  visualizer?: "ai" | "game" | "app" | "compiler";
  minigame?: boolean;
}

export interface ProfessionalProject {
  id: number;
  slug: string;
  name: string;
  description: string;
  date: string;
  image: string;
  project_image: string[];
  tag: string[];
  isactive: boolean;
  link: string;
  links: { label: string; url: string }[];
  role?: string;
  highlights?: string[];
  redirect?: string;
  text: string;
  isLive?: boolean;
  noindex?: boolean;
}
