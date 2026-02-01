"use client";

import PageHeader from "@/components/PageHeader";
import ProjectsGrid from "@/components/ProjectsGrid";
import Footer from "@/components/Footer";
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
