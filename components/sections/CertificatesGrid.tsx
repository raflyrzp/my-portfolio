"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Certificate, CertificateFileType } from "@/types";
import CertificateViewer from "@/components/ui/CertificateViewer";
import CertificateDetailModal from "@/components/ui/CertificateDetailModal";

interface CertificatesGridProps {
  items: Certificate[];
}

export default function CertificatesGrid({ items }: CertificatesGridProps) {
  const [filter, setFilter] = useState<string>("all");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<{
    file: string;
    fileType: CertificateFileType;
    title: string;
  } | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailCert, setDetailCert] = useState<Certificate | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--text-muted)]">No certificates found.</p>
      </div>
    );
  }

  const issuers = ["all", ...new Set(items.map((c) => c.issuer))];
  const filteredItems =
    filter === "all" ? items : items.filter((c) => c.issuer === filter);

  const handleCertificateClick = (e: React.MouseEvent, cert: Certificate) => {
    e.preventDefault();
    setDetailCert(cert);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setDetailCert(null);
  };

  const handleViewImage = (certData: {
    file: string;
    fileType: CertificateFileType;
    title: string;
  }) => {
    closeDetailModal();
    setSelectedCert(certData);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setSelectedCert(null);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {issuers.map((issuer) => (
          <button
            key={issuer}
            onClick={() => setFilter(issuer)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === issuer
                ? "bg-gradient-to-r from-[#4f46e5] to-[#d946ef] text-white shadow-md"
                : "bg-white text-[var(--text-secondary)] border border-slate-200 hover:text-[var(--text-primary)] hover:border-[var(--color-primary)]/30"
            }`}
          >
            {issuer === "all" ? "All" : issuer}
          </button>
        ))}
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((cert, i) => (
          <motion.a
            key={cert.title + i}
            href={cert.file ? "#" : cert.url || "#"}
            target={!cert.file && cert.url ? "_blank" : undefined}
            rel={!cert.file && cert.url ? "noopener noreferrer" : undefined}
            onClick={(e) => handleCertificateClick(e, cert)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.1, duration: 0.5 }}
            layout
            className="group card overflow-hidden relative cursor-pointer"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--bg-tertiary)] mb-4 -mx-1.5 -mt-1.5">
              {cert.file ? (
                <Image
                  src={cert.file}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : cert.thumbnail ? (
                <Image
                  src={cert.thumbnail}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4f46e5]/10 to-[#d946ef]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
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
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

              {cert.featured && (
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-semibold">
                  Featured
                </div>
              )}

              {cert.file && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
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
                    View Certificate
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                {cert.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-2">
                <span className="text-[var(--color-primary)]">
                  {cert.issuer}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
                <span>Issued: {cert.issued}</span>
                {cert.expires && <span>· Expires: {cert.expires}</span>}
              </div>

              {cert.credentialId && (
                <p className="text-xs text-[var(--text-muted)] mb-3 font-mono truncate">
                  ID: {cert.credentialId}
                </p>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="tag text-[10px]">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-slate-200">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
            </div>
          </motion.a>
        ))}
      </div>

      {selectedCert && (
        <CertificateViewer
          isOpen={viewerOpen}
          onClose={closeViewer}
          file={selectedCert.file}
          fileType={selectedCert.fileType}
          title={selectedCert.title}
        />
      )}

      <CertificateDetailModal
        isOpen={detailModalOpen}
        onClose={closeDetailModal}
        certificate={detailCert}
        onViewImage={handleViewImage}
      />
    </div>
  );
}
