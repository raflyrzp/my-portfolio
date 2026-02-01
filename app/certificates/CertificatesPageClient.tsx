"use client";

import PageHeader from "@/components/PageHeader";
import CertificatesGrid from "@/components/CertificatesGrid";
import Footer from "@/components/Footer";
import type { Certificate, Bio } from "@/types";

interface CertificatesPageClientProps {
  certificates: Certificate[];
  bio: Bio;
}

export default function CertificatesPageClient({
  certificates,
  bio,
}: CertificatesPageClientProps) {
  return (
    <main>
      <PageHeader
        titleKey="licensesAndCertificates"
        descriptionKey="licensesAndCertificatesDesc"
        count={certificates.length}
        countLabelKey="certificates"
      />
      <section className="container-pad section-pad">
        <CertificatesGrid items={certificates} />
      </section>
      <Footer bio={bio} />
    </main>
  );
}
