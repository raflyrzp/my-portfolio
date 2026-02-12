"use client";

import { motion } from "framer-motion";
import type { Bio } from "@/types";
import { useTranslations, useLocale } from "next-intl";
import { socialIcons } from "@/components/ui/SocialIcons";

interface AboutProps {
  bio: Bio;
  projectCount: number;
  certificateCount: number;
}

export default function About({
  bio,
  projectCount,
  certificateCount,
}: AboutProps) {
  const t = useTranslations("about");
  const locale = useLocale() as "en" | "id";
  const aboutText = bio.about
    ? bio.about[locale] || bio.about.en
    : t("description");

  const stats = [
    { label: t("yearsExperience"), value: "2+" },
    { label: t("projectsCompleted"), value: `${projectCount}+` },
    { label: t("certificates"), value: `${certificateCount}+` },
  ];

  return (
    <section id="about" className="container-pad section-pad">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="title-lg mb-6">
            {t("title")} <span className="text-gradient">{t("me")}</span>
          </h2>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            {aboutText}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm"
              >
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[var(--text-muted)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <p className="text-sm text-[var(--text-muted)] mb-3">
              {t("connectWithMe")}
            </p>
            <div className="flex flex-wrap gap-3">
              {bio.socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all text-sm"
                >
                  {socialIcons[social.icon || social.label.toLowerCase()]}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative">
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                <span className="ml-3 text-xs text-[var(--text-muted)]">
                  about.tsx
                </span>
              </div>

              <pre className="text-xs md:text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#7c3aed]">const</span>{" "}
                  <span className="text-[#2563eb]">developer</span>{" "}
                  <span className="text-slate-700">=</span> {"{"}
                  {"\n"}
                  {"  "}
                  <span className="text-[#059669]">name</span>:{" "}
                  <span className="text-[#059669]">&quot;{bio.name}&quot;</span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-[#059669]">role</span>:{" "}
                  <span className="text-[#059669]">&quot;{bio.role}&quot;</span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-[#059669]">location</span>:{" "}
                  <span className="text-[#059669]">
                    &quot;{bio.location}&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-[#059669]">skills</span>: [
                  <span className="text-[#059669]">
                    &quot;Laravel&quot;, &quot;Node.js&quot;, ...
                  </span>
                  ],{"\n"}
                  {"  "}
                  <span className="text-[#059669]">passion</span>:{" "}
                  <span className="text-[#059669]">
                    &quot;Building great software&quot;
                  </span>
                  {"\n"}
                  {"}"};
                </code>
              </pre>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4f46e5]/10 to-transparent -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d946ef]/10 to-transparent -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
