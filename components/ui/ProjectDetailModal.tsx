"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";
import { useLocale, useTranslations } from "next-intl";

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectDetailModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailModalProps) {
  const locale = useLocale() as "en" | "id";
  const t = useTranslations("projects");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  const description = project.description[locale] || project.description.en;

  const detailSections = [
    {
      key: "problem" as const,
      label: t("problem"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      color: "text-red-500 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/30",
      content: project.problem?.[locale] || project.problem?.en,
    },
    {
      key: "planning" as const,
      label: t("planning"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      content: project.planning?.[locale] || project.planning?.en,
    },
    {
      key: "architecture" as const,
      label: t("architecture"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      content: project.architecture?.[locale] || project.architecture?.en,
    },
    {
      key: "result" as const,
      label: t("result"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      color: "text-green-500 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30",
      content: project.result?.[locale] || project.result?.en,
    },
  ].filter((s) => s.content);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with image */}
            <div className="relative w-full h-40 sm:h-56 md:h-64 flex-shrink-0 bg-[var(--bg-tertiary)]">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-lg"
                title="Close (Esc)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Title on image */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    {project.year}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6">
              {/* Overview */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  {t("overview")}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                  {description}
                </p>
              </div>

              {/* Detail Sections (Accordion) */}
              {detailSections.length > 0 && (
                <div className="mb-5 space-y-2">
                  {detailSections.map((section) => {
                    const isExpanded = expandedSection === section.key;
                    return (
                      <div
                        key={section.key}
                        className={`rounded-xl border transition-colors ${
                          isExpanded
                            ? "border-slate-200 dark:border-slate-700"
                            : "border-slate-100 dark:border-slate-800"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedSection(isExpanded ? null : section.key)
                          }
                          className="w-full flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-[var(--bg-tertiary)] rounded-xl transition-colors"
                        >
                          <span
                            className={`flex-shrink-0 w-8 h-8 rounded-lg ${section.bg} ${section.color} flex items-center justify-center`}
                          >
                            {section.icon}
                          </span>
                          <span className="flex-1 font-semibold text-sm text-[var(--text-primary)]">
                            {section.label}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`text-[var(--text-muted)] transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 sm:px-4 pb-3 sm:pb-4 pl-14 sm:pl-[60px]">
                                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                                  {section.content}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tags */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  {t("techStack")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-sm"
                  >
                    {t("liveDemo")}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
                {project.repo && (
                  <>
                    {typeof project.repo === "string" ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline btn text-sm"
                      >
                        GitHub
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    ) : (
                      project.repo.map((r, i) => (
                        <a
                          key={i}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline btn text-sm"
                        >
                          {r.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </a>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
