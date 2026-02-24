"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Experience as ExpType } from "@/types";
import { useTranslations, useLocale } from "next-intl";

interface ExperienceProps {
  items: ExpType[];
  showViewAll?: boolean;
}

export default function Experience({
  items,
  showViewAll = true,
}: ExperienceProps) {
  const t = useTranslations("experience");
  const locale = useLocale() as "en" | "id";

  if (!items || items.length === 0) return null;

  return (
    <section id="experience" className="container-pad section-pad">
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="title-lg">
            {t("work")} <span className="text-gradient">{t("title")}</span>
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
            <Link href="/experience" className="view-all">
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

      <div className="relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)]/40 via-[#d946ef]/40 to-transparent" />

        <div className="space-y-8">
          {items.map((exp, i) => {
            const description = exp.description[locale] || exp.description.en;

            return (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-12 md:pl-20"
              >
                <div className="absolute left-2 md:left-6 top-2 w-4 h-4 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#d946ef] shadow-lg shadow-[#4f46e5]/20">
                  <div className="absolute inset-1 rounded-full bg-white" />
                </div>

                <div className="card group hover:border-[var(--color-primary)]/20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-[var(--color-primary)] font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      {exp.type && (
                        <span className="tag text-xs">{exp.type}</span>
                      )}
                      <span className="text-[var(--text-muted)]">
                        {exp.start} — {exp.end}
                      </span>
                    </div>
                  </div>

                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
