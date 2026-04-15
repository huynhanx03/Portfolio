import type { Metadata } from "next";
import AchievementCard from "@/components/shared/AchievementCard";
import { getAchievementsData } from "@/lib/data";

export const metadata: Metadata = {
    title: "Achievements | Huỳnh Mai Cao Nhân",
    description: "Professional certifications and awards in software engineering, cloud computing, and competitive programming.",
};

export default async function AchievementsPage() {
    const { achievements } = await getAchievementsData();

    return (
        <div className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Achievements
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Professional certifications and awards demonstrating my commitment to excellence and continuous growth.
                    </p>
                </div>

                {/* Achievements Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement) => (
                        <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                </div>

                {/* Empty State */}
                {achievements.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 dark:text-slate-400">
                            No achievements to display yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
