'use client';

import { useRef } from 'react';
import type { Testimonial, TestimonialsSectionData } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

function getEmbedUrl(url: string): string | null {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="bg-dark border border-[rgba(1,156,255,0.08)] p-8 relative flex-shrink-0 w-[85vw] sm:w-[380px] snap-start"
      style={{ borderRadius: '4px' }}
    >
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
  );
}

export function TestimonialsSection({
  testimonials,
  section,
}: {
  testimonials: Testimonial[];
  section?: TestimonialsSectionData;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!testimonials || testimonials.length === 0) return null;

  const embedUrl = section?.videoUrl ? getEmbedUrl(section.videoUrl) : null;

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="px-6 lg:px-16 py-24 bg-dark-2">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
          <SectionHeader
            label={section?.subtitle || 'Testimonials'}
            title={section?.title || 'Peer'}
            titleAccent="review"
          />
          {testimonials.length > 2 && (
            <div className="hidden md:flex gap-3 mb-12">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Previous testimonials"
                className="w-10 h-10 flex items-center justify-center border border-[rgba(1,156,255,0.15)] text-muted hover:border-blue hover:text-blue transition-colors duration-200"
                style={{ borderRadius: '2px' }}
              >
                ←
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Next testimonials"
                className="w-10 h-10 flex items-center justify-center border border-[rgba(1,156,255,0.15)] text-muted hover:border-blue hover:text-blue transition-colors duration-200"
                style={{ borderRadius: '2px' }}
              >
                →
              </button>
            </div>
          )}
        </div>

        {embedUrl && (
          <RevealWrapper>
            <div className="relative w-full aspect-video overflow-hidden mb-12" style={{ borderRadius: '4px' }}>
              <iframe
                src={embedUrl}
                title="Testimonial video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </RevealWrapper>
        )}

        <RevealWrapper delay={100}>
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
