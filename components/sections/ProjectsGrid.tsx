"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/types";
import { useLocale } from "next-intl";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";

interface ProjectsGridProps {
  items: Project[];
}

export default function ProjectsGrid({ items }: ProjectsGridProps) {
  const locale = useLocale() as "en" | "id";
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--text-muted)]">No projects found.</p>
      </div>
    );
  }

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {items.map((project, i) => {
          const description =
            project.description[locale] || project.description.en;

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group card overflow-hidden cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--bg-tertiary)] mb-5 -mx-1.5 -mt-1.5">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-xs font-medium text-[var(--text-primary)]">
                  {project.year}
                </div>

                {project.featured && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold">
                    ⭐ Featured
                  </div>
                )}

                {/* View detail overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Details
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
                  {description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag text-xs">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-slate-200 dark:border-slate-700">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <ProjectDetailModal
        isOpen={modalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </>
  );
}
