// Map skill names to simple-icons slugs
export const skillIcons: Record<string, { slug: string; color: string }> = {
    // Programming Languages
    'Go': { slug: 'go', color: '#00ADD8' },
    'Java': { slug: 'openjdk', color: '#ED8B00' },
    'C/C++': { slug: 'cplusplus', color: '#00599C' },

    // Frameworks
    'Gin': { slug: 'go', color: '#00ADD8' },
    'Spring Boot': { slug: 'springboot', color: '#6DB33F' },

    // Databases - Relational
    'MySQL': { slug: 'mysql', color: '#4479A1' },
    'PostgreSQL': { slug: 'postgresql', color: '#4169E1' },
    'ClickHouse': { slug: 'clickhouse', color: '#FFCC01' },

    // Databases - NoSQL
    'MongoDB': { slug: 'mongodb', color: '#47A248' },
    'Redis': { slug: 'redis', color: '#DC382D' },
    'Elasticsearch': { slug: 'elasticsearch', color: '#005571' },

    // API
    'RESTful': { slug: 'fastapi', color: '#009688' },
    'gRPC': { slug: 'grpc', color: '#4285F4' },

    // Message Brokers
    'Kafka': { slug: 'apachekafka', color: '#231F20' },

    // Knowledge
    'OOP': { slug: 'python', color: '#3776AB' },
    'SOLID Principles': { slug: 'solid', color: '#6DB33F' },
    'Design Patterns': { slug: 'diagramsdotnet', color: '#F08705' },

    // System Architecture
    'MVC': { slug: 'dotnet', color: '#512BD4' },
    'Microservices': { slug: 'kubernetes', color: '#326CE5' },
    'Distributed Systems': { slug: 'apache', color: '#D22128' },

    // Tools
    'Git': { slug: 'git', color: '#F05032' },
    'Docker': { slug: 'docker', color: '#2496ED' },

    // Other
    'HTML': { slug: 'html5', color: '#E34F26' },
    'CSS': { slug: 'css3', color: '#1572B6' },
    'JSP': { slug: 'oracle', color: '#F80000' },
    'Servlets': { slug: 'oracle', color: '#F80000' },
};

// Get SVG content for a skill icon
export function getSkillIcon(skillName: string): { svg: string; color: string } | null {
    const iconInfo = skillIcons[skillName];
    if (!iconInfo) return null;

    try {
        // Dynamic import from simple-icons - requires the slug
        const slug = iconInfo.slug;
        return {
            svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${skillName}</title><path d="..." fill="currentColor"/></svg>`,
            color: iconInfo.color
        };
    } catch {
        return null;
    }
}
