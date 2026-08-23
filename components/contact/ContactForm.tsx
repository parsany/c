"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="bg-theme-btnExploreBg border border-theme-border rounded-lg p-6 md:p-8">
      <h2 className="text-xs font-mono font-bold text-theme-text mb-6 uppercase tracking-wider">
        Send a Message
      </h2>

      <AnimatePresence mode="wait">
        {formStatus === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-10 px-4 text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-theme-accent/10 text-theme-accent">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-theme-text">Message Sent</h3>
            <p className="text-xs text-theme-secondary max-w-sm mx-auto font-mono">
              Thank you. Your message has been sent successfully and I will respond shortly.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setFormStatus("idle")}
                className="text-xs font-mono text-theme-muted hover:text-theme-accent underline transition-colors"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            {formStatus === "error" && (
              <div className="p-3 rounded bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
                  Name <span className="text-theme-accent">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2 bg-theme-bg border border-theme-border rounded text-theme-text text-xs placeholder:text-theme-muted/50 focus:outline-none focus:border-theme-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
                  Email <span className="text-theme-accent">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2 bg-theme-bg border border-theme-border rounded text-theme-text text-xs placeholder:text-theme-muted/50 focus:outline-none focus:border-theme-accent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry, collaboration, etc."
                className="w-full px-3.5 py-2 bg-theme-bg border border-theme-border rounded text-theme-text text-xs placeholder:text-theme-muted/50 focus:outline-none focus:border-theme-accent transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
                  Message <span className="text-theme-accent">*</span>
                </label>
                <span className="text-[10px] font-mono text-theme-muted">
                  {formData.message.length} chars
                </span>
              </div>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, timeline, or inquiry..."
                className="w-full px-3.5 py-2 bg-theme-bg border border-theme-border rounded text-theme-text text-xs placeholder:text-theme-muted/50 focus:outline-none focus:border-theme-accent transition-colors resize-y min-h-[120px]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-mono font-semibold text-xs transition-all shadow-xs disabled:opacity-70 disabled:cursor-not-allowed group select-none mt-2"
            >
              {formStatus === "submitting" ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
