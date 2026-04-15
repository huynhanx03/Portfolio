import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteConfig } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
    authors: [{ name: config.name }],
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      type: "website",
    },
    icons: {
      icon: '/favicon.svg',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <TooltipProvider delayDuration={0}>
          <Header />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer
            name={config.name}
            email={config.links.email}
            github={config.links.github}
            linkedin={config.links.linkedin}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
