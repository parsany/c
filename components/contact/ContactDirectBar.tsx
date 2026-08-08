"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Github, Linkedin, Send, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      name: "GitHub",
      href: "https://github.com/parsany",
      icon: <Github className="h-3.5 w-3.5" />,
      label: "parsany"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/parsany/",
      icon: <Linkedin className="h-3.5 w-3.5" />,
      label: "parsany"
    },
    {
      name: "Telegram",
      href: "https://t.me/parsanid",
      icon: <Send className="h-3.5 w-3.5" />,
      label: "@parsanid"
    }
  ];

  return (
    <div className="space-y-3 mb-8">
      <div className="p-4 rounded-xl bg-theme-cardBg dark:bg-[#232323] border border-theme-border dark:border-[#333333] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="p-2.5 rounded-lg bg-theme-btnExploreBg dark:bg-[#181818] border border-theme-border dark:border-[#383838] text-theme-accent shrink-0">
            <Mail className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono text-theme-muted dark:text-[#a89984] uppercase tracking-wider">Direct Email</p>
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
          className="inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-theme-btnExploreBg dark:bg-[#181818] border border-theme-border dark:border-[#383838] hover:border-theme-accent/50 dark:hover:border-[#fabd2f]/60 text-theme-secondary hover:text-theme-text text-xs font-mono transition-all shrink-0 select-none"
          title="Copy email address"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="checked"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Copied</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center space-x-1.5"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Address</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 rounded-xl bg-theme-cardBg dark:bg-[#232323] border border-theme-border dark:border-[#333333] hover:border-theme-accent/50 dark:hover:border-[#fabd2f]/60 transition-all shadow-sm"
          >
            <div className="flex items-center space-x-2.5">
              <span className="text-theme-muted dark:text-[#a89984] group-hover:text-theme-accent transition-colors">
                {s.icon}
              </span>
              <div>
                <p className="text-xs font-semibold text-theme-text group-hover:text-theme-accent transition-colors">
                  {s.name}
                </p>
                <p className="text-[10px] font-mono text-theme-muted dark:text-[#a89984]">{s.label}</p>
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-theme-muted dark:text-[#a89984] group-hover:text-theme-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
