"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/types";
import { useLocale } from "next-intl";

interface ExperienceTimelineProps {
  items: Experience[];
}

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const locale = useLocale() as "en" | "id";

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--text-muted)]">No experience found.</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4f46e5] via-[#d946ef] to-[#06b6d4]" />

      <div className="space-y-12">
        {items.map((exp, i) => {
          const description = exp.description[locale] || exp.description.en;

          return (
            <motion.div
              key={exp.company + exp.role + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#d946ef] shadow-lg shadow-[#4f46e5]/20 z-10">
                <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900" />
              </div>

              <div
                className={`md:w-1/2 ${i % 2 === 0 ? "md:text-left md:pr-12" : "md:text-right md:pl-12"} pl-10 md:pl-0`}
              >
                <div className="inline-flex items-center gap-3 mb-2 md:mb-0">
                  {exp.type && <span className="tag text-xs">{exp.type}</span>}
                  <span className="text-sm text-[var(--color-primary)] font-medium">
                    {exp.start} — {exp.end}
                  </span>
                </div>
              </div>

              <div
                className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-10 md:pl-0`}
              >
                <div className="card p-6 group hover:border-[var(--color-primary)]/20">
                  <h3 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-[var(--color-primary)] font-medium mb-4">
                    {exp.company}
                  </p>

                  <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
                    {description}
                  </p>

                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="tag text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
