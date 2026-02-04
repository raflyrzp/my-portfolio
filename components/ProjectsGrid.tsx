"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { useLocale } from "next-intl";

interface ProjectsGridProps {
  items: Project[];
}

export default function ProjectsGrid({ items }: ProjectsGridProps) {
  const locale = useLocale() as "en" | "id";

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--text-muted)]">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {items.map((project, i) => {
        // Get description based on current locale
        const description =
          project.description[locale] || project.description.en;

        return (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group card overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--bg-tertiary)] mb-5 -mx-1.5 -mt-1.5">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Year Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-sm text-xs font-medium">
                {project.year}
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#6366f1] text-xs font-semibold">
                  ⭐ Featured
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-xs px-3 py-2"
                  >
                    Live Demo
                  </a>
                )}
                {project.repo && (
                  <>
                    {typeof project.repo === "string" ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost btn text-xs px-3 py-2"
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
                          className="btn-ghost btn text-xs px-3 py-2"
                        >
                          {r.label}
                        </a>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#818cf8] transition-colors">
                {project.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
                {description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tag text-xs">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
