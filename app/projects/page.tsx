import { getProjects, getBiodata } from "@/lib/getData";
import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects | Rafly Rabbany Z.P.",
  description:
    "Explore my portfolio of projects - web applications, APIs, and more.",
};

export default async function ProjectsPage() {
  const [projects, bio] = await Promise.all([getProjects(), getBiodata()]);

  return <ProjectsPageClient projects={projects} bio={bio} />;
}
