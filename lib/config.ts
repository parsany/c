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
];
