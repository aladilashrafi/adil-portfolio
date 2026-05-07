import type { Service } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="px-6 lg:px-16 py-24 bg-dark">
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionHeader 
            label="Services" 
            title="The compounds I" 
            titleAccent="create" 
          />
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12"
            style={{
              gap: '1px',
              border: '1px solid rgba(1,156,255,0.08)',
              background: 'rgba(1,156,255,0.06)',
            }}
          >
            {services.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

function ServiceCard({ svc }: { svc: Service; index: number }) {
  return (
    <div className="group bg-dark p-7 relative overflow-hidden transition-colors duration-300 cursor-default hover:bg-dark-3">
      {/* Bottom blue bar on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      />

      <p className="font-mono text-[0.58rem] tracking-[0.16em] text-orange mb-4">
        {svc.num}
      </p>

      <span className="text-[1.4rem] mb-3 block">
        {svc.icon}
      </span>

      <h3 className="font-display font-bold text-base text-text leading-tight mb-3">
        {svc.name}
      </h3>

      <p className="text-[0.84rem] text-muted leading-[1.65]">
        {svc.description}
      </p>
    </div>
  );
}
