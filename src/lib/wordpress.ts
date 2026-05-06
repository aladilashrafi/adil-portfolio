import { GraphQLClient, gql } from 'graphql-request';

// ── CLIENT ────────────────────────────────────────────────────────────────────

const client = new GraphQLClient(
  process.env.WORDPRESS_API_URL ?? 'https://adilashrafi.com/graphql',
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

// ── TYPES ─────────────────────────────────────────────────────────────────────

export interface HeroData {
  title: string;
  tagline: string;
  bio: string;
  roasHighlight: string;
  roasSubtext: string;
  availability: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface Service {
  id: string;
  num: string;
  icon: string;
  name: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  type: 'work' | 'education';
}

export interface Project {
  id: string;
  slug: string;
  badge: string;
  name: string;
  description: string;
  url: string;
  status: 'live' | 'development';
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}

// ── QUERIES ───────────────────────────────────────────────────────────────────

/**
 * Hero data is stored as an ACF Options page in WordPress.
 * Requires: WPGraphQL + WPGraphQL for ACF plugins.
 */
const HERO_QUERY = gql`
  query GetHeroData {
    siteSettings {
      heroSettings {
        tagline
        bio
        roasHighlight
        roasSubtext
        availability
        ctaPrimaryLabel
        ctaPrimaryHref
        ctaSecondaryLabel
        ctaSecondaryHref
      }
    }
    generalSettings {
      title
    }
  }
`;

/**
 * Services stored as a custom post type "service" with ACF fields.
 */
const SERVICES_QUERY = gql`
  query GetServices {
    services(first: 8, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        serviceFields {
          num
          icon
          description
        }
      }
    }
  }
`;

/**
 * Experience items stored as CPT "experience" with ACF fields.
 * type field: 'work' | 'education'
 */
const EXPERIENCE_QUERY = gql`
  query GetExperience {
    experienceItems(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        experienceFields {
          period
          company
          description
          type
        }
      }
    }
  }
`;

/**
 * Projects stored as CPT "project" with ACF fields.
 */
const PROJECTS_QUERY = gql`
  query GetProjects {
    projects(first: 6, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        projectFields {
          badge
          description
          url
          status
        }
      }
    }
  }
`;

// ── FETCHERS ──────────────────────────────────────────────────────────────────

export async function getHeroData(): Promise<HeroData> {
  try {
    const data = await client.request<any>(HERO_QUERY);
    const s = data.siteSettings?.heroSettings ?? {};
    return {
      title: data.generalSettings?.title ?? 'Al Adil Ashrafi',
      tagline: s.tagline ?? 'The Marketing Alchemist',
      bio: s.bio ?? '',
      roasHighlight: s.roasHighlight ?? '6.5×',
      roasSubtext: s.roasSubtext ?? 'ROAS — Gulf Coast Marine Outfitters · 90 Days',
      availability: s.availability ?? 'Available for Freelance',
      ctaPrimary: { label: s.ctaPrimaryLabel ?? "Let's Work →", href: s.ctaPrimaryHref ?? '#contact' },
      ctaSecondary: { label: s.ctaSecondaryLabel ?? 'View Resume', href: s.ctaSecondaryHref ?? '#' },
    };
  } catch {
    // Fallback static data when WP is not connected yet
    return {
      title: 'Al Adil Ashrafi',
      tagline: 'The Marketing Alchemist',
      bio: 'Digital marketing professional, entrepreneur, and builder. Co-founder of Markimist agency · Digital Marketing Specialist at Mediusware · Founder of Bangla Track.',
      roasHighlight: '6.5×',
      roasSubtext: 'ROAS — Gulf Coast Marine Outfitters · 90 Days',
      availability: 'Available for Freelance',
      ctaPrimary: { label: "Let's Work →", href: '#contact' },
      ctaSecondary: { label: 'View Resume', href: 'https://adilashrafi.com/resume/' },
    };
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await client.request<any>(SERVICES_QUERY);
    return data.services.nodes.map((n: any) => ({
      id: n.id,
      num: n.serviceFields.num,
      icon: n.serviceFields.icon,
      name: n.title,
      description: n.serviceFields.description,
    }));
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    const data = await client.request<any>(EXPERIENCE_QUERY);
    return data.experienceItems.nodes.map((n: any) => ({
      id: n.id,
      period: n.experienceFields.period,
      role: n.title,
      company: n.experienceFields.company,
      description: n.experienceFields.description,
      type: n.experienceFields.type,
    }));
  } catch {
    return FALLBACK_EXPERIENCE;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.request<any>(PROJECTS_QUERY);
    return data.projects.nodes.map((n: any) => ({
      id: n.id,
      slug: n.slug,
      badge: n.projectFields.badge,
      name: n.title,
      description: n.projectFields.description,
      url: n.projectFields.url,
      status: n.projectFields.status,
      featuredImage: n.featuredImage,
    }));
  } catch {
    return FALLBACK_PROJECTS;
  }
}

// ── STATIC FALLBACKS (used during dev before WP is connected) ─────────────────

const FALLBACK_SERVICES: Service[] = [
  { id:'1', num:'01', icon:'⬡', name:'Search Engine Optimization', description:'Data-driven on-page, technical, and off-page SEO strategies engineered to compound organic growth over time.' },
  { id:'2', num:'02', icon:'◈', name:'PPC & Paid Advertising', description:'High-ROI Google Ads and social ad campaigns built on intent data. Proven 6.5× ROAS in competitive markets.' },
  { id:'3', num:'03', icon:'⬢', name:'E-commerce Growth', description:'Full-funnel marketing for WooCommerce and Shopify — traffic acquisition, conversion optimization, and retention systems.' },
  { id:'4', num:'04', icon:'◎', name:'Social Media Marketing', description:'Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok — building brand equity and driving measurable conversions.' },
  { id:'5', num:'05', icon:'▣', name:'WordPress Development', description:'Custom, fast, SEO-ready WordPress websites — from business sites and blogs to full WooCommerce stores and plugins.' },
  { id:'6', num:'06', icon:'◉', name:'Answer Engine Optimization', description:'Structuring content and knowledge graphs to win AI-generated answers, LLM citations, and featured snippets.' },
  { id:'7', num:'07', icon:'△', name:'Content & Email Strategy', description:'Authority-building content pipelines and email campaigns that nurture leads from first touch to loyal customer.' },
  { id:'8', num:'08', icon:'◇', name:'Conversion Optimization', description:'UX audits, landing page refinement, and A/B testing to extract revenue from existing traffic.' },
];

const FALLBACK_EXPERIENCE: ExperienceItem[] = [
  { id:'w1', period:'Mar 2026 – Present', role:'Digital Marketing Specialist', company:'Mediusware Limited', description:'Planning, executing, and optimizing digital growth systems through revenue-focused strategy, cross-team coordination, and performance marketing.', type:'work' },
  { id:'w2', period:'Mar 2025 – Mar 2026', role:'SEO Executive (Lead)', company:'Mediusware Limited', description:'Led a 5-member SEO team delivering data-driven strategies across multiple projects — significant organic traffic growth and SERP ranking improvements.', type:'work' },
  { id:'w3', period:'Mar 2024 – Present', role:'Co-founder & Team Lead', company:'Markimist', description:'Leading a team of digital marketers, graphic designers, and motion designers. SEO, paid ads, brand strategy, and content — all focused on measurable results.', type:'work' },
  { id:'w4', period:'Mar 2024 – Dec 2024', role:'E-commerce & Digital Marketing Manager', company:'Omega Mart', description:'Full-funnel digital marketing — ad campaigns, SEO, social media, product catalog management, and customer experience optimization.', type:'work' },
  { id:'e1', period:'2022 – Present', role:'BBA in Marketing', company:'National University, Bangladesh', description:'Undergraduate degree building strong theoretical marketing foundations alongside active industry practice.', type:'education' },
  { id:'e2', period:'Oct 2024 – Oct 2029', role:'Digital Marketing – Level 03', company:'NSDA, Bangladesh', description:'Government-certified professional qualification in digital marketing and freelancing, valid through 2029.', type:'education' },
  { id:'e3', period:'Feb – Aug 2024', role:'Professional Digital Marketing', company:'Creative IT Institute', description:'Intensive industry-grade program covering the full digital marketing stack with practical project experience.', type:'education' },
  { id:'e4', period:'2020 – 2022', role:'Higher Secondary Certificate', company:'Govt. Shahid Suhrawardy College, Dhaka', description:'Academic foundation in Dhaka toward a career in business and marketing.', type:'education' },
];

const FALLBACK_PROJECTS: Project[] = [
  { id:'p1', slug:'bangla-track', badge:'Plugin · WooCommerce · Bangladesh', name:'Bangla Track', description:'WooCommerce courier integration for the Bangladeshi market — supporting Steadfast, Pathao, and RedX on a freemium licensing model. Features bulk booking, PDF labels, webhook tracking, and a self-hosted licensing system.', url:'https://banglatrack.com', status:'live' },
  { id:'p2', slug:'markimist', badge:'Agency · Branding · Digital Marketing', name:'Markimist', description:'A branding-focused digital marketing agency. Leading a team across SEO, paid advertising, brand strategy, and motion design to deliver measurable outcomes for clients across multiple industries.', url:'https://markimist.com', status:'live' },
  { id:'p3', slug:'gulf-coast-roas', badge:'Case Study · Google Ads · Marine E-commerce', name:'6.5× ROAS in 90 Days', description:'Built a full Google Ads campaign architecture from PMax search term data for Gulf Coast Marine Outfitters. Achieved 6.5× ROAS through precision targeting and continuous optimization.', url:'https://adilashrafi.com/projects/', status:'live' },
  { id:'p4', slug:'social-seller-app', badge:'In Development · React Native · Bangladesh', name:'Social Seller App', description:'A standalone mobile app for Facebook, Instagram, and WhatsApp sellers in Bangladesh. LLM-powered order parsing, direct courier booking, and FCM push notifications — no WooCommerce required.', url:'https://banglatrack.com', status:'development' },
];
