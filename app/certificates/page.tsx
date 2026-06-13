import { getCertificates, getBiodata } from "@/lib/getData";
import type { Metadata } from "next";
import CertificatesPageClient from "./CertificatesPageClient";

export const metadata: Metadata = {
  title: "Certificates | Rafly Rabbany Z.P.",
  description:
    "Professional certifications and achievements in software development.",
};

export default async function CertificatesPage() {
  const [certificates, bio] = await Promise.all([
    getCertificates(),
    getBiodata(),
  ]);

  return <CertificatesPageClient certificates={certificates} bio={bio} />;
}
