import { getProjectBySlug, getProjects, getSiteSettings } from '@/lib/api';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 3600;

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.name} — Case Study | Al Adil Ashrafi`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, meta] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);

  if (!project) notFound();

  return (
    <main className="bg-dark min-h-screen">
      <Nav meta={meta} />
      
      {/* Header Section */}
      <section className="px-6 lg:px-16 pt-40 pb-20 border-b border-[rgba(1,156,255,0.08)] relative overflow-hidden bg-dark-2">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(1,156,255,0.08) 0%, transparent 60%)',
          }}
        />
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          <RevealWrapper>
            <span className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-orange bg-[rgba(254,84,1,0.08)] border border-[rgba(254,84,1,0.22)] px-4 py-1.5 inline-block mb-8" style={{ borderRadius: '2px' }}>
              {project.badge}
            </span>
          </RevealWrapper>

          <RevealWrapper delay={80}>
            <h1 className="font-display font-extrabold leading-[1.05] tracking-tight text-text mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              {project.name}
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={160}>
            <p className="font-body text-[1.1rem] text-muted leading-[1.8] max-w-3xl mb-12">
              {project.description}
            </p>
          </RevealWrapper>

          <RevealWrapper delay={220}>
            <div className="flex flex-wrap gap-12 pt-10 border-t border-[rgba(1,156,255,0.1)]">
              <div>
                <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted mb-2">Role</p>
                <p className="font-display font-bold text-text text-[0.95rem]">{project.role || 'Lead Strategist'}</p>
              </div>
              <div>
                <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted mb-2">Timeline</p>
                <p className="font-display font-bold text-text text-[0.95rem]">{project.timeline || '2023 - Present'}</p>
              </div>
              <div>
                <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-muted mb-2">Status</p>
                <p className="font-display font-bold text-blue text-[0.95rem] capitalize">{project.status}</p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 lg:px-16 py-24 bg-dark">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
          
          <div className="order-2 lg:order-1">
            <RevealWrapper>
              <h2 className="font-display font-bold text-[2rem] text-text mb-6">About the Project</h2>
              <div 
                className="prose prose-invert max-w-none prose-p:text-muted prose-p:leading-[1.8] prose-h3:text-text prose-h3:font-display prose-a:text-blue"
                dangerouslySetInnerHTML={{ __html: project.content || '<p>Detailed case study content is being updated. Check back soon for the full breakdown of strategy, execution, and results.</p>' }}
              />
            </RevealWrapper>
            
            <RevealWrapper delay={100}>
              <div className="mt-16 flex flex-wrap gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-clip inline-flex items-center gap-2 bg-blue text-white font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:bg-[#0088e0] hover:-translate-y-px"
                >
                  {project.status === 'development' ? 'Follow Progress →' : 'Visit Live Project →'}
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 border border-border-blue text-muted font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:border-blue hover:text-text"
                >
                  ← All Projects
                </a>
              </div>
            </RevealWrapper>
          </div>

          {/* Sidebar */}
          <div className="order-1 lg:order-2">
            {project.tech_tags && project.tech_tags.length > 0 && (
              <RevealWrapper delay={150}>
                <div className="bg-dark-2 border border-border p-8 mb-8">
                  <h3 className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-orange mb-6 flex items-center gap-3">
                    <span className="w-4 h-px bg-orange" />
                    Stack & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_tags.map(tag => (
                      <span key={tag} className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-text bg-[rgba(255,255,255,0.03)] border border-border px-3 py-1.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealWrapper>
            )}
            
            <RevealWrapper delay={200}>
              <div className="bg-dark-2 border border-border p-8">
                <h3 className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-orange mb-6 flex items-center gap-3">
                  <span className="w-4 h-px bg-orange" />
                  Key Results
                </h3>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  <li className="flex items-start gap-3">
                    <span className="text-blue mt-1">✓</span>
                    <span className="text-muted text-[0.9rem] leading-[1.6]">Performance metrics updating soon</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue mt-1">✓</span>
                    <span className="text-muted text-[0.9rem] leading-[1.6]">Growth statistics pending</span>
                  </li>
                </ul>
              </div>
            </RevealWrapper>
          </div>

        </div>
      </section>

      <Footer meta={meta} />
    </main>
  );
}
