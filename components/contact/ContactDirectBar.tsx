"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Github, Linkedin, Send, ArrowUpRight, Phone } from "lucide-react";

interface ContactDirectBarProps {
  email?: string;
}

export function ContactDirectBar({ email = "vvsparsa@gmail.com" }: ContactDirectBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const socials = [
    {
      name: "WhatsApp",
      href: "https://wa.me/37433877067",
      icon: <Phone className="h-4 w-4" />,
      label: "+374 33 877 067"
    },
    {
      name: "Telegram",
      href: "https://t.me/parsanid",
      icon: <Send className="h-4 w-4" />,
      label: "@parsanid"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/parsany/",
      icon: <Linkedin className="h-4 w-4" />,
      label: "parsany"
    },
    {
      name: "GitHub",
      href: "https://github.com/parsany",
      icon: <Github className="h-4 w-4" />,
      label: "parsany"
    },
  ];

  return (
    <div className="space-y-3 mb-8">
      <div className="p-4 rounded-lg bg-theme-btnExploreBg border border-theme-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="p-2 rounded bg-theme-bg border border-theme-border text-theme-accent shrink-0">
            <Mail className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">Direct Email</p>
            <a
              href={`mailto:${email}`}
              className="text-xs sm:text-sm font-mono text-theme-text hover:text-theme-accent transition-colors truncate block"
            >
              {email}
            </a>
          </div>
        </div>

        <button
          onClick={handleCopyEmail}
          className="inline-flex items-center justify-center space-x-2 px-3 py-1.5 rounded bg-theme-bg border border-theme-border hover:border-theme-accent/50 text-theme-secondary hover:text-theme-text text-xs font-mono transition-colors shrink-0 select-none"
          title="Copy email address"
        >
          {copied ? (
            <span className="inline-flex items-center space-x-1.5 text-theme-accent font-medium">
              <Check className="h-3.5 w-3.5" />
              <span>Copied</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5">
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Email</span>
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 rounded-lg bg-theme-btnExploreBg border border-theme-border hover:border-theme-accent/60 transition-all"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="text-theme-muted group-hover:text-theme-accent transition-colors shrink-0">
                {s.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-mono font-medium text-theme-text group-hover:text-theme-accent transition-colors truncate">
                  {s.name}
                </p>
                <p className="text-[10px] font-mono text-theme-muted truncate">{s.label}</p>
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-theme-muted group-hover:text-theme-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
