"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { useTranslations, useLocale } from "next-intl";

interface ProjectsProps {
  items: Project[];
  showViewAll?: boolean;
}

export default function Projects({ items, showViewAll = true }: ProjectsProps) {
  const t = useTranslations("projects");

  if (!items || items.length === 0) return null;

  return (
    <section id="projects" className="container-pad section-pad">
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="title-lg">
            {t("featured")} <span className="text-gradient">{t("title")}</span>
          </h2>
          <p className="muted mt-2">{t("subtitle")}</p>
        </motion.div>

        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/projects" className="view-all">
              {t("viewAll")}
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>

      <div className="space-y-16 md:space-y-24">
        {items.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("projects");
  const locale = useLocale() as "en" | "id";
  const isEven = index % 2 === 0;
  const description = project.description[locale] || project.description.en;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? "" : "lg:direction-rtl"}`}
    >
      <div className={`lg:col-span-7 ${isEven ? "" : "lg:order-2"}`}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5]/10 via-transparent to-[#d946ef]/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative aspect-video rounded-2xl overflow-hidden bg-[var(--bg-tertiary)] border border-slate-200 group-hover:border-[var(--color-primary)]/20 transition-all duration-500">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
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
                      className="btn-ghost btn text-sm"
                    >
                      {t("sourceCode")}
                    </a>
                  ) : (
                    project.repo.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost btn text-sm"
                      >
                        {r.label}
                      </a>
                    ))
                  )}
                </>
              )}
            </div>
          </div>

          <div
            className={`absolute -z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#4f46e5]/10 to-[#d946ef]/10 ${isEven ? "-bottom-4 -right-4" : "-bottom-4 -left-4"}`}
          />
        </div>
      </div>

      <div
        className={`lg:col-span-5 ${isEven ? "" : "lg:order-1 lg:text-right"}`}
      >
        <div
          className={`flex items-center gap-3 mb-3 ${isEven ? "" : "lg:justify-end"}`}
        >
          <span className="text-sm text-[var(--color-primary)]">
            {project.year}
          </span>
          {project.featured && (
            <span className="tag text-xs">⭐ {t("featured")}</span>
          )}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          {description}
        </p>

        <div
          className={`flex flex-wrap gap-2 mb-6 ${isEven ? "" : "lg:justify-end"}`}
        >
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`flex gap-4 ${isEven ? "" : "lg:justify-end"} hide-mobile`}
        >
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-sm"
            >
              {t("viewProject")}
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
                  </a>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
