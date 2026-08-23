"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Send, Linkedin, Github, Check, Copy, MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const email = "vvsparsa@gmail.com";

  React.useEffect(() => {
    const handleToggle = (e: Event) => {
      const ce = e as CustomEvent;
      setIsBurning(ce.detail !== undefined ? ce.detail : !isBurning);
    };
    window.addEventListener("toggle-burning-state", handleToggle);
    return () => window.removeEventListener("toggle-burning-state", handleToggle);
  }, [isBurning]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const socials = [
    {
      name: "WhatsApp",
      href: "https://wa.me/37433877067",
      icon: <Phone className="h-5 w-5" />,
      username: "+374 33 877 067",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/parsany/",
      icon: <Linkedin className="h-5 w-5" />,
      username: "parsany",
    },
    {
      name: "Telegram",
      href: "https://t.me/parsanid",
      icon: <Send className="h-5 w-5" />,
      username: "@parsanid",
    }, {
      name: "GitHub",
      href: "https://github.com/parsany",
      icon: <Github className="h-5 w-5" />,
      username: "parsany",
    },
  ];

  return (
    <section className="pt-8 md:pt-12 pb-12 md:pb-20 w-full" id="contact">
      <div className="max-w-3xl mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-theme-text mb-2">Connect</h2>
            <p className="text-theme-muted text-sm md:text-base">
              Get in touch with me:
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-semibold text-xs transition-all shadow-sm self-start sm:self-auto"
          >
            <span>Send a Message</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <article
            className={`flex items-center justify-between p-4 rounded-lg bg-theme-btnExploreBg border border-theme-border focus-within:ring-2 focus-within:ring-theme-accent/50 ${
              (socials.length + 1) % 2 !== 0 ? "sm:col-span-2" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded bg-theme-bg border border-theme-border text-theme-secondary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-theme-muted uppercase">Direct Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-mono text-theme-text hover:text-theme-accent transition-colors focus:outline-none"
                >
                  {email}
                </a>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="p-2 rounded hover:bg-theme-bg text-theme-muted hover:text-theme-text transition-colors focus:ring-1 focus:ring-theme-accent focus:outline-none"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check className="h-4 w-4 text-theme-accent" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </article>

          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 p-4 rounded-lg bg-theme-btnExploreBg border border-theme-border hover:border-theme-accent/60 transition-all focus:ring-2 focus:ring-theme-accent/50 focus:outline-none"
            >
              <div className="p-2 rounded bg-theme-bg border border-theme-border text-theme-secondary">
                {social.icon}
              </div>
              <div>
                <p className="text-xs font-mono text-theme-muted uppercase">{social.name}</p>
                <span className="text-sm font-mono text-theme-text group-hover:text-theme-accent">
                  {social.username}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="text-xs font-mono text-theme-muted flex flex-col sm:flex-row items-center justify-between border-t border-theme-border pt-6 gap-4">
        <p>© {new Date().getFullYear()} Parsa. All rights open.</p>
        <div className="flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-theme-text transition-colors"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </section>
  );
}
