/**
 * lib/wp-posts.ts
 * Blog data-fetching from WordPress's core REST API (wp/v2), separate from
 * the custom hpcms/v1 plugin API in lib/api.ts — no blog CPT exists in the
 * plugin, so WordPress's built-in Posts serve this instead.
 */

const WP_CORE_API =
  process.env.NEXT_PUBLIC_WP_CORE_API ?? 'https://api.adilashrafi.com/wp-json/wp/v2';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  author: { name: string; avatarUrl: string };
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
}

async function coreFetch<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${WP_CORE_API}${path}`, {
    next: { revalidate },
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`WP Core API error ${res.status} on ${path}`);
  }

  return res.json() as Promise<T>;
}

function mapPost(data: any): BlogPost {
  const embedded = data._embedded || {};
  const featuredMedia = embedded['wp:featuredmedia']?.[0];
  const author = embedded.author?.[0];
  const terms: any[][] = embedded['wp:term'] || [];
  const categories = (terms.find((group) => group?.[0]?.taxonomy === 'category') || [])
    .map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }));
  const tags = (terms.find((group) => group?.[0]?.taxonomy === 'post_tag') || [])
    .map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }));

  return {
    id: data.id,
    slug: data.slug,
    title: data.title?.rendered || '',
    excerpt: data.excerpt?.rendered || '',
    content: data.content?.rendered || '',
    date: data.date,
    modified: data.modified,
    featuredImageUrl: featuredMedia?.source_url || '',
    featuredImageAlt: featuredMedia?.alt_text || '',
    author: {
      name: author?.name || '',
      avatarUrl: author?.avatar_urls?.['96'] || '',
    },
    categories,
    tags,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const data = await coreFetch<any[]>('/posts?_embed=1&per_page=20&orderby=date&order=desc');
    return data.map(mapPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await coreFetch<any[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed=1`);
    return data[0] ? mapPost(data[0]) : null;
  } catch {
    return null;
  }
}
