import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { TechStackSection as TechStackSectionData } from '@/lib/api';

export function TechStackSection({ section }: { section?: TechStackSectionData }) {
  const items = section?.items || [];
  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <section id="tech-stack" className="px-6 lg:px-16 py-24 bg-dark-2 border-t border-[rgba(1,156,255,0.08)]">
      <div className="max-w-[1200px] mx-auto mb-12">
        <SectionHeader
          label={section?.subtitle || 'Toolkit'}
          title={section?.title || 'Tech'}
          titleAccent="Stack"
        />
      </div>

      <RevealWrapper>
        <div className="overflow-hidden border-t border-b border-[rgba(1,156,255,0.08)] py-8 -mx-6 lg:-mx-16">
          <div className="flex gap-4 animate-marquee items-center" style={{ width: 'max-content' }}>
            {doubled.map((tech, i) => (
              <span
                key={`${tech.slug}-${i}`}
                className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-text bg-[rgba(1,156,255,0.06)] border border-[rgba(1,156,255,0.15)] px-4 py-2.5 whitespace-nowrap hover:border-blue hover:text-blue transition-colors duration-200"
                style={{ borderRadius: '3px' }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
