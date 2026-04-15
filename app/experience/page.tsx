import ExperienceTimeline from "@/components/home/Experience";
import { getExperienceData } from "@/lib/data";

export default async function ExperiencePage() {
    const { experiences } = await getExperienceData();

    return <ExperienceTimeline experiences={experiences} />;
}
