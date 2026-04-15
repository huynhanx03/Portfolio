import { promises as fs } from "fs";
import path from "path";
import { unstable_cache } from "next/cache";
import type {
  AchievementsData,
  CompetitiveData,
  ExperienceData,
  ProjectsData,
  SiteConfig,
  SkillsData,
} from "@/lib/types";

async function readJsonFile<T>(fileName: string): Promise<T> {
  const filePath = path.join(process.cwd(), "data", fileName);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as T;
}

export const getSiteConfig = unstable_cache(
  async () => readJsonFile<SiteConfig>("site.config.json"),
  ["data:site-config"],
  { revalidate: 3600, tags: ["data:site-config"] }
);

export const getSkillsData = unstable_cache(
  async () => readJsonFile<SkillsData>("skills.json"),
  ["data:skills"],
  { revalidate: 3600, tags: ["data:skills"] }
);

export const getProjectsData = unstable_cache(
  async () => readJsonFile<ProjectsData>("projects.json"),
  ["data:projects"],
  { revalidate: 3600, tags: ["data:projects"] }
);

export const getExperienceData = unstable_cache(
  async () => readJsonFile<ExperienceData>("experience.json"),
  ["data:experience"],
  { revalidate: 3600, tags: ["data:experience"] }
);

export const getAchievementsData = unstable_cache(
  async () => readJsonFile<AchievementsData>("achievements.json"),
  ["data:achievements"],
  { revalidate: 3600, tags: ["data:achievements"] }
);

export const getCompetitiveData = unstable_cache(
  async () => readJsonFile<CompetitiveData>("competitive.json"),
  ["data:competitive"],
  { revalidate: 3600, tags: ["data:competitive"] }
);
