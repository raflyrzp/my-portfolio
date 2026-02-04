"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
      {/* Section Header */}
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

      {/* Projects Grid */}
      <div className="space-y-16 md:space-y-24">
        {items.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations("projects");
  const locale = useLocale() as "en" | "id";
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6],
  );

  const isEven = index % 2 === 0;

  // Get description based on current locale
  const description = project.description[locale] || project.description.en;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        isEven ? "" : "lg:direction-rtl"
      }`}
    >
      {/* Image */}
      <motion.div
        style={{ y, scale, opacity }}
        className={`lg:col-span-7 ${isEven ? "" : "lg:order-2"}`}
      >
        <div className="relative group">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-transparent to-[#ec4899]/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Image Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-[var(--bg-tertiary)] border border-white/5 group-hover:border-[#6366f1]/30 transition-all duration-500">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quick Actions */}
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

          {/* Decorative Element */}
          <div
            className={`absolute -z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#ec4899]/20 ${
              isEven ? "-bottom-4 -right-4" : "-bottom-4 -left-4"
            }`}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div
        className={`lg:col-span-5 ${isEven ? "" : "lg:order-1 lg:text-right"}`}
      >
        <div
          className={`flex items-center gap-3 mb-3 ${
            isEven ? "" : "lg:justify-end"
          }`}
        >
          <span className="text-sm text-[#818cf8]">{project.year}</span>
          {project.featured && (
            <span className="tag text-xs">⭐ {t("featured")}</span>
          )}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          {description}
        </p>

        {/* Tags */}
        <div
          className={`flex flex-wrap gap-2 mb-6 ${
            isEven ? "" : "lg:justify-end"
          }`}
        >
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
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
