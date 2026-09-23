/** Site-wide configuration constants */
export const SITE_URL = "https://parsany.com";
export const SITE_AUTHOR = "Parsa";
export const SITE_EMAIL = "vvsparsa@gmail.com";
export const SITE_GITHUB = "https://github.com/parsany";
export const SITE_LINKEDIN = "https://www.linkedin.com/in/parsany/";
export const SITE_TELEGRAM = "https://t.me/parsanid";
export const SITE_WHATSAPP = "https://wa.me/37433877067";

export type ResumeKey = "aiTitle" | "frontendTitle" | "backendTitle" | "qaTitle" | "devopsTitle" | "supportTitle";
export type ResumeSubKey = "aiSubtitle" | "frontendSubtitle" | "backendSubtitle" | "qaSubtitle" | "devopsSubtitle" | "supportSubtitle";

export interface ResumeConfig {
  id: string;
  titleKey: ResumeKey;
  subtitleKey: ResumeSubKey;
  fileUrl: string;
  fileName: string;
  iconName: "Cpu" | "Code2" | "Server" | "CheckCircle2" | "Terminal" | "Headphones";
}

export const SPECIALIZED_RESUMES: ResumeConfig[] = [
  {
    id: "ai",
    titleKey: "aiTitle",
    subtitleKey: "aiSubtitle",
    fileUrl: "/application/ai_resume.pdf",
    fileName: "ai_resume.pdf",
    iconName: "Cpu",
  },
  {
    id: "frontend",
    titleKey: "frontendTitle",
    subtitleKey: "frontendSubtitle",
    fileUrl: "/application/frontend_resume.pdf",
    fileName: "frontend_resume.pdf",
    iconName: "Code2",
  },
  {
    id: "backend",
    titleKey: "backendTitle",
    subtitleKey: "backendSubtitle",
    fileUrl: "/application/backend_resume.pdf",
    fileName: "backend_resume.pdf",
    iconName: "Server",
  },
  {
    id: "qa",
    titleKey: "qaTitle",
    subtitleKey: "qaSubtitle",
    fileUrl: "/application/QA_resume.pdf",
    fileName: "QA_resume.pdf",
    iconName: "CheckCircle2",
  },
  {
    id: "devops",
    titleKey: "devopsTitle",
    subtitleKey: "devopsSubtitle",
    fileUrl: "/application/devops_resume.pdf",
    fileName: "devops_resume.pdf",
    iconName: "Terminal",
  },
  {
    id: "support",
    titleKey: "supportTitle",
    subtitleKey: "supportSubtitle",
    fileUrl: "/application/tech_support_resume.pdf",
    fileName: "tech_support_resume.pdf",
    iconName: "Headphones",
  },
];
