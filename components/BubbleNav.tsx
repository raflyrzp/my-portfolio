"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslations } from "next-intl";

export default function BubbleNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, isPending } = useLanguage();
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/experience", label: t("experience") },
    { href: "/certificates", label: t("certificates") },
    { href: "/#contact", label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container-pad pt-4 md:pt-6">
        <nav className="flex items-center justify-between">
          {/* Logo Bubble */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-auto"
          >
            <Link
              href="/"
              className={clsx(
                "inline-flex items-center px-4 py-2.5 rounded-full",
                "bg-[rgba(0,0,0,0.8)] backdrop-blur-xl",
                "border border-white/20",
                "shadow-lg shadow-black/20",
                "hover:border-[#6366f1]/50 hover:shadow-[#6366f1]/20",
                "transition-all duration-300",
              )}
            >
              <span className="text-gradient font-bold text-base md:text-lg tracking-tight">
                raflyrzp
              </span>
            </Link>
          </motion.div>

          {/* Navigation Bubbles - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-2 lg:gap-3 pointer-events-auto"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={clsx(
                    "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
                    "transition-all duration-300",
                    isActive(link.href)
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg shadow-[#6366f1]/30"
                      : [
                          "bg-[rgba(0,0,0,0.8)] backdrop-blur-xl",
                          "border border-white/20",
                          "text-white/90 hover:text-white",
                          "hover:border-[#6366f1]/50 hover:bg-[rgba(99,102,241,0.15)]",
                          "shadow-lg shadow-black/20",
                        ],
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Language Toggle & CTA */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-3 pointer-events-auto"
          >
            {/* Language Toggle */}
            <button
              onClick={() => setLocale(locale === "en" ? "id" : "en")}
              disabled={isPending}
              className={clsx(
                "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium",
                "bg-[rgba(0,0,0,0.8)] backdrop-blur-xl",
                "border border-white/20",
                "text-white/90 hover:text-white",
                "hover:border-[#6366f1]/50 hover:bg-[rgba(99,102,241,0.15)]",
                "shadow-lg shadow-black/20",
                "transition-all duration-300",
                isPending && "opacity-70",
              )}
            >
              <span className="text-base">{locale === "en" ? "🇺🇸" : "🇮🇩"}</span>
              <span>{locale === "en" ? "EN" : "ID"}</span>
            </button>

            {/* CTA Bubble */}
            <a
              href="mailto:raflyrabbany0804@gmail.com"
              className={clsx(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold",
                "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]",
                "text-white shadow-lg shadow-[#6366f1]/30",
                "hover:shadow-xl hover:shadow-[#6366f1]/40 hover:scale-105",
                "transition-all duration-300",
              )}
            >
              {t("letsTalk")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={clsx(
              "md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full pointer-events-auto",
              "bg-[rgba(0,0,0,0.8)] backdrop-blur-xl",
              "border border-white/20",
              "shadow-lg shadow-black/20",
              "transition-all duration-300",
            )}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <span
                className={clsx(
                  "absolute left-0 w-5 h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 w-5 h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 w-5 h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </div>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 pointer-events-auto"
            >
              <div
                className={clsx(
                  "rounded-2xl p-4",
                  "bg-[rgba(0,0,0,0.9)] backdrop-blur-xl",
                  "border border-white/20",
                  "shadow-xl shadow-black/30",
                )}
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive(link.href)
                          ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
                          : "text-white/80 hover:text-white hover:bg-white/10",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="h-px bg-white/10 my-2" />

                  {/* Mobile Language Toggle */}
                  <button
                    onClick={() => setLocale(locale === "en" ? "id" : "en")}
                    disabled={isPending}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <span className="text-lg">
                      {locale === "en" ? "🇺🇸" : "🇮🇩"}
                    </span>
                    <span>{locale === "en" ? "English" : "Indonesia"}</span>
                  </button>

                  <a
                    href="mailto:raflyrabbany0804@gmail.com"
                    className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold"
                  >
                    {t("letsTalk")}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
