import { getPortfolioData } from '@/lib/api';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Projects & Case Studies — Al Adil Ashrafi',
  description: 'Portfolio of digital marketing projects, WooCommerce plugins, and agency work by Al Adil Ashrafi.',
};

export default async function ProjectsPage() {
  const { projects, profile } = await getPortfolioData();

  return (
    <main className="bg-dark min-h-screen">
      <Nav social={profile.social} />
      
      {/* Page Header */}
      <section className="px-6 lg:px-16 pt-40 pb-10 bg-dark-2 border-b border-[rgba(1,156,255,0.08)]">
        <div className="max-w-[1200px] mx-auto text-center">
          <RevealWrapper>
            <p className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-orange flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-orange inline-block" />
              Portfolio
              <span className="w-8 h-px bg-orange inline-block" />
            </p>
          </RevealWrapper>
          
          <RevealWrapper delay={80}>
            <h1 className="font-display font-extrabold leading-[1.05] tracking-tight text-text mb-6"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}>
              Selected <span className="text-blue">Work</span>
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={160}>
            <p className="font-body text-[1.1rem] text-muted max-w-2xl mx-auto">
              A collection of marketing campaigns, scalable products, and growth strategies that turned complex challenges into revenue.
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="-mt-16">
        <ProjectsSection projects={projects} />
      </div>

      <Footer social={profile.social} name={profile.name} />
    </main>
  );
}
