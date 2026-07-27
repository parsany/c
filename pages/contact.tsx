import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Send,
  User,
  MessageSquare,
  Tag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Linkedin,
  Github
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const email = "vvsparsa@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const data = new FormData(e.currentTarget);
      data.append("access_key", "e56ba577-8c4e-4f13-a24a-9d323b8baee7");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const resData = await response.json();

      if (resData.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
        setErrorMessage(resData.message || "Something went wrong. Please try again later.");
      }
    } catch (err) {
      setFormStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/parsany",
      icon: <Github className="h-4.5 w-4.5" />,
      username: "parsany"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/parsany/",
      icon: <Linkedin className="h-4.5 w-4.5" />,
      username: "parsany"
    },
    {
      name: "Telegram",
      href: "https://t.me/parsanid",
      icon: <Send className="h-4.5 w-4.5" />,
      username: "@parsanid"
    }
  ];

  return (
    <article className="max-w-3xl mx-auto py-10 md:py-14">
      <Head>
        <title>Contact Parsa | Full-Stack Software Engineer</title>
        <meta
          name="description"
          content="Get in touch with Parsa for web app development, software engineering, architecture inquiries, or collaboration opportunities."
        />
        <link rel="canonical" href="https://parsany.com/contact" key="canonical" />
      </Head>

      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8 group"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        <span>Back to home</span>
      </Link>

      <header className="space-y-4 mb-10 border-b border-theme-border pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-theme-text">Get in Touch</h1>
            </div>
            <p className="text-theme-secondary text-sm md:text-base">
              Have a project in mind, want to collaborate, or just want to say hi? Send me a message below.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <div className="bg-theme-cardBg border border-theme-border rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-theme-text flex items-center gap-2">
              <span>Send a Message</span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {formStatus === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-8 px-4 text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-theme-accent/10 text-theme-accent  mb-2">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-theme-text">Message Sent!</h3>
                <p className="text-sm text-theme-secondary max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been delivered safely and I will get back to you as soon as possible.
                </p>
                <div className="pt-4">
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                {formStatus === "error" && (
                  <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-theme-muted uppercase tracking-wider block">
                      Your Name <span className="text-theme-accent">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 h-4 w-4 text-theme-muted pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-theme-btnExploreBg border border-theme-border rounded-lg text-theme-text text-sm placeholder-theme-muted/50 dark:placeholder-white/40  outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-theme-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-theme-muted uppercase tracking-wider block">
                      Email Address <span className="text-theme-accent">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 h-4 w-4 text-theme-muted pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-theme-btnExploreBg border border-theme-border rounded-lg text-theme-text text-sm placeholder-theme-muted/50 dark:placeholder-white/40  outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-theme-accent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-theme-muted uppercase tracking-wider block">
                    Subject
                  </label>
                  <div className="relative flex items-center">
                    <Tag className="absolute left-3 h-4 w-4 text-theme-muted pointer-events-none" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Opportunity / Question..."
                      className="w-full pl-9 pr-3.5 py-2.5 bg-theme-btnExploreBg border border-theme-border rounded-lg text-theme-text text-sm placeholder-theme-muted/50 dark:placeholder-white/40  outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-theme-accent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-theme-muted uppercase tracking-wider block">
                      Message <span className="text-theme-accent">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-theme-muted">
                      {formData.message.length} chars
                    </span>
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-theme-muted pointer-events-none" />
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, goals, timeline, or whatever you'd like to talk about..."
                      className="w-full pl-9 pr-3.5 py-2.5 bg-theme-btnExploreBg border border-theme-border rounded-lg text-theme-text text-sm placeholder-theme-muted/50 dark:placeholder-white/40  outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-theme-accent transition-all resize-y min-h-[120px]"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-semibold text-sm transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group select-none"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-theme-cardBg border border-theme-border space-y-3">
            <h3 className="text-xs font-mono text-theme-muted uppercase tracking-wider">
              Direct Contact
            </h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-theme-btnExploreBg border border-theme-border">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="p-2 rounded bg-theme-bg border border-theme-border text-theme-secondary shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-theme-muted uppercase">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs font-mono text-theme-text hover:text-theme-accent transition-colors truncate block"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded hover:bg-theme-bg text-theme-muted hover:text-theme-text transition-colors shrink-0"
                title="Copy email address"
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
                      <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
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
            </div>
          </div>

          <div className="p-5 rounded-xl bg-theme-cardBg border border-theme-border space-y-3">
            <h3 className="text-xs font-mono text-theme-muted uppercase tracking-wider">
              other ways
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-lg bg-theme-btnExploreBg border border-theme-border hover:border-theme-accent/60 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded bg-theme-bg border border-theme-border text-theme-secondary group-hover:text-theme-accent transition-colors">
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-theme-text group-hover:text-theme-accent transition-colors">
                        {s.name}
                      </p>
                      <p className="text-[10px] font-mono text-theme-muted">{s.username}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link href="/about" className="hover:text-theme-text transition-colors">
          About
        </Link>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-theme-text transition-colors">
          Resume
        </a>
      </footer>
    </article>
  );
}
