import type { Testimonial } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="px-6 lg:px-16 py-24 bg-dark-2">
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionHeader 
            label="Testimonials" 
            title="Peer" 
            titleAccent="review" 
          />
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((t, i) => (
            <RevealWrapper key={t.id} delay={100 + i * 100}>
              <div className="bg-dark border border-[rgba(1,156,255,0.08)] p-8 relative" style={{ borderRadius: '4px' }}>
                <span className="absolute top-6 left-6 text-[3rem] text-[rgba(1,156,255,0.06)] leading-none font-display">"</span>
                <p className="text-[0.92rem] text-muted leading-relaxed relative z-10 mb-8 italic">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  {t.avatar_url && (
                    <img 
                      src={t.avatar_url} 
                      alt={t.author} 
                      className="w-10 h-10 rounded-full border border-[rgba(1,156,255,0.2)]"
                    />
                  )}
                  <div>
                    <h4 className="font-display font-bold text-sm text-text">{t.author}</h4>
                    <p className="font-mono text-[0.58rem] tracking-[0.05em] uppercase text-blue mt-0.5">
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
