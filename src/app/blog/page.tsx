import { getPortfolioData } from '@/lib/api';
import { getPosts } from '@/lib/wp-posts';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { stripHtml } from '@/lib/text';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog — Al Adil Ashrafi',
  description: 'Articles and insights on digital marketing, growth strategy, and building products by Al Adil Ashrafi.',
};

export default async function BlogPage() {
  const [{ profile }, posts] = await Promise.all([getPortfolioData(), getPosts()]);

  return (
    <main className="bg-dark min-h-screen">
      <Nav social={profile.social} />

      {/* Page Header */}
      <section className="px-6 lg:px-16 pt-40 pb-10 bg-dark-2 border-b border-[rgba(1,156,255,0.08)]">
        <div className="max-w-[1200px] mx-auto text-center">
          <RevealWrapper>
            <p className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-orange flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-orange inline-block" />
              Writing
              <span className="w-8 h-px bg-orange inline-block" />
            </p>
          </RevealWrapper>

          <RevealWrapper delay={80}>
            <h1
              className="font-display font-extrabold leading-[1.05] tracking-tight text-text mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}
            >
              From the <span className="text-blue">Blog</span>
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={160}>
            <p className="font-body text-[1.1rem] text-muted max-w-2xl mx-auto">
              Notes on marketing, growth strategy, and building products.
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* Posts Grid / Empty State */}
      <section className="px-6 lg:px-16 py-24 bg-dark">
        <div className="max-w-[1200px] mx-auto">
          {posts.length > 0 ? (
            <RevealWrapper delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-dark-2 border border-[rgba(1,156,255,0.08)] relative overflow-hidden transition-all duration-300 hover:border-[rgba(1,156,255,0.25)] hover:-translate-y-1 flex flex-col h-full"
                    style={{ borderRadius: '3px' }}
                  >
                    <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0" />

                    <div className="relative w-full aspect-[16/10] overflow-hidden pointer-events-none">
                      {post.featuredImageUrl ? (
                        <Image
                          src={post.featuredImageUrl}
                          alt={post.featuredImageAlt || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="image-fallback-gradient absolute inset-0" />
                      )}
                    </div>

                    <div className="relative z-10 pointer-events-none p-7 flex-1 flex flex-col">
                      {post.categories.length > 0 && (
                        <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-orange mb-4">
                          {post.categories[0].name}
                        </p>
                      )}
                      <h3 className="font-display font-bold text-[1.25rem] text-text leading-tight mb-3">
                        {post.title}
                      </h3>
                      <p className="text-[0.84rem] text-muted leading-[1.65] line-clamp-3">
                        {stripHtml(post.excerpt)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </RevealWrapper>
          ) : (
            <RevealWrapper>
              <div className="text-center py-16 border border-dashed border-[rgba(1,156,255,0.15)]" style={{ borderRadius: '3px' }}>
                <p className="font-display font-bold text-[1.4rem] text-text mb-2">No posts yet</p>
                <p className="text-muted text-[0.95rem]">Check back soon for articles and insights.</p>
              </div>
            </RevealWrapper>
          )}
        </div>
      </section>

      <Footer social={profile.social} name={profile.name} />
    </main>
  );
}
