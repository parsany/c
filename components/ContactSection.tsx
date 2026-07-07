import React, { useState } from "react";
import { Mail, Send, Linkedin, Github, Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "quantinitycorp@gmail.com";

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
      name: "GitHub",
      href: "https://github.com/parsany",
      icon: <Github className="h-5 w-5" />,
      username: "parsany",
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
  ];

  return (
    <section className="pt-8 md:pt-12 pb-12 md:pb-20" id="contact">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-2">Connect</h2>
        <p className="text-slate-400 text-sm md:text-base mb-8">
          Get in touch with me:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <article className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-900 focus-within:ring-2 focus-within:ring-slate-500">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase">Direct Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-mono text-slate-300 hover:text-slate-100 transition-colors focus:outline-none"
                >
                  {email}
                </a>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="p-2 rounded hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors focus:ring-1 focus:ring-slate-400 focus:outline-none"
              aria-label="Copy email address"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="checked"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="h-4 w-4 text-emerald-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </article>

          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-4 rounded-lg bg-slate-950 border border-slate-900 hover:border-slate-800 transition-all focus:ring-2 focus:ring-slate-500 focus:outline-none"
            >
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                {social.icon}
              </div>
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase">{social.name}</p>
                <span className="text-sm font-mono text-slate-300 group-hover:text-slate-100">
                  {social.username}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-600 flex flex-col sm:flex-row items-center justify-between border-t border-slate-900/60 pt-6 gap-4">
          <p>© {new Date().getFullYear()} Parsa. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-slate-400 transition-colors"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </section >
  );
}
