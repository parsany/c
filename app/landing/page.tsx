import type { Metadata } from "next";
import LandingClient from "./_components/LandingClient";

export const metadata: Metadata = {
  title: "Parsa — Full-Stack Software Engineer & Systems Developer",
  description:
    "Interactive showcase of projects, distributed systems, machine learning research, and full-stack software development by Parsa.",
  robots: {
    index: false,
    follow: false,
  },
  // alternates: {
  //   canonical: "https://parsany.com/landing",
  // },
};

export default function LandingPage() {
  return <LandingClient />;
}