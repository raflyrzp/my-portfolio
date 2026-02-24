"use client";

import { motion } from "framer-motion";
import type { Bio } from "@/types";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { socialIcons } from "@/components/ui/SocialIcons";

export default function Hero({ bio }: { bio: Bio }) {
  const t = useTranslations("hero");
  const locale = useLocale() as "en" | "id";

  return (
    <section className="relative min-h-screen overflow-x-clip flex items-center">
      <div
        className="absolute top-20 right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-[var(--color-primary)]/10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-32 left-[5%] w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[#d946ef]/8 to-transparent rotate-12"
        aria-hidden="true"
      />

      <div className="container-pad pt-28 md:pt-32 pb-20 md:pb-28 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(79,70,229,0.08)] border border-[rgba(79,70,229,0.15)] text-sm text-[var(--color-primary)] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              {t("available")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="title-hero mb-6"
            >
              {t("greeting")}{" "}
              <span className="text-gradient">{bio.name.split(" ")[0]}</span>
              <br />
              <span className="text-[var(--text-secondary)]">{bio.role}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8"
            >
              {bio.headline[locale] || bio.headline.en}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a href="#projects" className="btn">
                {t("viewProjects")}
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
              </a>
              <a href="#contact" className="btn-outline btn">
                {t("contactMe")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              {bio.socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-300"
                  aria-label={social.label}
                >
                  {socialIcons[social.icon || social.label.toLowerCase()] || (
                    <span className="text-sm">{social.label[0]}</span>
                  )}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative px-6 sm:px-8 md:px-10 py-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5] via-[#d946ef] to-[#06b6d4] rounded-3xl blur-3xl opacity-15 scale-110" />

              <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] mx-auto">
                <div className="absolute -inset-4 rounded-3xl border-2 border-dashed border-[var(--color-primary)]/15 animate-[spin_30s_linear_infinite]" />

                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-[var(--bg-tertiary)]">
                  <Image
                    src={bio.photo}
                    alt={bio.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-slate-900/30 via-transparent to-transparent" />
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute right-0 -top-2 sm:right-0 sm:top-4 md:-right-6 md:top-8 lg:-right-8 lg:top-12 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg translate-x-4 sm:translate-x-6 md:translate-x-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#22c55e]" />
                    <span className="text-xs sm:text-sm font-medium">
                      {t("openToWork")}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute left-0 -bottom-2 sm:left-0 sm:bottom-4 md:-left-6 md:bottom-8 lg:-left-8 lg:bottom-12 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg -translate-x-4 sm:-translate-x-6 md:translate-x-0"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🚀</span>
                    <div>
                      <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">
                        {t("basedIn")}
                      </p>
                      <p className="text-xs sm:text-sm font-medium">
                        {bio.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
