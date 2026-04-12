import { promises as fs } from "fs";
import path from "path";
import ExperienceTimeline from "@/components/home/Experience";
import type { ExperienceData } from "@/lib/types";

// Reads experience data from the local JSON file.
async function getExperience(): Promise<ExperienceData> {
    const filePath = path.join(process.cwd(), "data", "experience.json");
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

export default async function ExperiencePage() {
    const { experiences } = await getExperience();

    return <ExperienceTimeline experiences={experiences} />;
}
