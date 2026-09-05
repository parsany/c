"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Send, Linkedin, Github, Check, Copy, MessageSquare, Phone, PhoneCall } from "lucide-react";
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

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;

    // Load or trigger LinkedIn script only after client DOM is ready
    const existingScript = document.getElementById("linkedin-profile-badge-js");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "linkedin-profile-badge-js";
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById("linkedin-profile-badge-js");
      if (s) s.remove();
    };
  }, [mounted]);

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
      name: "SMS",
      href: "sms:+37433877067",
      icon: <MessageSquare className="h-5 w-5" />,
      username: "+374 33 877 067",
    },
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
    },
    {
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
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <a
              href="tel:+37433877067"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-theme-btnExploreBg hover:bg-theme-border border border-theme-border text-theme-text font-semibold text-xs transition-all shadow-sm"
            >
              <PhoneCall className="h-3.5 w-3.5 text-theme-accent" />
              <span>Call Me</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-semibold text-xs transition-all shadow-sm"
            >
              <span>Send a Message</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <article
            className="sm:col-span-2 flex items-center justify-between p-4 rounded-lg bg-theme-btnExploreBg border border-theme-border focus-within:ring-2 focus-within:ring-theme-accent/50"
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

          {socials
            .filter((s) => s.name !== "LinkedIn")
            .map((social) => (
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

          {/* LinkedIn Badge & Profile Card */}
          <div
            className="sm:col-span-2 rounded-xl border border-theme-border bg-theme-btnExploreBg p-5 flex flex-col items-center justify-center transition-all hover:border-theme-accent/40 shadow-sm overflow-hidden"
            suppressHydrationWarning
          >
            <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-theme-border/60">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-theme-bg border border-theme-border text-theme-secondary">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-theme-muted uppercase">Verified Profile</p>
                  <span className="text-sm font-mono text-theme-text font-semibold">
                    LinkedIn
                  </span>
                </div>
              </div>
              <a
                href="https://am.linkedin.com/in/parsany?trk=profile-badge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-theme-accent hover:text-theme-accentHover inline-flex items-center gap-1 transition-colors"
              >
                <span>linkedin.com/in/parsany</span>
                <span>&rarr;</span>
              </a>
            </div>

            <div className="w-full flex justify-center py-2" suppressHydrationWarning>
              {mounted ? (
                <div
                  className="badge-base LI-profile-badge flex justify-center"
                  data-locale="en_US"
                  data-size="large"
                  data-theme="dark"
                  data-type="VERTICAL"
                  data-vanity="parsany"
                  data-version="v1"
                  suppressHydrationWarning
                >
                  <a
                    className="badge-base__link LI-simple-link flex items-center justify-between gap-3 p-4 rounded-lg bg-theme-bg border border-theme-border hover:border-theme-accent/60 transition-all font-mono text-xs text-theme-text hover:text-theme-accent w-full max-w-sm"
                    href="https://am.linkedin.com/in/parsany?trk=profile-badge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-theme-accent" />
                      <span>Parsa Niavand on LinkedIn</span>
                    </span>
                    <span>&rarr;</span>
                  </a>
                </div>
              ) : (
                <div className="w-[330px] h-[350px] bg-theme-bg animate-pulse rounded-xl" />
              )}
            </div>
          </div>
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
