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
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6366f1] via-[#ec4899] to-[#06b6d4]" />

      {/* Experience Items */}
      <div className="space-y-12">
        {items.map((exp, i) => {
          // Get description based on current locale
          const description = exp.description[locale] || exp.description.en;

          return (
            <motion.div
              key={exp.company + exp.role + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#6366f1] to-[#ec4899] shadow-lg shadow-[#6366f1]/30 z-10">
                <div className="absolute inset-1 rounded-full bg-[var(--bg-primary)]" />
              </div>

              {/* Date (Mobile: inline, Desktop: side) */}
              <div
                className={`md:w-1/2 ${
                  i % 2 === 0 ? "md:text-left md:pr-12" : "md:text-right md:pl-12"
                } pl-10 md:pl-0`}
              >
                <div className="inline-flex items-center gap-3 mb-2 md:mb-0">
                  {exp.type && <span className="tag text-xs">{exp.type}</span>}
                  <span className="text-sm text-[#818cf8] font-medium">
                    {exp.start} — {exp.end}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className={`md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                } pl-10 md:pl-0`}
              >
                <div className="card p-6 group hover:border-[#6366f1]/30">
                  {/* Header */}
                  <h3 className="text-xl font-bold group-hover:text-[#818cf8] transition-colors mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-[#818cf8] font-medium mb-4">{exp.company}</p>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
                    {description}
                  </p>

                  {/* Skills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-3 py-1.5 rounded-full bg-[rgba(99,102,241,0.1)] text-[#a5b4fc] border border-[rgba(99,102,241,0.2)]"
                        >
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
