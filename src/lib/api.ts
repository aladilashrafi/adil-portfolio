/**
 * lib/api.ts
 * All data-fetching functions for the Adil Portfolio Next.js frontend.
 * Targets the custom WordPress plugin REST API:
 *   Base: process.env.NEXT_PUBLIC_WP_API  (e.g. https://adilashrafi.com/wp-json/adil/v1)
 */

const WP_API = process.env.NEXT_PUBLIC_WP_API ?? 'https://adilashrafi.com/wp-json/adil/v1';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SiteMeta {
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  availability: string;
  hero_stat_roas: string;
  hero_stat_roas_sub: string;
  hero_stat_ventures: string;
  hero_stat_ventures_sub: string;
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  badge: string;
  description: string;
  url: string;
  status: 'live' | 'development';
  featured: boolean;
  tech_tags: string[];
  image_url: string;
  order: number;
  role?: string;
  timeline?: string;
  content?: string;
}

export interface Service {
  id: number;
  num: string;
  icon: string;
  name: string;
  description: string;
  order: number;
}

export interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
  type: 'work' | 'education';
  order: number;
}

export interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: string;
  order: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar_url: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
}

export interface PortfolioData {
  meta: SiteMeta;
  projects: Project[];
  services: Service[];
  experience: ExperienceItem[];
  skills: Skill[];
  testimonials: Testimonial[];
  clients: Client[];
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${WP_API}${path}`, {
    next: { revalidate },
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`WP API error ${res.status} on ${path}`);
  }

  return res.json() as Promise<T>;
}

// ─── Bulk fetch (single round-trip — used by homepage SSG) ───────────────────

/**
 * GET /portfolio
 * Returns all data in one request. Used by the homepage for ISR.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const data = await apiFetch<PortfolioData>('/portfolio', 3600);
    return {
      ...data,
      clients: data.clients || [], // Ensure clients is never undefined
    };
  } catch {
    // Graceful fallback when WP is not yet connected (dev / preview)
    return {
      meta: FALLBACK_META,
      projects: FALLBACK_PROJECTS,
      services: FALLBACK_SERVICES,
      experience: FALLBACK_EXPERIENCE,
      skills: FALLBACK_SKILLS,
      testimonials: FALLBACK_TESTIMONIALS,
      clients: FALLBACK_CLIENTS,
    };
  }
}

// ─── Individual fetchers ──────────────────────────────────────────────────────

export async function getProjects(featured?: boolean): Promise<Project[]> {
  const qs = featured ? '?featured=1' : '';
  try {
    return await apiFetch<Project[]>(`/projects${qs}`, 3600);
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/projects/${slug}`, 3600);
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    return await apiFetch<Service[]>('/services', 3600);
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    return await apiFetch<ExperienceItem[]>('/experience', 3600);
  } catch {
    return FALLBACK_EXPERIENCE;
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    return await apiFetch<Skill[]>('/skills', 3600);
  } catch {
    return FALLBACK_SKILLS;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await apiFetch<Testimonial[]>('/testimonials', 3600);
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getSiteSettings(): Promise<SiteMeta> {
  try {
    return await apiFetch<SiteMeta>('/settings', 3600);
  } catch {
    return FALLBACK_META;
  }
}

// ─── Contact form (client-side POST) ─────────────────────────────────────────

export async function submitContact(payload: ContactPayload): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${WP_API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    return { success: false, message: data.message ?? 'Something went wrong.' };
  }
  return { success: true, message: data.message ?? 'Message sent!' };
}

// ─── Static fallback data (dev / preview mode) ───────────────────────────────

