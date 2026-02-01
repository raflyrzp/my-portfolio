import { getExperiences, getBiodata } from "@/lib/getData";
import type { Metadata } from "next";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata: Metadata = {
  title: "Experience | Rafly Rabbany Z.P.",
  description:
    "My professional journey and work experience as a Backend Developer.",
};

export default async function ExperiencePage() {
  const [experiences, bio] = await Promise.all([
    getExperiences(),
    getBiodata(),
  ]);

  return <ExperiencePageClient experiences={experiences} bio={bio} />;
}
