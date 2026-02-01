import { promises as fs } from "node:fs";
import path from "node:path";
import type { Bio, Project, Experience, Skill, Certificate } from "@/types";

const dataDir = path.join(process.cwd(), "data");

async function readJSON<T>(file: string): Promise<T> {
  try {
    const content = await fs.readFile(path.join(dataDir, file), "utf8");
    if (!content.trim()) return [] as T;
    return JSON.parse(content) as T;
  } catch {
    return [] as T;
  }
}

export const getBiodata = () => readJSON<Bio>("biodata.json");
export const getProjects = () => readJSON<Project[]>("projects.json");
export const getExperiences = () => readJSON<Experience[]>("experience.json");
export const getSkills = () => readJSON<Skill[]>("skills.json");
export const getCertificates = () =>
  readJSON<Certificate[]>("certificates.json");

// Helper functions for featured items (for homepage preview)
export const getFeaturedProjects = async (limit = 3): Promise<Project[]> => {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  return featured.length > 0
    ? featured.slice(0, limit)
    : projects.slice(0, limit);
};

export const getFeaturedCertificates = async (
  limit = 3,
): Promise<Certificate[]> => {
  const certs = await getCertificates();
  const featured = certs.filter((c) => c.featured);
  return featured.length > 0 ? featured.slice(0, limit) : certs.slice(0, limit);
};

export const getFeaturedExperiences = async (
  limit = 2,
): Promise<Experience[]> => {
  const exp = await getExperiences();
  return exp.slice(0, limit);
};
