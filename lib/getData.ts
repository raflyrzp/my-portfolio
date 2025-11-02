import { promises as fs } from "node:fs";
import path from "node:path";
import type { Bio, Project, Experience, Skill, Certificate } from "@/types";

const dataDir = path.join(process.cwd(), "data");

async function readJSON<T>(file: string): Promise<T> {
  const content = await fs.readFile(path.join(dataDir, file), "utf8");
  return JSON.parse(content) as T;
}

export const getBiodata = () => readJSON<Bio>("biodata.json");
export const getProjects = () => readJSON<Project[]>("projects.json");
export const getExperiences = () => readJSON<Experience[]>("experience.json");
export const getSkills = () => readJSON<Skill[]>("skills.json");
export const getCertificates = () =>
  readJSON<Certificate[]>("certificates.json");
