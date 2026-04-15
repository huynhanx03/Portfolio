import type { Achievement } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AchievementCardProps {
    achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
    const cardContent = (
        <Card className={`group h-full bg-card/50 border-border/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 overflow-hidden ${achievement.credentialUrl ? 'cursor-pointer' : ''}`}>
            {/* Achievement Image */}
            {achievement.image && (
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                    <Image
                        src={achievement.image}
                        alt={achievement.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            )}

            <CardContent className="p-5">
                {/* Header: Icon + Year + Badge */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${achievement.type === 'certificate'
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                            : 'bg-gradient-to-br from-yellow-500 to-orange-500'
                            }`}>
                            {achievement.type === 'certificate' ? (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            )}
                        </div>
                        <span className="text-sm font-medium text-cyan-500">
                            {achievement.year}
                        </span>
                    </div>
                    <Badge variant={achievement.type === 'certificate' ? 'secondary' : 'default'} className={`text-xs ${achievement.type === 'award' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : ''
                        }`}>
                        {achievement.type === 'certificate' ? 'Certificate' : 'Award'}
                    </Badge>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-cyan-500 transition-colors">
                    {achievement.name}
                </h3>

                {/* Issuer */}
                <p className="text-muted-foreground text-sm">
                    {achievement.issuer}
                </p>
            </CardContent>
        </Card>
    );

    if (!achievement.credentialUrl) {
        return cardContent;
    }

    return (
        <Link href={achievement.credentialUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
            {cardContent}
        </Link>
    );
}
