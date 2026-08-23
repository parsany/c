"use client";

import React from "react";
import { useLenis } from "./useLenis";
import LandingCanvas from "./LandingCanvas";
import HeroSection from "./HeroSection";
import AboutSnapshot from "./AboutSnapshot";
import HorizontalProjects from "./HorizontalProjects";
import AcademicSection from "./AcademicSection";
import ContactCTA from "./ContactCTA";

import { ProjectProfessional, ProjectAcademic } from "@/public/JSONJS";

export default function LandingClient() {
  useLenis();

  return (
    <div className="landing-root bg-theme-bg text-theme-text selection:bg-theme-accentLight selection:text-theme-accentText">
      <LandingCanvas />
      <HeroSection />
      <AboutSnapshot />
      <HorizontalProjects projects={ProjectProfessional} />
      <AcademicSection projects={ProjectAcademic} />
      <ContactCTA />
    </div>
  );
}
