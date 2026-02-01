"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Bio } from "@/types";
import Image from "next/image";
import SmoothScroll from "./SmoothScroll";
import { useTranslations, useLocale } from "next-intl";

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
};

export default function Hero({ bio }: { bio: Bio }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");
  const locale = useLocale() as "en" | "id";
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), {
    stiffness: 100,
    damping: 30,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), {
    stiffness: 100,
    damping: 30,
  });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30,
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <SmoothScroll>
      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden flex items-center"
      >
        {/* Decorative Elements */}
        <motion.div
          style={{ y: y3, rotate }}
          className="absolute top-20 right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-[#6366f1]/20"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-32 left-[5%] w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[#ec4899]/10 to-transparent rotate-12"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[40%] left-[15%] w-4 h-4 rounded-full bg-[#06b6d4] animate-pulse-glow hide-mobile"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute bottom-[20%] right-[20%] w-3 h-3 rounded-full bg-[#ec4899] animate-pulse-glow hide-mobile"
          aria-hidden="true"
        />

        {/* Main Content */}
        <motion.div
          style={{ scale, opacity }}
          className="container-pad pt-28 md:pt-32 pb-20 md:pb-28 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] text-sm text-[#818cf8] mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                {t("available")}
              </motion.div>

              <motion.h1 style={{ y: y1 }} className="title-hero mb-6">
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

              {/* CTA Buttons */}
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

              {/* Social Links */}
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
                    className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] border border-white/5 text-[var(--text-secondary)] hover:text-white hover:border-[#6366f1]/50 hover:bg-[rgba(99,102,241,0.1)] transition-all duration-300"
                    aria-label={social.label}
                  >
                    {socialIcons[social.icon || social.label.toLowerCase()] || (
                      <span className="text-sm">{social.label[0]}</span>
                    )}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Image/Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ y: y2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] via-[#ec4899] to-[#06b6d4] rounded-3xl blur-3xl opacity-30 scale-110" />

                {/* Image Container */}
                <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px]">
                  {/* Animated Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-4 rounded-3xl border-2 border-dashed border-[#6366f1]/30"
                  />

                  {/* Main Image */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 bg-[var(--bg-tertiary)]">
                    <Image
                      src={bio.photo}
                      alt={bio.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Floating Cards */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-4 top-8 md:-right-8 md:top-12 px-4 py-3 rounded-xl bg-[var(--bg-card)] backdrop-blur-xl border border-white/10 shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                      <span className="text-sm font-medium">
                        {t("openToWork")}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute -left-4 bottom-8 md:-left-8 md:bottom-12 px-4 py-3 rounded-xl bg-[var(--bg-card)] backdrop-blur-xl border border-white/10 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚀</span>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">
                          {t("basedIn")}
                        </p>
                        <p className="text-sm font-medium">{bio.location}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </SmoothScroll>
  );
}
