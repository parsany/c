import React from "react";
import type { Metadata } from "next";
import CVClient from "@/components/CVClient";

export const metadata: Metadata = {
  title: "CV & Resumes | Parsa",
  description:
    "Download Parsa's full-stack software engineer resume and specialized AI & machine learning CV.",
  openGraph: {
    title: "CV & Resumes | Parsa",
    description:
      "Download Parsa's full-stack software engineer resume and specialized AI & machine learning CV.",
    url: "https://parsany.com/cv/",
    siteName: "Parsa Niavand Portfolio",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Parsa Niavand — CV & Resumes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV & Resumes | Parsa",
    description:
      "Download Parsa's full-stack software engineer resume and specialized AI & machine learning CV.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://parsany.com/cv/",
  },
};

export default function CVPage() {
  return <CVClient />;
}

