import { getPortfolioData } from '@/lib/api';
import { getPosts, getPostBySlug } from '@/lib/wp-posts';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { stripHtml } from '@/lib/text';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';

export const revalidate = 3600;

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, { seo: siteSeo }] = await Promise.all([getPostBySlug(slug), getPortfolioData()]);
  if (!post) return { title: 'Post Not Found' };

  const description = stripHtml(post.excerpt).slice(0, 160);
  const ogImage = post.featuredImageUrl || siteSeo?.ogImage || '/al-adil-ashrafi-saikat.png';

  return {
    title: `${post.title} | Al Adil Ashrafi`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { profile } = await getPortfolioData();
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="bg-dark min-h-screen">
      <Nav social={profile.social} />

      {/* Header Section */}
      <section className="px-6 lg:px-16 pt-40 pb-20 border-b border-[rgba(1,156,255,0.08)] relative overflow-hidden bg-dark-2">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(1,156,255,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-[800px] mx-auto relative z-10">
          {post.categories.length > 0 && (
            <RevealWrapper>
              <span
                className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-orange bg-[rgba(254,84,1,0.08)] border border-[rgba(254,84,1,0.22)] px-4 py-1.5 inline-block mb-8"
                style={{ borderRadius: '2px' }}
              >
                {post.categories[0].name}
              </span>
            </RevealWrapper>
          )}

          <RevealWrapper delay={80}>
            <h1
              className="font-display font-extrabold leading-[1.05] tracking-tight text-text mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
            >
              {post.title}
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={160}>
            <div className="flex flex-wrap gap-6 pt-6 border-t border-[rgba(1,156,255,0.1)] text-[0.85rem] text-muted">
              {post.author.name && <span>{post.author.name}</span>}
              {post.date && (
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImageUrl && (
        <div className="px-6 lg:px-16 pt-16 bg-dark">
          <div className="max-w-[900px] mx-auto">
            <RevealWrapper>
              <div className="relative w-full aspect-video overflow-hidden" style={{ borderRadius: '3px' }}>
                <Image
                  src={post.featuredImageUrl}
                  alt={post.featuredImageAlt || post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
            </RevealWrapper>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="px-6 lg:px-16 py-24 bg-dark">
        <div className="max-w-[800px] mx-auto">
          <RevealWrapper>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </RevealWrapper>

          <RevealWrapper delay={100}>
            <div className="mt-16">
              <a
                href="/blog"
                className="btn-clip-reverse inline-flex items-center gap-2 bg-[rgba(1,156,255,0.08)] text-muted font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:bg-blue hover:text-white"
              >
                ← All Posts
              </a>
            </div>
          </RevealWrapper>
        </div>
      </section>

      <Footer social={profile.social} name={profile.name} />
    </main>
  );
}
