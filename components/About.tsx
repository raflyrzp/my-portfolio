"use client";

import { motion } from "framer-motion";
import type { Bio } from "@/types";
import { useTranslations, useLocale } from "next-intl";

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
};

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

  // Get about text based on current locale
  const aboutText = bio.about ? bio.about[locale] || bio.about.en : t("description");

  const stats = [
    { label: t("yearsExperience"), value: "2+" },
    { label: t("projectsCompleted"), value: `${projectCount}+` },
    { label: t("certificates"), value: `${certificateCount}+` },
  ];

  return (
    <section id="about" className="container-pad section-pad">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left - Content */}
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

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 rounded-2xl bg-[var(--bg-card)] border border-white/5"
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

          {/* Social Connect */}
          <div>
            <p className="text-sm text-[var(--text-muted)] mb-3">
              {t("connectWithMe")}
            </p>
            <div className="flex gap-3">
              {bio.socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-tertiary)] border border-white/5 text-[var(--text-secondary)] hover:text-white hover:border-[#6366f1]/50 transition-all text-sm"
                >
                  {socialIcons[social.icon || social.label.toLowerCase()]}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right - Visual Element */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative">
            {/* Code Window Decoration */}
            <div className="card overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                <span className="ml-3 text-xs text-[var(--text-muted)]">
                  about.tsx
                </span>
              </div>

              {/* Code Content */}
              <pre className="text-xs md:text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-[#c792ea]">const</span>{" "}
                  <span className="text-[#82aaff]">developer</span>{" "}
                  <span className="text-white">=</span> {"{"}
                  {"\n"}
                  {"  "}
                  <span className="text-[#c3e88d]">name</span>:{" "}
                  <span className="text-[#c3e88d]">&quot;{bio.name}&quot;</span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-[#c3e88d]">role</span>:{" "}
                  <span className="text-[#c3e88d]">&quot;{bio.role}&quot;</span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-[#c3e88d]">location</span>:{" "}
                  <span className="text-[#c3e88d]">
                    &quot;{bio.location}&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-[#c3e88d]">skills</span>: [
                  <span className="text-[#c3e88d]">
                    &quot;Laravel&quot;, &quot;Node.js&quot;, ...
                  </span>
                  ],{"\n"}
                  {"  "}
                  <span className="text-[#c3e88d]">passion</span>:{" "}
                  <span className="text-[#c3e88d]">
                    &quot;Building great software&quot;
                  </span>
                  {"\n"}
                  {"}"};
                </code>
              </pre>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-transparent -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ec4899]/20 to-transparent -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
