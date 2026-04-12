import { promises as fs } from "fs";
import path from "path";
import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import HackingTime from "@/components/home/HackingTime";
import CompetitiveProgramming from "@/components/home/CompetitiveProgramming";
import GitHubActivity from "@/components/home/GitHubActivity";
import Contact from "@/components/home/Contact";
import type { SiteConfig, SkillsData } from "@/lib/types";

async function getSiteConfig(): Promise<SiteConfig> {
  const filePath = path.join(process.cwd(), "data", "site.config.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function getSkills(): Promise<SkillsData> {
  const filePath = path.join(process.cwd(), "data", "skills.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function Home() {
  const [config, skills] = await Promise.all([getSiteConfig(), getSkills()]);

  return (
    <>
      <Hero config={config} />
      <Skills categories={skills.categories} />
      {/* <HackingTime /> */}
      <CompetitiveProgramming />
      <GitHubActivity />
      <Contact config={config} />
    </>
  );
}
