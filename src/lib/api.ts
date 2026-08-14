/**
 * lib/api.ts
 * All data-fetching functions for the Adil Portfolio Next.js frontend.
 */

const WP_API = process.env.NEXT_PUBLIC_WP_API ?? 'https://api.adilashrafi.com/wp-json/hpcms/v1';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  excerpt?: string;
  image_url: string;
  image_width?: number;
  image_height?: number;
  image_alt?: string;
  order: number;
  role?: string;
  timeline?: string;
  content?: string;
  categories?: any[];
  industry?: string;
  technologies?: any[];
  industries?: any[];
  key_results?: string[];
  seo?: { title?: string; description?: string };
  date?: string;
  modified?: string;
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
  company_url?: string;
  description: string;
  type: 'work' | 'education';
  order: number;
}

export interface Skill {
  id: number;
  name: string;
  icon?: string;
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
  rating: number;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
}

export interface HighlightedCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface HighlightedCards {
  title: string;
  subtitle: string;
  cards: HighlightedCard[];
}

export interface SiteSeo {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

export interface TaxonomyTerm {
  id: number;
  name: string;
  slug: string;
}

export interface TechStackSection {
  title: string;
  subtitle: string;
  description: string;
  items: TaxonomyTerm[];
}

export interface IndustriesSection {
  title: string;
  subtitle: string;
  description: string;
  items: TaxonomyTerm[];
}

export interface TestimonialsSectionData {
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
}

export interface PortfolioData {
  projects: Project[];
  services: Service[];
  experience: ExperienceItem[];
  skills: Skill[];
  testimonials: Testimonial[];
  clients: Client[];
  resumeUrl: string | null;
  profile: any;
  highlightedCards: HighlightedCards;
  seo: SiteSeo;
  techStackSection: TechStackSection;
  industriesSection: IndustriesSection;
  testimonialsSection: TestimonialsSectionData;
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

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapProject(data: any): Project {
  return {
    id: data.id,
    slug: data.slug,
    name: data.title,
    badge: data.categories?.[0]?.name || '',
    industry: data.industries?.[0]?.name || '',
    description: data.excerpt || '',
    url: data.links?.live || '',
    status: data.featured ? 'live' : 'development',
    featured: !!data.featured,
    tech_tags: data.techStack || [],
    excerpt: data.excerpt,
    image_url: data.featuredImage?.url || '',
    image_width: data.featuredImage?.width,
    image_height: data.featuredImage?.height,
    image_alt: data.featuredImage?.alt || data.title,
    order: data.order,
    role: data.client, // Using client name as role if applicable, or leaving blank
    timeline: data.completionDate,
    content: data.content,
    categories: data.categories,
    technologies: data.technologies,
    industries: data.industries,
    key_results: data.keyResults || [],
    seo: data.seo,
    date: data.date,
    modified: data.modified,
  };
}

function mapExperience(data: any, type: 'work' | 'education'): ExperienceItem {
  return {
    id: data.id,
    period: `${data.startDate} – ${data.endDate || (data.isCurrent ? 'Present' : '')}`,
    role: data.role || data.degree || '',
    company: data.company || data.institution || '',
    company_url: data.companyUrl || data.certificateUrl || '',
    description: data.description,
    type,
    order: data.order,
  };
}

function mapSkill(data: any): Skill {
  return {
    id: data.id,
    name: data.title,
    icon: data.icon || '',
    percentage: Number(data.percentage) || 0,
    category: typeof data.categories?.[0] === 'string' ? data.categories[0] : (data.categories?.[0]?.name || 'Core'),
    order: data.order,
  };
}

function mapTestimonial(data: any): Testimonial {
  return {
    id: data.id,
    quote: data.quote,
    author: data.clientName,
    title: data.clientPosition,
    company: data.company,
    avatar_url: data.clientImage,
    rating: Number(data.rating) || 5,
  };
}

// ─── Collection Fetchers ──────────────────────────────────────────────────────

export async function getProjects(featured?: boolean): Promise<Project[]> {
  const data = await apiFetch<any[]>(`/projects${featured ? '?featured=1' : ''}`);
  return data.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const data = await apiFetch<any>(`/projects/${slug}`);
    return mapProject(data);
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  // New CMS doesn't seem to have services explicitly in Registry.php?
  // Let's check if it's there or just use an empty array.
  try {
    return await apiFetch<Service[]>('/services');
  } catch {
    return [];
  }
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const [work, edu] = await Promise.all([
    apiFetch<any[]>('/experience').catch(() => []),
    apiFetch<any[]>('/education').catch(() => []),
  ]);
  
  return [
    ...work.map(i => mapExperience(i, 'work')),
    ...edu.map(i => mapExperience(i, 'education')),
  ].sort((a, b) => a.order - b.order);
}

export async function getSkills(): Promise<Skill[]> {
  const data = await apiFetch<any[]>('/skills');
  return data.map(mapSkill);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await apiFetch<any[]>('/testimonials');
  return data.map(mapTestimonial);
}

export async function getResume(): Promise<string | null> {
  try {
    const data = await apiFetch<any[]>('/resume');
    const generalResume = data.find(r => r.type?.toLowerCase() === 'general');
    return generalResume?.fileUrl || null;
  } catch {
    return null;
  }
}

export async function getClients(): Promise<Client[]> {
  try {
    return await apiFetch<Client[]>('/clients');
  } catch {
    return [];
  }
}

// Dummy for backwards compatibility
export async function getSiteSettings(): Promise<any> {
  try {
     const data = await apiFetch<any>('/main');
     return {
        email: data.general?.email || 'hello@adilashrafi.com',
        linkedin: data.social?.linkedin || 'https://www.linkedin.com/in/al-adil-ashrafi/',
        location: data.general?.locations?.[0]?.value || 'Mohammadpur, Dhaka',
        availability: 'Available', // Hardcoded for now or add to CMS
     };
  } catch {
    return {
      email: 'hello@adilashrafi.com',
      linkedin: 'https://www.linkedin.com/in/al-adil-ashrafi/',
      location: 'Mohammadpur, Dhaka',
      availability: 'Available',
    };
  }
}

// ─── Bulk fetch (single round-trip emulation) ────────────────────────────────

function dedupeTerms(projects: Project[], key: 'technologies' | 'industries'): TaxonomyTerm[] {
  const seen = new Map<string, TaxonomyTerm>();
  for (const project of projects) {
    for (const term of project[key] || []) {
      if (term?.slug && !seen.has(term.slug)) {
        seen.set(term.slug, { id: term.id, name: term.name, slug: term.slug });
      }
    }
  }
  return Array.from(seen.values());
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const [projects, experience, skills, testimonials, resumeUrl, clients, services, mainData] = await Promise.all([
      getProjects(),
      getExperience(),
      getSkills(),
      getTestimonials(),
      getResume(),
      getClients(),
      getServices(),
      apiFetch<any>('/main'),
    ]);

    const general = mainData.general || {};
    const homepage = mainData.homepage || {};

    const profile = {
        name: general.name || 'Al Adil Ashrafi',
        tagline: general.tagline || 'The Marketing Alchemist',
        hero_bio: homepage.hero?.description || '',
        bio: homepage.about?.description || '',
        email: general.email || 'hello@adilashrafi.com',
        phone: general.phone || '+880 1853 837221',
        location: general.locations?.[0]?.value || 'Mohammadpur, Dhaka',
        social: mainData.social || {},
    };

    const highlightedCards: HighlightedCards = {
      title: homepage.highlighted_cards?.title || '',
      subtitle: homepage.highlighted_cards?.subtitle || '',
      cards: (homepage.highlighted_cards?.cards || []).map((c: any) => ({
        id: c.id,
        title: c.title,
        subtitle: c.subtitle,
        icon: c.icon,
      })),
    };

    const seo: SiteSeo = {
      metaTitle: mainData.seo?.meta_title || '',
      metaDescription: mainData.seo?.meta_description || '',
      ogImage: mainData.seo?.og_image || '',
    };

    const techStackSection: TechStackSection = {
      title: homepage.tech_stack?.title || '',
      subtitle: homepage.tech_stack?.subtitle || '',
      description: homepage.tech_stack?.description || '',
      items: dedupeTerms(projects, 'technologies'),
    };

    const industriesSection: IndustriesSection = {
      title: homepage.industries?.title || '',
      subtitle: homepage.industries?.subtitle || '',
      description: homepage.industries?.description || '',
      items: dedupeTerms(projects, 'industries'),
    };

    const testimonialsSection: TestimonialsSectionData = {
      title: homepage.testimonials?.title || '',
      subtitle: homepage.testimonials?.subtitle || '',
      description: homepage.testimonials?.description || '',
      videoUrl: homepage.testimonials?.video_url || '',
    };

    return {
      projects,
      services,
      experience,
      skills,
      testimonials,
      clients,
      resumeUrl,
      profile,
      highlightedCards,
      seo,
      techStackSection,
      industriesSection,
      testimonialsSection,
    };
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    return {
      projects: [],
      services: [],
      experience: [],
      skills: [],
      testimonials: [],
      clients: [],
      resumeUrl: null,
      profile: {},
      highlightedCards: { title: '', subtitle: '', cards: [] },
      seo: { metaTitle: '', metaDescription: '', ogImage: '' },
      techStackSection: { title: '', subtitle: '', description: '', items: [] },
      industriesSection: { title: '', subtitle: '', description: '', items: [] },
      testimonialsSection: { title: '', subtitle: '', description: '', videoUrl: '' },
    };
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

