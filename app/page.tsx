import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import CompetitiveProgramming from "@/components/home/CompetitiveProgramming";
import GitHubActivity from "@/components/home/GitHubActivity";
import Contact from "@/components/home/Contact";
import { getSiteConfig, getSkillsData } from "@/lib/data";
import {
  getCodeforcesStats,
  getGithubStats,
  getLeetCodeStats,
  getOtherPlatforms,
} from "@/lib/stats";

export default async function Home() {
  const [config, skills, codeforcesResult, leetcodeResult, githubResult, otherPlatformsResult] =
    await Promise.all([
      getSiteConfig(),
      getSkillsData(),
      getCodeforcesStats().then((data) => ({ data, error: null as string | null })).catch(() => ({ data: null, error: "Failed to load" })),
      getLeetCodeStats().then((data) => ({ data, error: null as string | null })).catch(() => ({ data: null, error: "Failed to load" })),
      getGithubStats().then((data) => ({ data, error: null as string | null })).catch(() => ({ data: null, error: "Failed to load" })),
      getOtherPlatforms().then((data) => ({ data, error: null as string | null })).catch(() => ({ data: [], error: "Failed to load" })),
    ]);

  return (
    <>
      <Hero config={config} />
      <Skills categories={skills.categories} />
      <CompetitiveProgramming
        codeforces={codeforcesResult.data}
        codeforcesError={codeforcesResult.error}
        leetcode={leetcodeResult.data}
        leetcodeError={leetcodeResult.error}
        otherPlatforms={otherPlatformsResult.data}
      />
      <GitHubActivity stats={githubResult.data} />
      <Contact config={config} />
    </>
  );
}
