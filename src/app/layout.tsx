import type { Metadata, Viewport } from 'next';
import { Outfit, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { getPortfolioData } from '@/lib/api';
import { stripHtml } from '@/lib/text';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = 'https://adilashrafi.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050c14' },
  ],
};

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
  const { profile, seo } = await getPortfolioData();
  const derivedTitle = `${profile.name || 'Al Adil Ashrafi'} - ${profile.tagline || 'The Marketing Alchemist'}`;
  const derivedDescription = stripHtml(profile.bio || '').slice(0, 160) || 'Digital marketing specialist bridging marketing and technology.';

  const title = seo?.metaTitle || derivedTitle;
  const description = seo?.metaDescription || derivedDescription;
  const ogImage = seo?.ogImage || `${SITE_URL}/al-adil-ashrafi-saikat.png`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: profile.name || 'Al Adil Ashrafi',
      locale: 'en_US',
      type: 'website',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

import { ThemeProvider } from '@/components/ui/ThemeProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { profile, testimonials } = await getPortfolioData();

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body" suppressHydrationWarning>
        <JsonLd profile={profile} testimonials={testimonials} siteUrl={SITE_URL} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
