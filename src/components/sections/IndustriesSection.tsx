import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { IndustriesSection as IndustriesSectionData } from '@/lib/api';

export function IndustriesSection({ section }: { section?: IndustriesSectionData }) {
  const items = section?.items || [];
  if (items.length === 0) return null;

  return (
    <section id="industries" className="px-6 lg:px-16 py-24 bg-dark">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label={section?.subtitle || 'Domains'}
          title={section?.title || 'Industries'}
          titleAccent="Served"
          centered
        />

        <RevealWrapper delay={100}>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {items.map((industry) => (
              <span
                key={industry.slug}
                className="font-mono text-[0.72rem] tracking-[0.08em] uppercase text-orange bg-[rgba(254,84,1,0.06)] border border-[rgba(254,84,1,0.2)] px-5 py-2.5 hover:bg-[rgba(254,84,1,0.12)] transition-colors duration-200"
                style={{ borderRadius: '2px' }}
              >
                {industry.name}
              </span>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
