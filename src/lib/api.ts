/**
 * lib/api.ts
 * All data-fetching functions for the Adil Portfolio Next.js frontend.
 */

const WP_API = process.env.NEXT_PUBLIC_WP_API ?? 'https://adilashrafi.com/wp-json/adil/v1';

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
  order: number;
  role?: string;
  timeline?: string;
  content?: string;
  categories?: any[];
  key_results?: string[];
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

// ─── Collection Fetchers ──────────────────────────────────────────────────────

export async function getProjects(featured?: boolean): Promise<Project[]> {
  return apiFetch<Project[]>(`/projects${featured ? '?featured=1' : ''}`);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/projects/${slug}`);
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  return apiFetch<Service[]>('/services');
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return apiFetch<ExperienceItem[]>('/experience');
}

export async function getSkills(): Promise<Skill[]> {
  return apiFetch<Skill[]>('/skills');
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>('/testimonials');
}

// Dummy for backwards compatibility in other pages (meta removed from CMS)
export async function getSiteSettings(): Promise<any> {
  return {
    email: 'hello@adilashrafi.com',
    linkedin: 'https://www.linkedin.com/in/al-adil-ashrafi/',
    location: 'Mohammadpur, Dhaka',
    availability: 'Available',
  };
}

// ─── Bulk fetch (single round-trip — used by homepage SSG) ───────────────────

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const data = await apiFetch<PortfolioData>('/portfolio', 3600);
    return {
      projects: data.projects || [],
      services: data.services || [],
      experience: data.experience || [],
      skills: data.skills || [],
      testimonials: data.testimonials || [],
      clients: data.clients || [],
    };
  } catch {
    return {
      projects: [],
      services: [],
      experience: [],
      skills: [],
      testimonials: [],
      clients: [],
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
