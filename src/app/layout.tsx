import type { Metadata } from 'next';
import { Outfit, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { getPortfolioData } from '@/lib/api';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolioData();
  const title = `${profile.name || 'Al Adil Ashrafi'} — ${profile.tagline || 'The Marketing Alchemist'}`;
  const description = profile.bio?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Digital marketing specialist bridging marketing and technology.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://adilashrafi.com',
      siteName: profile.name || 'Al Adil Ashrafi',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body" suppressHydrationWarning>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
