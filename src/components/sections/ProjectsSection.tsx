import type { Project } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import Link from 'next/link';
import Image from 'next/image';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="px-6 lg:px-16 py-24 bg-dark">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeader 
            label="Projects" 
            title="Case studies &" 
            titleAccent="formulas" 
          />
        </div>

        <RevealWrapper delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}



function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group bg-dark-2 border border-[rgba(1,156,255,0.08)] relative overflow-hidden transition-all duration-300 hover:border-[rgba(1,156,255,0.25)] hover:-translate-y-1 flex flex-col h-full"
      style={{ borderRadius: '3px' }}
    >
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0" />

      {/* Featured Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden pointer-events-none">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.image_alt || project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="image-fallback-gradient absolute inset-0" />
        )}

        {project.tech_tags && project.tech_tags.length > 0 && (
          <div
            className="absolute inset-0 flex flex-wrap items-end content-end gap-1.5 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--color-dark-2) 92%, transparent), color-mix(in srgb, var(--color-dark-2) 10%, transparent) 60%)' }}
          >
            {project.tech_tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.55rem] tracking-[0.08em] uppercase text-blue bg-[rgba(1,156,255,0.1)] border border-[rgba(1,156,255,0.25)] px-2 py-0.5 backdrop-blur-sm"
                style={{ borderRadius: '2px' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Arrow */}
      <span className="absolute top-4 right-5 text-base text-muted transition-all duration-200 group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 pointer-events-none z-20">
        ↗
      </span>

      <div className="relative z-10 pointer-events-none p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-orange">
            {project.badge}
          </p>
          <span className="w-1 h-1 rounded-full bg-[rgba(1,156,255,0.3)]" />
          <p className={`font-mono text-[0.58rem] tracking-[0.16em] uppercase ${project.status === 'live' ? 'text-blue' : 'text-muted'}`}>
            {project.industry || project.status}
          </p>
        </div>

        <h3 className="font-display font-bold text-[1.25rem] text-text leading-tight mb-3">
          {project.name}
        </h3>

        <p className="text-[0.84rem] text-muted leading-[1.65] line-clamp-3">
          {project.excerpt || project.description}
        </p>
      </div>

      {project.url && (
        <div className="mt-auto relative z-20 px-7 pb-7">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[0.65rem] font-mono tracking-[0.12em] uppercase text-text border border-[rgba(1,156,255,0.15)] px-4 py-2 hover:bg-blue hover:text-white transition-all duration-200"
            style={{ borderRadius: '2px' }}
          >
            Live Link ↗
          </a>
        </div>
      )}
    </article>
  );
}