const FALLBACK_META: SiteMeta = {
  title: 'Al Adil Ashrafi',
  tagline: 'The Marketing Alchemist',
  bio: 'Digital marketing professional, entrepreneur, and builder. Co-founder of Markimist agency · Digital Marketing Specialist at Mediusware · Founder of Bangla Track, the WooCommerce courier integration plugin powering Bangladeshi e-commerce.',
  location: 'Mohammadpur, Dhaka, Bangladesh',
  email: 'hello@adilashrafi.com',
  linkedin: 'https://linkedin.com/in/aladilashrafisaikat',
  availability: 'Available for Freelance',
  hero_stat_roas: '6.5×',
  hero_stat_roas_sub: 'ROAS — Gulf Coast Marine Outfitters · 90 Days',
  hero_stat_ventures: '3',
  hero_stat_ventures_sub: 'Mediusware · Markimist · Bangla Track',
  cta_primary_label: "Let's Work →",
  cta_primary_href: '#contact',
  cta_secondary_label: 'View Resume',
  cta_secondary_href: 'https://adilashrafi.com/resume/',
};

const FALLBACK_SERVICES: Service[] = [
  { id:1, num:'01', icon:'⬡', name:'Search Engine Optimization', description:'Data-driven on-page, technical, and off-page SEO strategies engineered to compound organic growth over time.', order:1 },
  { id:2, num:'02', icon:'◈', name:'PPC & Paid Advertising', description:'High-ROI Google Ads and social ad campaigns built on intent data. Proven 6.5× ROAS in competitive markets.', order:2 },
  { id:3, num:'03', icon:'⬢', name:'E-commerce Growth', description:'Full-funnel marketing for WooCommerce and Shopify — traffic acquisition, conversion optimization, and retention systems.', order:3 },
  { id:4, num:'04', icon:'◎', name:'Social Media Marketing', description:'Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok — building brand equity and driving measurable conversions.', order:4 },
  { id:5, num:'05', icon:'▣', name:'WordPress Development', description:'Custom, fast, SEO-ready WordPress websites — from business sites and blogs to full WooCommerce stores and plugins.', order:5 },
  { id:6, num:'06', icon:'◉', name:'Answer Engine Optimization', description:'Structuring content and knowledge graphs to win AI-generated answers, LLM citations, and featured snippets.', order:6 },
  { id:7, num:'07', icon:'△', name:'Content & Email Strategy', description:'Authority-building content pipelines and email campaigns that nurture leads from first touch to loyal customer.', order:7 },
  { id:8, num:'08', icon:'◇', name:'Conversion Optimization', description:'UX audits, landing page refinement, and A/B testing to extract more revenue from your existing traffic.', order:8 },
];

const FALLBACK_EXPERIENCE: ExperienceItem[] = [
  { id:1, period:'Mar 2026 – Present', role:'Digital Marketing Specialist', company:'Mediusware Limited', description:'Planning, executing, and optimizing digital growth systems through revenue-focused strategy, cross-team coordination, and performance marketing.', type:'work', order:1 },
  { id:2, period:'Mar 2025 – Mar 2026', role:'SEO Executive (Lead)', company:'Mediusware Limited', description:'Led a 5-member SEO team delivering data-driven strategies across multiple projects — significant organic traffic growth and SERP ranking improvements.', type:'work', order:2 },
  { id:3, period:'Mar 2024 – Present', role:'Co-founder & Team Lead', company:'Markimist', description:'Leading a team of digital marketers, graphic designers, and motion designers. SEO, paid ads, brand strategy, and content — all focused on measurable results.', type:'work', order:3 },
  { id:4, period:'Mar 2024 – Dec 2024', role:'E-commerce & Digital Marketing Manager', company:'Omega Mart', description:'Full-funnel digital marketing — ad campaigns, SEO, social media, product catalog management, and customer experience optimization.', type:'work', order:4 },
  { id:5, period:'2022 – Present', role:'BBA in Marketing', company:'National University, Bangladesh', description:'Undergraduate degree building strong theoretical marketing foundations alongside active industry practice.', type:'education', order:5 },
  { id:6, period:'Oct 2024 – Oct 2029', role:'Digital Marketing – Level 03', company:'NSDA, Bangladesh', description:'Government-certified professional qualification in digital marketing and freelancing, valid through 2029.', type:'education', order:6 },
  { id:7, period:'Feb – Aug 2024', role:'Professional Digital Marketing', company:'Creative IT Institute', description:'Intensive industry-grade program covering the full digital marketing stack with practical project experience.', type:'education', order:7 },
  { id:8, period:'2020 – 2022', role:'Higher Secondary Certificate', company:'Govt. Shahid Suhrawardy College, Dhaka', description:'Academic foundation in Dhaka, building toward a career in business and marketing.', type:'education', order:8 },
];

