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

// Parse date string like "Nov 2022", "Aug 2024", "Present" to Date object
function parseDate(dateStr: string): Date {
  if (!dateStr || dateStr.toLowerCase() === "present") {
    return new Date(); // "Present" means current date (most recent)
  }

  const months: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };

  const parts = dateStr.trim().split(" ");
  if (parts.length === 2) {
    const monthStr = parts[0].toLowerCase().slice(0, 3);
    const year = parseInt(parts[1], 10);
    const month = months[monthStr] ?? 0;
    return new Date(year, month, 1);
  }

  // If only year is provided
  if (parts.length === 1 && !isNaN(parseInt(parts[0], 10))) {
    return new Date(parseInt(parts[0], 10), 0, 1);
  }

  return new Date(0); // fallback to earliest date
}

// Sort items: featured first, then by date descending (newest first)
function sortByFeaturedAndDate<T extends { featured?: boolean }>(
  items: T[],
  getDate: (item: T) => string
): T[] {
  return [...items].sort((a, b) => {
    // Featured items come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Then sort by date descending (newest first)
    const dateA = parseDate(getDate(a));
    const dateB = parseDate(getDate(b));
    return dateB.getTime() - dateA.getTime();
  });
}

export const getBiodata = () => readJSON<Bio>("biodata.json");

export const getProjects = async (): Promise<Project[]> => {
  const projects = await readJSON<Project[]>("projects.json");
  return sortByFeaturedAndDate(projects, (p) => p.year);
};

export const getExperiences = async (): Promise<Experience[]> => {
  const experiences = await readJSON<Experience[]>("experience.json");
  // Sort by start date, no featured field for experiences so just by date
  return [...experiences].sort((a, b) => {
    const dateA = parseDate(a.start);
    const dateB = parseDate(b.start);
    return dateB.getTime() - dateA.getTime();
  });
};

export const getSkills = () => readJSON<Skill[]>("skills.json");

export const getCertificates = async (): Promise<Certificate[]> => {
  const certs = await readJSON<Certificate[]>("certificates.json");
  return sortByFeaturedAndDate(certs, (c) => c.issued);
};

// Helper functions for featured items (for homepage preview)
export const getFeaturedProjects = async (limit = 3): Promise<Project[]> => {
  const projects = await getProjects(); // Already sorted
  return projects.slice(0, limit);
};

export const getFeaturedCertificates = async (
  limit = 3
): Promise<Certificate[]> => {
  const certs = await getCertificates(); // Already sorted
  return certs.slice(0, limit);
};

export const getFeaturedExperiences = async (
  limit = 2
): Promise<Experience[]> => {
  const exp = await getExperiences(); // Already sorted
  return exp.slice(0, limit);
};
