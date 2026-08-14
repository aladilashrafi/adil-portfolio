import { stripHtml } from '@/lib/text';
import type { Testimonial } from '@/lib/api';

function omitEmpty<T extends Record<string, any>>(obj: T): T {
  return JSON.parse(JSON.stringify(obj, (_key, value) => (value === '' || value == null ? undefined : value)));
}

function buildPersonSchema(profile: any, siteUrl: string) {
  const social = profile.social || {};
  const sameAs = [
    social.linkedin, social.github, social.behance, social.dribbble,
    social.gravatar, social.wordpress_org, social.youtube, social.x,
    social.facebook, social.instagram,
  ].filter(Boolean);

  return omitEmpty({
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: profile.name,
    jobTitle: profile.tagline,
    description: stripHtml(profile.bio || profile.hero_bio || ''),
    email: profile.email ? `mailto:${profile.email}` : undefined,
    telephone: profile.phone,
    url: siteUrl,
    image: `${siteUrl}/al-adil-ashrafi-saikat.png`,
    address: profile.location
      ? { '@type': 'PostalAddress', addressLocality: profile.location }
      : undefined,
    sameAs,
    worksFor: [
      { '@id': `${siteUrl}/#org-banglatrack` },
      { '@id': `${siteUrl}/#org-markimist` },
      {
        '@type': 'OrganizationRole',
        roleName: 'Media Buyer and SEO Strategist',
        worksFor: { '@id': `${siteUrl}/#org-qiicreative` },
      },
    ],
  });
}

function buildWebsiteSchema(profile: any, siteUrl: string) {
  return omitEmpty({
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: profile.name,
    url: siteUrl,
  });
}

function buildOrganizationSchemas(siteUrl: string) {
  return [
    omitEmpty({
      '@type': 'Organization',
      '@id': `${siteUrl}/#org-banglatrack`,
      name: 'Bangla Track',
      url: 'https://banglatrack.com/',
      logo: 'https://app.banglatrack.com/project-logo.png',
      founder: { '@id': `${siteUrl}/#person` },
    }),
    omitEmpty({
      '@type': 'Organization',
      '@id': `${siteUrl}/#org-markimist`,
      name: 'Markimist',
      url: 'https://www.markimist.com/',
      founder: { '@id': `${siteUrl}/#person` },
    }),
    omitEmpty({
      '@type': 'Organization',
      '@id': `${siteUrl}/#org-qiicreative`,
      name: 'Qii Creative',
      url: 'https://qiicreative.com.au/',
      logo: 'https://qiicreative.com.au/wp-content/uploads/2026/07/qlogo-CM6eXlaJ-1024x219.png',
      employee: { '@id': `${siteUrl}/#person` },
    }),
  ];
}

function buildReviewSchemas(profile: any, testimonials: Testimonial[], siteUrl: string) {
  if (!testimonials || testimonials.length === 0) return [];

  const reviews = testimonials.map((t) =>
    omitEmpty({
      '@type': 'Review',
      itemReviewed: { '@id': `${siteUrl}/#person` },
      author: { '@type': 'Person', name: t.author },
      reviewBody: stripHtml(t.quote || ''),
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })
  );

  const avgRating =
    testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length;

  const aggregateRating = omitEmpty({
    '@type': 'AggregateRating',
    itemReviewed: { '@id': `${siteUrl}/#person` },
    ratingValue: Number(avgRating.toFixed(1)),
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  });

  return [...reviews, aggregateRating];
}

export function JsonLd({
  profile,
  testimonials,
  siteUrl,
}: {
  profile: any;
  testimonials: Testimonial[];
  siteUrl: string;
}) {
  const graph = [
    buildPersonSchema(profile, siteUrl),
    buildWebsiteSchema(profile, siteUrl),
    ...buildOrganizationSchemas(siteUrl),
    ...buildReviewSchemas(profile, testimonials, siteUrl),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
