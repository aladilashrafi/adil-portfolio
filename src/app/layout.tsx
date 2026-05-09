import type { Metadata } from 'next';
import { Outfit, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

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

export const metadata: Metadata = {
  title: 'Al Adil Ashrafi - The Marketing Alchemist',
  description:
    'Digital marketing specialist bridging marketing and technology. Co-founder of Markimist. Creator of Bangla Track.',
  openGraph: {
    title: 'Al Adil Ashrafi - The Marketing Alchemist',
    description:
      'Digital marketer, entrepreneur, and builder turning data into growth and strategy into revenue.',
    url: 'https://adilashrafi.com',
    siteName: 'Al Adil Ashrafi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al Adil Ashrafi - The Marketing Alchemist',
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
