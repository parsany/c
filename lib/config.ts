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
    fileUrl: "/application/ai_resume_parsa_niavand.pdf",
    fileName: "ai_resume_parsa_niavand.pdf",
    iconName: "Cpu",
  },
  {
    id: "frontend",
    titleKey: "frontendTitle",
    subtitleKey: "frontendSubtitle",
    fileUrl: "/application/frontend_resume_parsa_niavand.pdf",
    fileName: "frontend_resume_parsa_niavand.pdf",
    iconName: "Code2",
  },
  {
    id: "backend",
    titleKey: "backendTitle",
    subtitleKey: "backendSubtitle",
    fileUrl: "/application/backend_resume_parsa_niavand.pdf",
    fileName: "backend_resume_parsa_niavand.pdf",
    iconName: "Server",
  },
  {
    id: "qa",
    titleKey: "qaTitle",
    subtitleKey: "qaSubtitle",
    fileUrl: "/application/QA_resume_parsa_niavand.pdf",
    fileName: "QA_resume_parsa_niavand.pdf",
    iconName: "CheckCircle2",
  },
  {
    id: "devops",
    titleKey: "devopsTitle",
    subtitleKey: "devopsSubtitle",
    fileUrl: "/application/devops_resume_parsa_niavand.pdf",
    fileName: "devops_resume_parsa_niavand.pdf",
    iconName: "Terminal",
  },
  {
    id: "support",
    titleKey: "supportTitle",
    subtitleKey: "supportSubtitle",
    fileUrl: "/application/tech_support_resume_parsa_niavand.pdf",
    fileName: "tech_support_resume_parsa_niavand.pdf",
    iconName: "Headphones",
  },
];
