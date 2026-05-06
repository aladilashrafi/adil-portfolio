import type { Testimonial, SiteMeta } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

export function TestimonialsSection({ testimonials, meta }: { testimonials: Testimonial[]; meta: SiteMeta }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="px-6 lg:px-16 py-24 bg-dark-2 border-t border-[rgba(1,156,255,0.08)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionHeader 
            label={meta.testimonials_label} 
            title={meta.testimonials_title} 
            titleAccent={meta.testimonials_accent} 
          />
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <RevealWrapper key={t.id} delay={i * 80}>
              <div
                className="group bg-dark border border-[rgba(1,156,255,0.08)] p-8 relative overflow-hidden
                           hover:border-[rgba(1,156,255,0.25)] transition-colors duration-300"
                style={{ borderRadius: '3px' }}
              >
                {/* Top gradient bar on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, #019cff, #fe5401)' }}
                />

                {/* Quote mark */}
                <span
                  className="font-display text-[5rem] leading-none absolute -top-2 left-5 pointer-events-none"
                  style={{ color: 'rgba(1,156,255,0.1)' }}
                  aria-hidden
                >
                  &ldquo;
                </span>

                <blockquote className="italic text-[0.9rem] text-muted leading-[1.8] mb-6 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 relative z-10">
                  {t.avatar_url ? (
                    <img
                      src={t.avatar_url}
                      alt={t.author}
                      className="w-9 h-9 rounded-full object-cover border border-[rgba(1,156,255,0.15)]"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue to-orange flex items-center justify-center font-display font-bold text-white text-sm">
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-display font-semibold text-[0.82rem] text-text">
                      {t.author}
                    </p>
                    <p className="font-mono text-[0.6rem] text-muted tracking-[0.08em]">
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
