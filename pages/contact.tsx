import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactDirectBar } from "@/components/contact/ContactDirectBar";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto py-12">
      <Head>
        <title>Contact Parsa | Full-Stack Software Engineer</title>
        <meta
          name="description"
          content="Get in touch with Parsa for web app development, software engineering, architecture inquiries, or collaboration opportunities."
        />
        <link rel="canonical" href="https://parsany.com/contact" key="canonical" />
      </Head>

      <ContactHeader />
      <ContactForm />
      <ContactDirectBar />


      <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link href="/" className="hover:text-theme-text transition-colors">
          &larr; Back to home
        </Link>
        <Link href="/about" className="hover:text-theme-text transition-colors">
          About &rarr;
        </Link>
      </footer>
    </article>
  );
}

