"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { CertificateFileType } from "@/types";

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  file: string;
  fileType: CertificateFileType;
  title: string;
}

export default function CertificateViewer({
  isOpen,
  onClose,
  file,
  fileType,
  title,
}: CertificateViewerProps) {
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
            className="relative w-full sm:max-w-5xl max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-semibold text-lg truncate pr-4">{title}</h3>
              <div className="flex items-center gap-2">
                <a
                  href={file}
                  download={`${title}.${fileType}`}
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  title="Download"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-md"
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
              </div>
            </div>

            <div className="overflow-auto max-h-[calc(92vh-80px)] sm:max-h-[calc(90vh-80px)]">
              <div className="relative w-full min-h-[250px] sm:min-h-[400px] flex items-center justify-center p-2 sm:p-4">
                <Image
                  src={file}
                  alt={title}
                  width={1200}
                  height={800}
                  className="object-contain max-w-full h-auto rounded-lg"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
