import React from "react";
import type { Metadata } from "next";
import CVClient from "@/components/CVClient";

export const metadata: Metadata = {
  title: "CV & Resumes | Parsa",
  description:
    "Download Parsa's full-stack software engineer resume and role-specific CVs (AI/ML, Frontend, Backend, Systems, Tech Support).",
  alternates: {
    canonical: "https://parsany.com/cv",
  },
};

export default function CVPage() {
  return <CVClient />;
}

