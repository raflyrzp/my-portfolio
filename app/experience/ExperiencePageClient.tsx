"use client";

import PageHeader from "@/components/ui/PageHeader";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Footer from "@/components/layout/Footer";
import type { Experience, Bio } from "@/types";

interface ExperiencePageClientProps {
  experiences: Experience[];
  bio: Bio;
}

export default function ExperiencePageClient({
  experiences,
  bio,
}: ExperiencePageClientProps) {
  return (
    <main>
      <PageHeader
        titleKey="workExperience"
        descriptionKey="workExperienceDesc"
        count={experiences.length}
        countLabelKey="positions"
      />
      <section className="container-pad section-pad">
        <ExperienceTimeline items={experiences} />
      </section>
      <Footer bio={bio} />
    </main>
  );
}
