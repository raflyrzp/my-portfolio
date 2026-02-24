"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Bio } from "@/types";
import { useTranslations } from "next-intl";
import { socialIcons } from "@/components/ui/SocialIcons";

export default function Footer({ bio }: { bio: Bio }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: tNav("home") },
    { href: "/projects", label: tNav("projects") },
    { href: "/experience", label: tNav("experience") },
    { href: "/certificates", label: tNav("certificates") },
    { href: "/#contact", label: tNav("contact") },
  ];

  return (
    <footer className="relative border-t border-slate-200 bg-[var(--bg-secondary)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-3xl" />
      </div>

      <div className="container-pad py-16 relative">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="inline-block text-2xl font-bold mb-4">
              <span className="text-gradient">raflyrzp</span>
            </Link>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs">
              {t("description")}
            </p>
            <div className="flex gap-3">
              {bio.socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-300"
                  aria-label={social.label}
                >
                  {socialIcons[social.icon || social.label.toLowerCase()] || (
                    <span className="text-sm">{social.label[0]}</span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4">{t("getInTouch")}</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              {t("projectInMind")}
            </p>
            <a
              href={`mailto:${bio.email}`}
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
            >
              {bio.email}
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
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {currentYear} {bio.name}. {t("allRights")}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            {t("builtWith")}{" "}
            <span className="relative inline-block group cursor-default">
              <span className="text-[#ec4899] group-hover:opacity-0 transition-opacity duration-300">
                ♥
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-[#ec4899] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Yaya
              </span>
            </span>{" "}
            {t("using")}
          </p>
        </div>
      </div>
    </footer>
  );
}
