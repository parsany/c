import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ContactHeader() {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8 group"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        <span>Back to home</span>
      </Link>

      <header className="space-y-3 mb-10 border-b border-theme-border pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-theme-text">Get in Touch</h1>
        <p className="text-theme-muted text-xs font-mono">/usr/bin/contact --send-message</p>
        <p className="text-theme-secondary text-sm md:text-base leading-relaxed pt-1">
          Have a project in mind, a technical question, or an opportunity to discuss? Send a message below or connect directly.
        </p>
      </header>
    </>
  );
}
