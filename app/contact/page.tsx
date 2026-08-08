import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactDirectBar } from "@/components/contact/ContactDirectBar";
import { ContactForm } from "@/components/contact/ContactForm";

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
      <ContactForm />
      <ContactDirectBar />

      <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link href="/" className="hover:text-theme-text transition-colors">
          &larr; Back to home
        </Link>
        <Link href="/about" className="hover:text-theme-text transition-colors">
          About
        </Link>
      </footer>
    </article>
  );
}
