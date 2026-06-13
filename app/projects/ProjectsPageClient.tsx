"use client";

import PageHeader from "@/components/ui/PageHeader";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Footer from "@/components/layout/Footer";
import type { Project, Bio } from "@/types";

interface ProjectsPageClientProps {
  projects: Project[];
  bio: Bio;
}

export default function ProjectsPageClient({
  projects,
  bio,
}: ProjectsPageClientProps) {
  return (
    <main>
      <PageHeader
        titleKey="allProjects"
        descriptionKey="allProjectsDesc"
        count={projects.length}
        countLabelKey="projects"
      />
      <section className="container-pad section-pad">
        <ProjectsGrid items={projects} />
      </section>
      <Footer bio={bio} />
    </main>
  );
}
