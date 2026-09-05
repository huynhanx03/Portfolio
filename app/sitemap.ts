import type { MetadataRoute } from 'next';

const routes = ['', '/experience', '/projects', '/achievements'];
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huynhnhan.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: 'monthly', priority: route === '' ? 1 : 0.7 }));
}
