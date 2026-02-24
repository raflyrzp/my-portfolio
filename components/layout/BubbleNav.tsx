"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslations } from "next-intl";

export default function BubbleNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, isPending } = useLanguage();
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/", label: t("home"), icon: "home" },
    { href: "/projects", label: t("projects"), icon: "code" },
    { href: "/experience", label: t("experience"), icon: "briefcase" },
    { href: "/certificates", label: t("certificates"), icon: "award" },
    { href: "/#contact", label: t("contact"), icon: "mail" },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const NavIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
      case "home":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case "code":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
          </svg>
        );
      case "briefcase":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case "award":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        );
      case "mail":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container-pad pt-4 md:pt-5 w-full">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={clsx(
            "pointer-events-auto relative rounded-2xl transition-all duration-500",
            "bg-white/80 backdrop-blur-xl",
            "border border-white/60",
            scrolled
              ? "shadow-lg shadow-slate-900/10 bg-white/90"
              : "shadow-md shadow-slate-200/50",
          )}
        >
          {/* Gradient glow line */}
          <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#4f46e5]/40 to-transparent rounded-full" />
          <div
            className={clsx(
              "absolute -bottom-[1px] left-8 right-8 h-[3px] rounded-full blur-sm transition-opacity duration-500",
              "bg-gradient-to-r from-transparent via-[#4f46e5]/30 to-transparent",
              scrolled ? "opacity-100" : "opacity-50",
            )}
          />

          <div className="flex items-center justify-between px-4 md:px-5 py-2.5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center shadow-md shadow-[#4f46e5]/20 group-hover:shadow-lg group-hover:shadow-[#4f46e5]/30 transition-all duration-300">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-gradient font-bold text-base tracking-tight hidden sm:inline">
                raflyrzp
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1 bg-[var(--bg-secondary)]/60 rounded-xl p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive(link.href)
                      ? "text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/80",
                  )}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] rounded-lg shadow-md shadow-[#4f46e5]/25"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    <NavIcon icon={link.icon} />
                  </span>
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right section */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setLocale(locale === "en" ? "id" : "en")}
                disabled={isPending}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium",
                  "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  "hover:bg-[var(--bg-secondary)]/60",
                  "transition-all duration-300",
                  isPending && "opacity-70",
                )}
              >
                <span className="text-base">
                  {locale === "en" ? "🇺🇸" : "🇮🇩"}
                </span>
                <span className="text-xs">{locale === "en" ? "EN" : "ID"}</span>
              </button>

              <div className="w-px h-5 bg-slate-200" />

              <a
                href="mailto:raflyrabbany0804@gmail.com"
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold",
                  "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed]",
                  "text-white shadow-md shadow-[#4f46e5]/20",
                  "hover:shadow-lg hover:shadow-[#4f46e5]/30 hover:brightness-110",
                  "transition-all duration-300",
                )}
              >
                {t("letsTalk")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={clsx(
                "md:hidden flex items-center justify-center w-10 h-10 rounded-lg",
                "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/60",
                "transition-all duration-300",
              )}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4">
                <span
                  className={clsx(
                    "absolute left-0 w-5 h-0.5 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 top-1.5 w-5 h-0.5 bg-current transition-all duration-300",
                    isMobileMenuOpen && "opacity-0",
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 w-5 h-0.5 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-slate-100/80">
                  <div className="flex flex-col gap-1 pt-3">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive(link.href)
                              ? "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white shadow-md shadow-[#4f46e5]/20"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/60",
                          )}
                        >
                          <NavIcon icon={link.icon} />
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}

                    <div className="h-px bg-slate-100 my-2" />

                    <button
                      onClick={() => setLocale(locale === "en" ? "id" : "en")}
                      disabled={isPending}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/60 transition-all duration-200"
                    >
                      <span className="text-lg">
                        {locale === "en" ? "🇺🇸" : "🇮🇩"}
                      </span>
                      <span>{locale === "en" ? "English" : "Indonesia"}</span>
                    </button>

                    <a
                      href="mailto:raflyrabbany0804@gmail.com"
                      className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white text-sm font-semibold shadow-md shadow-[#4f46e5]/20"
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
        </motion.nav>
      </div>
    </header>
  );
}
