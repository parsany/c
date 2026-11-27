import React from "react";
import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Parsa | Full-Stack Software Engineer",
  description:
    "Parsa is a full-stack software engineer who builds web applications and experiments with machine learning.",
  openGraph: {
    title: "About Parsa | Full-Stack Software Engineer",
    description:
      "Parsa is a full-stack software engineer who builds web applications and experiments with machine learning.",
    url: "https://parsany.com/about/",
    siteName: "Parsa Niavand Portfolio",
    type: "profile",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Parsa Niavand" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Parsa | Full-Stack Software Engineer",
    description:
      "Parsa is a full-stack software engineer who builds web applications and experiments with machine learning.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://parsany.com/about/",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

