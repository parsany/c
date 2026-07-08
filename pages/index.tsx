import React from "react";
import IntroSection from "@/components/IntroSection";
import AboutSection from "@/components/AboutSection";
import LatestWritings from "@/components/LatestWritings";
import ProjectList from "@/components/ProjectList";
import ContactSection from "@/components/ContactSection";

interface HomeProps {
  onOpenCommandMenu: () => void;
}

export default function Home({ onOpenCommandMenu }: HomeProps) {
  return (
    <div className="space-y-4">
      <IntroSection onOpenCommandMenu={onOpenCommandMenu} />
      <ProjectList />
      <LatestWritings />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
