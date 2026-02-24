"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Certificate, CertificateFileType } from "@/types";

interface CertificateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
  onViewImage?: (cert: {
    file: string;
    fileType: CertificateFileType;
    title: string;
  }) => void;
}

export default function CertificateDetailModal({
  isOpen,
  onClose,
  certificate,
  onViewImage,
}: CertificateDetailModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-2 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>

            {/* Header with image */}
            <div className="relative w-full h-40 sm:h-56 md:h-64 flex-shrink-0 bg-[var(--bg-tertiary)]">
              {certificate.file ? (
                <Image
                  src={certificate.file}
                  alt={certificate.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : certificate.thumbnail ? (
                <Image
                  src={certificate.thumbnail}
                  alt={certificate.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4f46e5]/10 to-[#d946ef]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-[var(--color-primary)]/40"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
                title="Close (Esc)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {certificate.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold">
                  Featured
                </div>
              )}

              {/* Title on image */}
              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {certificate.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6">
              {/* Issuer & Date info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--color-primary)]">
                    {certificate.issuer}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
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
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Issued: {certificate.issued}</span>
                </div>
                {certificate.expires && (
                  <span className="text-sm text-[var(--text-muted)]">
                    · Expires: {certificate.expires}
                  </span>
                )}
              </div>

              {/* Credential ID */}
              {certificate.credentialId && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Credential ID
                  </h3>
                  <p className="text-sm font-mono text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-3 py-2 rounded-lg">
                    {certificate.credentialId}
                  </p>
                </div>
              )}

              {/* Skills */}
              {certificate.skills && certificate.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill) => (
                      <span key={skill} className="tag text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                {certificate.file && certificate.fileType && onViewImage && (
                  <button
                    onClick={() =>
                      onViewImage({
                        file: certificate.file!,
                        fileType: certificate.fileType!,
                        title: certificate.title,
                      })
                    }
                    className="btn text-sm"
                  >
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
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Full Image
                  </button>
                )}
                {certificate.url && (
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline btn text-sm"
                  >
                    Verify Certificate
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
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
