import { unstable_cache } from "next/cache";
import { formatDuration } from "@/lib/utils";
import { getCompetitiveData } from "@/lib/data";
import type {
  CodeforcesStats,
  CompetitiveData,
  GithubStats,
  LeetCodeStats,
  OtherPlatform,
} from "@/lib/types";

interface CodeforcesUserInfo {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
}

interface CodeforcesSubmission {
  verdict: string;
  problem: {
    contestId: number;
    index: string;
  };
}

interface LeetCodeResponse {
  data: {
    matchedUser: {
      username: string;
      submitStatsGlobal: {
        acSubmissionNum: Array<{
          difficulty: string;
          count: number;
        }>;
      };
    };
    userContestRanking: {
      rating: number;
      topPercentage: number;
    } | null;
    allQuestionsCount: Array<{
      difficulty: string;
      count: number;
    }>;
  };
}

export interface WakatimeStats {
  totalTime: string;
  totalSeconds: number;
  languages: Array<{
    name: string;
    percent: number;
    totalSeconds: number;
    totalTime: string;
  }>;
}

interface WakatimeLanguageRaw {
  name: string;
  percent: number;
  total_seconds: number;
}

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";
const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    userContestRanking(username: $username) {
      rating
      topPercentage
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

const getGithubStatsCached = unstable_cache(
  async (): Promise<GithubStats> => {
    const config = await getCompetitiveData() as CompetitiveData & {
      platforms: CompetitiveData["platforms"] & {
        github: { username: string; profileUrl: string };
      };
    };

    const { username } = config.platforms.github;
    const response = await fetch(
      `https://github-contributions-api.deno.dev/${username}.json`,
      { next: { revalidate: 3600, tags: ["stats:github"] } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub contributions");
    }

    const data = await response.json();

    return {
      username,
      contributions: data.contributions,
      totalContributions: data.totalContributions,
    };
  },
  ["stats:github"],
  { revalidate: 3600, tags: ["stats:github"] }
);

const getCodeforcesStatsCached = unstable_cache(
  async (): Promise<CodeforcesStats> => {
    const config = await getCompetitiveData();
    const { username, profileUrl } = config.platforms.codeforces;

    const userInfoRes = await fetch(
      `https://codeforces.com/api/user.info?handles=${username}`,
      { next: { revalidate: 3600, tags: ["stats:codeforces"] } }
    );

    if (!userInfoRes.ok) {
      throw new Error("Failed to fetch Codeforces user info");
    }

    const userInfoData = await userInfoRes.json();

    if (userInfoData.status !== "OK") {
      throw new Error(userInfoData.comment || "Codeforces API error");
    }

    const userInfo: CodeforcesUserInfo = userInfoData.result[0];

    const submissionsRes = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`,
      { next: { revalidate: 3600, tags: ["stats:codeforces"] } }
    );

    let problemsSolved = 0;

    if (submissionsRes.ok) {
      const submissionsData = await submissionsRes.json();
      if (submissionsData.status === "OK") {
        const solvedSet = new Set<string>();
        submissionsData.result.forEach((sub: CodeforcesSubmission) => {
          if (sub.verdict === "OK") {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });
        problemsSolved = solvedSet.size;
      }
    }

    return {
      platform: "codeforces",
      username: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || "unrated",
      maxRank: userInfo.maxRank || "unrated",
      problemsSolved,
      profileUrl,
    };
  },
  ["stats:codeforces"],
  { revalidate: 3600, tags: ["stats:codeforces"] }
);

const getLeetCodeStatsCached = unstable_cache(
  async (): Promise<LeetCodeStats> => {
    const config = await getCompetitiveData();
    const { username, profileUrl } = config.platforms.leetcode;

    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: USER_PROFILE_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600, tags: ["stats:leetcode"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch LeetCode data");
    }

    const result: LeetCodeResponse = await response.json();

    if (!result.data?.matchedUser) {
      throw new Error("LeetCode user not found");
    }

    const { matchedUser, allQuestionsCount } = result.data;
    const acStats = matchedUser.submitStatsGlobal.acSubmissionNum;

    const findCount = (difficulty: string) =>
      acStats.find((s) => s.difficulty === difficulty)?.count || 0;
    const findTotal = (difficulty: string) =>
      allQuestionsCount.find((q) => q.difficulty === difficulty)?.count || 0;

    return {
      platform: "leetcode",
      username: matchedUser.username,
      rating: Math.round(result.data.userContestRanking?.rating || 0),
      topPercentage: result.data.userContestRanking?.topPercentage,
      problemsSolved: findCount("All"),
      totalProblems: findTotal("All"),
      easySolved: findCount("Easy"),
      mediumSolved: findCount("Medium"),
      hardSolved: findCount("Hard"),
      profileUrl,
    };
  },
  ["stats:leetcode"],
  { revalidate: 3600, tags: ["stats:leetcode"] }
);

const getOtherPlatformsCached = unstable_cache(
  async (): Promise<OtherPlatform[]> => {
    const config = await getCompetitiveData();
    return config.otherPlatforms;
  },
  ["stats:other-platforms"],
  { revalidate: 86400, tags: ["stats:other-platforms"] }
);

const getWakatimeStatsCached = unstable_cache(
  async (): Promise<WakatimeStats> => {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
      throw new Error("Wakatime API Key not found");
    }

    const response = await fetch(
      `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${apiKey}`,
      { next: { revalidate: 900, tags: ["stats:wakatime"] } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Wakatime data");
    }

    const { data } = await response.json();
    const totalSeconds = data?.total_seconds || 0;

    return {
      totalTime: formatDuration(totalSeconds),
      totalSeconds,
      languages: ((data?.languages || []) as WakatimeLanguageRaw[]).map((lang) => ({
        name: lang.name,
        percent: lang.percent,
        totalSeconds: lang.total_seconds,
        totalTime: formatDuration(lang.total_seconds),
      })),
    };
  },
  ["stats:wakatime"],
  { revalidate: 900, tags: ["stats:wakatime"] }
);

export async function getGithubStats() {
  return getGithubStatsCached();
}

export async function getCodeforcesStats() {
  return getCodeforcesStatsCached();
}

export async function getLeetCodeStats() {
  return getLeetCodeStatsCached();
}

export async function getOtherPlatforms() {
  return getOtherPlatformsCached();
}

export async function getWakatimeStats() {
  return getWakatimeStatsCached();
}
