import React from "react";
import type { Metadata } from "next";
import IntroSection from "@/components/IntroSection";
import AboutSection from "@/components/AboutSection";
import LatestWritings from "@/components/LatestWritings";
import ProjectList from "@/components/ProjectList";
import ContactSection from "@/components/ContactSection";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  return (
    <div className="space-y-4">
      <IntroSection />
      <ProjectList />
      <LatestWritings />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
