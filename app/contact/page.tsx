import React from "react";
import type { Metadata } from "next";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactDirectBar } from "@/components/contact/ContactDirectBar";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFooter } from "@/components/contact/ContactFooter";

export const metadata: Metadata = {
  title: "Contact Parsa | Full-Stack Software Engineer",
  description:
    "Get in touch with Parsa for web app development, software engineering, architecture inquiries, or collaboration opportunities.",
  alternates: {
    canonical: "https://parsany.com/contact",
  },
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto py-12">
      <ContactHeader />
      <ContactDirectBar />
      <ContactForm />
      <ContactFooter />
    </article>
  );
}

