"use client";

import PageHeader from "@/components/PageHeader";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Footer from "@/components/Footer";
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
