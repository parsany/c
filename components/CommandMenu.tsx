import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, Zap, Globe, FileText, ArrowRight } from "lucide-react";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "navigation" | "projects" | "actions";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    {
      id: "nav-projects",
      title: "Go to Selected Projects",
      subtitle: "Scroll to main projects section",
      category: "navigation",
      icon: <Folder className="h-4 w-4" />,
      action: () => {
        onClose();
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-contact",
      title: "Go to Contact Section",
      subtitle: "Scroll to get in touch details",
      category: "navigation",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "project-charbag",
      title: "Charbag Ceramic Studio Specs",
      subtitle: "View boutique studio catalog system architecture",
      category: "projects",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        router.push("/projects/charbag");
      },
    },
    {
      id: "project-msk",
      title: "Battery MSK Client Specs",
      subtitle: "View multilanguage warranty serialization spec",
      category: "projects",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        router.push("/projects/msk");
      },
    },
    {
      id: "project-esp",
      title: "Battery ESP E-Commerce Specs",
      subtitle: "View parts trading system workspace specs",
      category: "projects",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        router.push("/projects/esp");
      },
    },
    {
      id: "project-atrafian",
      title: "Atrafian Chat Ecosystem Specs",
      subtitle: "View messaging architecture & media bucket details",
      category: "projects",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        router.push("/projects/atrafian");
      },
    },
    {
      id: "project-himheh",
      title: "Himheh Publishing Specs",
      subtitle: "View order dispatcher & SMS verification flow",
      category: "projects",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        router.push("/projects/himheh");
      },
    },
    {
      id: "project-goldenbat",
      title: "Goldenbat GPS Tracking Specs",
      subtitle: "View high-frequency IoT coordinates ingest details",
      category: "projects",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        router.push("/projects/goldenbat");
      },
    },
    {
      id: "project-taxiland",
      title: "Taxiland Dispatch Specs",
      subtitle: "View passenger & driver location cache architecture",
      category: "projects",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        router.push("/projects/taxiland");
      },
    },
    {
      id: "project-alzahra",
      title: "Alzahra Gold Wholesaler Specs",
      subtitle: "View gold trading Rest API and ledger specs",
      category: "projects",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        router.push("/projects/alzahra");
      },
    },
    {
      id: "academic-cat",
      title: "Cat Emotion Recognition Repo",
      subtitle: "Open GitHub repository for CNN cat emotion ML model",
      category: "projects",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("https://github.com/parsany/CatRecognition", "_blank");
      },
    },
    {
      id: "academic-conway",
      title: "Conway Cellular Automata Invaders Repo",
      subtitle: "Open GitHub repository for space invaders game on life grids",
      category: "projects",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("https://github.com/parsany/Conway-game-of-life-invaders", "_blank");
      },
    },
    {
      id: "academic-pid",
      title: "PID Neural Network Optimizer Repo",
      subtitle: "Open GitHub repository for neural network feedback control weights",
      category: "projects",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("https://github.com/parsany/PID_NN", "_blank");
      },
    },
    {
      id: "academic-qt",
      title: "Library Program QT Repo",
      subtitle: "Open GitHub repository for PySide/QT e-book library layout manager",
      category: "projects",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("https://github.com/parsany/PyLibrary-QT", "_blank");
      },
    },
    {
      id: "academic-anomaly",
      title: "Anomaly detection for Goldmines Repo",
      subtitle: "Open GitHub repository for mineral VAE autoencoders",
      category: "projects",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("https://github.com/parsany/anomaly-VAE", "_blank");
      },
    },
    {
      id: "academic-interpreter",
      title: "Interpreter with Flex & Bison Repo",
      subtitle: "Open GitHub repository for custom syntax parsing tree interpreter",
      category: "projects",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("https://github.com/parsany/InterpreterFlexBison", "_blank");
      },
    },
    {
      id: "action-email",
      title: "Copy Email Address",
      subtitle: "quantinitycorp@gmail.com",
      category: "actions",
      icon: <Zap className="h-4 w-4" />,
      action: () => {
        onClose();
        navigator.clipboard.writeText("quantinitycorp@gmail.com");
      },
    },
    {
      id: "action-resume",
      title: "Download Resume / CV",
      subtitle: "Open CV PDF file",
      category: "actions",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("/resume.pdf", "_blank");
      },
    },
    {
      id: "action-github",
      title: "Open GitHub Profile",
      subtitle: "github.com/parsany",
      category: "actions",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("https://github.com/parsany", "_blank");
      },
    },
    {
      id: "action-linkedin",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/parsany",
      category: "actions",
      icon: <Globe className="h-4 w-4" />,
      action: () => {
        onClose();
        window.open("https://www.linkedin.com/in/parsany/", "_blank");
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch("");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === filteredCommands.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Tab") {
        const modal = containerRef.current;
        if (!modal) return;
        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'input, button, [tabindex="0"]'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Command Menu"
        >
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
          >
            <div className="flex items-center space-x-3 px-4 py-3 border-b border-slate-800/80">
              <Search className="h-5 w-5 text-slate-500" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-0 outline-none text-slate-100 text-sm placeholder-slate-500 focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="overflow-y-auto p-2 space-y-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors focus:outline-none ${isSelected
                        ? "bg-slate-800 text-slate-100"
                        : "text-slate-400 hover:bg-slate-800/40"
                        }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-1.5 rounded ${isSelected
                            ? "bg-slate-700 text-slate-100"
                            : "bg-slate-950 text-slate-500 border border-slate-800"
                            }`}
                        >
                          {cmd.icon}
                        </div>
                        <div>
                          <p className={`text-xs font-medium font-sans ${isSelected ? "text-slate-100" : "text-slate-300"}`}>
                            {cmd.title}
                          </p>
                          <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                            {cmd.subtitle}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                          <span>Select</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs font-mono">
                  No commands match your query.
                </div>
              )}
            </div>

            <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500 select-none">
              <div className="flex items-center space-x-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
              <div>
                <span>Press Cmd+K anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
