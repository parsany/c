import React from "react";
import IntroSection from "@/components/IntroSection";
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
      <ContactSection />
    </div>
  );
}
