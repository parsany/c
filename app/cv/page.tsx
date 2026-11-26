import React from "react";
import type { Metadata } from "next";
import CVClient from "@/components/CVClient";

export const metadata: Metadata = {
  title: "CV & Resumes | Parsa",
  description:
    "Download Parsa's full-stack software engineer resume and specialized AI & machine learning CV.",
  alternates: {
    canonical: "https://parsany.com/cv/",
  },
};

export default function CVPage() {
  return <CVClient />;
}

