"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface PageHeaderProps {
  titleKey: string;
  descriptionKey: string;
  count?: number;
  countLabelKey?: string;
}

export default function PageHeader({
  titleKey,
  descriptionKey,
  count,
  countLabelKey,
}: PageHeaderProps) {
  const t = useTranslations("pages");
  const tNav = useTranslations("nav");

  const title = t(titleKey);
  const description = t(descriptionKey);
  const countLabel = countLabelKey ? t(countLabelKey) : undefined;

  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-20 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#ec4899]/10 rounded-full blur-3xl" />
      </div>

      <div className="container-pad relative">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
        >
          <Link href="/" className="hover:text-white transition-colors">
            {t("home")}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="text-white">{title}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="title-xl mb-4"
        >
          <span className="text-gradient">{title}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-secondary)] max-w-2xl mb-6"
        >
          {description}
        </motion.p>

        {/* Count Badge */}
        {count !== undefined && countLabel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] text-sm text-[#818cf8]">
              <span className="font-semibold">{count}</span> {countLabel}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
