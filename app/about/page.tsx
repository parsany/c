import React from "react";
import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Parsa | Full-Stack Software Engineer",
  description:
    "Parsa is a full-stack software engineer who builds web applications and experiments with machine learning.",
  alternates: {
    canonical: "https://parsany.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

