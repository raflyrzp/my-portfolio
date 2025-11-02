"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/types";

export default function Projects({ items }: { items: Project[] }) {
  return (
    <section id="projects" className="container-pad py-24 md:py-32">
      <div className="mb-10 md:mb-16 flex items-end justify-between">
        <h2 className="title-lg">Projects</h2>
        <span className="muted text-sm">{items.length} selected</span>
      </div>

      <div className="space-y-24">
        {items.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);

  return (
    <article
      ref={ref}
      className="grid md:grid-cols-12 items-center gap-8 md:gap-12"
    >
      <div className="md:col-span-7 order-2 md:order-1">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tightest">
          {project.title}
        </h3>
        <p className="muted mt-3">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border px-3 py-1 text-xs">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          {project.link && (
            <a
              className="btn"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              Live
            </a>
          )}
          {project.repo && (
            <a
              className="btn"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </a>
          )}
        </div>
      </div>
      <motion.div
        style={{ y, scale }}
        className="md:col-span-5 order-1 md:order-2 relative"
      >
        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-white shadow-xl">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute -left-6 -top-6 size-16 rounded-full border-8 border-accent/90 -z-10" />
      </motion.div>
    </article>
  );
}
