import type { Metadata } from 'next';
import { Syne, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-syne',
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

export const metadata: Metadata = {
  title: 'Al Adil Ashrafi — The Marketing Alchemist',
  description:
    'Digital marketing specialist bridging chemistry and marketing. Co-founder of Markimist. Creator of Bangla Track.',
  openGraph: {
    title: 'Al Adil Ashrafi — The Marketing Alchemist',
    description:
      'Digital marketer, entrepreneur, and builder turning data into growth and strategy into revenue.',
    url: 'https://adilashrafi.com',
    siteName: 'Al Adil Ashrafi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al Adil Ashrafi — The Marketing Alchemist',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body" suppressHydrationWarning>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