const FALLBACK_SKILLS: Skill[] = [
  { id:1, name:'Critical Thinking',   percentage:95, category:'core', order:1 },
  { id:2, name:'Team Management',     percentage:90, category:'core', order:2 },
  { id:3, name:'Adaptability',        percentage:85, category:'core', order:3 },
  { id:4, name:'Collaboration',       percentage:80, category:'core', order:4 },
  { id:5, name:'Project Management',  percentage:80, category:'core', order:5 },
  { id:6, name:'Data Analysis',       percentage:75, category:'core', order:6 },
];

const FALLBACK_PROJECTS: Project[] = [
  { id:1, slug:'bangla-track', name:'Bangla Track', badge:'Plugin · WooCommerce · Bangladesh', description:'WooCommerce courier integration for the Bangladeshi market — supporting Steadfast, Pathao, and RedX on a freemium licensing model. Features bulk booking, PDF labels, webhook tracking, and a self-hosted licensing system.', url:'https://banglatrack.com', status:'live', featured:true, tech_tags:['WooCommerce','PHP','WordPress'], image_url:'', order:1 },
  { id:2, slug:'markimist', name:'Markimist', badge:'Agency · Branding · Digital Marketing', description:'A branding-focused digital marketing agency. Leading a team across SEO, paid advertising, brand strategy, and motion design to deliver measurable outcomes for clients across multiple industries.', url:'https://markimist.com', status:'live', featured:true, tech_tags:['SEO','Google Ads','Branding'], image_url:'', order:2 },
  { id:3, slug:'gulf-coast-roas', name:'6.5× ROAS in 90 Days', badge:'Case Study · Google Ads · Marine E-commerce', description:'Built a full Google Ads campaign architecture from PMax search term data for Gulf Coast Marine Outfitters. Achieved 6.5× ROAS through precision targeting, segmented campaigns, and continuous creative testing.', url:'https://adilashrafi.com/projects/', status:'live', featured:true, tech_tags:['Google Ads','PMax','E-commerce'], image_url:'', order:3 },
  { id:4, slug:'social-seller-app', name:'Social Seller App', badge:'In Development · React Native · Bangladesh', description:'A standalone mobile app for Facebook, Instagram, and WhatsApp sellers in Bangladesh. LLM-powered order parsing, direct courier booking, SQLite local storage, and FCM push notifications — no WooCommerce required.', url:'https://banglatrack.com', status:'development', featured:false, tech_tags:['React Native','Expo','SQLite'], image_url:'', order:4 },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id:1, quote:'Adil transformed our Google Ads performance completely. The ROAS improvement was beyond what we expected in such a short time.', author:'Gulf Coast Marine Team', title:'E-commerce Manager', company:'Gulf Coast Marine Outfitters', avatar_url:'' },
];

const FALLBACK_CLIENTS: Client[] = [
  { id:1, name:'Omega Mart', logo:'' },
  { id:2, name:'MAGMA', logo:'' },
  { id:3, name:'Gulf Coast Marine Outfitters', logo:'' },
  { id:4, name:'Bonedi Ponno', logo:'' },
  { id:5, name:'Garnett Counseling', logo:'' },
  { id:6, name:'Lexington Electrical & HVAC', logo:'' },
  { id:7, name:'Ahlan Agro', logo:'' },
  { id:8, name:'Goynar Sur', logo:'' },
  { id:9, name:'Modern Dormitory', logo:'' },
  { id:10, name:'Beefwala', logo:'' },
];
