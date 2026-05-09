import type { Project } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

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
          <RevealWrapper delay={80}>
            <a
              href="https://adilashrafi.com"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-blue border-b border-[rgba(1,156,255,0.3)] pb-0.5 transition-colors duration-200 hover:border-blue hidden md:inline-block"
            >
              View all →
            </a>
          </RevealWrapper>
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
  const Wrapper = project.url ? 'a' : 'div';
  const linkProps = project.url
    ? { href: project.url, target: '_blank' as const, rel: 'noreferrer' }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="group bg-dark-2 border border-[rgba(1,156,255,0.08)] p-7 relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-[rgba(1,156,255,0.25)] hover:-translate-y-1 block"
      style={{ borderRadius: '3px' }}
    >
      {/* Arrow */}
      <span className="absolute top-4 right-5 text-base text-muted transition-all duration-200 group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>

      <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-orange mb-3">
        {project.badge}
      </p>

      <h3 className="font-display font-bold text-[1.25rem] text-text leading-tight mb-3">
        {project.name}
      </h3>

      <p className="text-[0.84rem] text-muted leading-[1.65] mb-5">
        {project.description}
      </p>

      {project.tech_tags && project.tech_tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tech_tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.58rem] tracking-[0.08em] uppercase text-blue bg-[rgba(1,156,255,0.08)] border border-[rgba(1,156,255,0.15)] px-2 py-0.5"
              style={{ borderRadius: '2px' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Wrapper>
  );
}
