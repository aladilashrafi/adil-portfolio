import type { SiteMeta } from '@/lib/api';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { AtomSvg } from '@/components/ui/AtomSvg';

export function HeroSection({ meta }: { meta: SiteMeta }) {
  return (
    <section id="hero" className="min-h-screen flex items-center px-6 lg:px-16 pt-32 pb-20 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(1,156,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(1,156,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 72% 50%, black 30%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 72% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          right: '-80px', top: '-80px', width: '580px', height: '580px',
          background: 'radial-gradient(circle, rgba(1,156,255,0.11) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          right: '260px', bottom: '60px', width: '260px', height: '260px',
          background: 'radial-gradient(circle, rgba(254,84,1,0.09) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative">
        {/* Atom SVG - desktop only */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-65 pointer-events-none hidden lg:block">
          <AtomSvg />
        </div>

        {/* Mobile Atom (smaller, background) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-40 pointer-events-none lg:hidden">
          <AtomSvg />
        </div>

        <div className="relative z-[2] max-w-[620px] mx-auto lg:mx-0 text-center lg:text-left">
          <RevealWrapper>
            <div className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-blue bg-[rgba(1,156,255,0.08)] border border-[rgba(1,156,255,0.22)] px-4 py-1.5 mb-8" style={{ borderRadius: '2px' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-[pulseDot_2s_ease_infinite]" />
              Available · Dhaka, BD
            </div>
          </RevealWrapper>

          <RevealWrapper delay={100}>
            <h1
              className="font-display font-extrabold leading-[0.93] mb-1"
              style={{ fontSize: 'clamp(2.8rem, 10vw, 5.8rem)', letterSpacing: '-0.04em' }}
            >
              Al Adil<br />
              <span className="text-blue">Ashrafi</span>
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={200}>
            <p
              className="font-display italic text-muted mb-4"
              style={{ fontSize: 'clamp(1.4rem, 5vw, 2.6rem)', letterSpacing: '-0.025em' }}
            >
              The Marketing Alchemist
            </p>
          </RevealWrapper>

          <RevealWrapper delay={300}>
            <p className="font-mono text-[0.68rem] lg:text-[0.72rem] tracking-[0.08em] text-muted flex items-center justify-center lg:justify-start gap-3 mb-7">
              <span className="w-5 lg:w-7 h-px bg-muted inline-block" />
              Mktg + Chem = Growth
            </p>
          </RevealWrapper>

          <RevealWrapper delay={400}>
            <p className="text-[0.95rem] lg:text-[1.05rem] text-muted leading-[1.8] max-w-[500px] mx-auto lg:mx-0 mb-9"
               dangerouslySetInnerHTML={{ __html: meta.bio }} />
          </RevealWrapper>

          <RevealWrapper delay={500}>
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap mb-12">
              <a
                href={meta.cta_primary_href}
                className="btn-clip inline-flex items-center gap-2 bg-blue text-white font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:bg-[#0088e0] hover:-translate-y-px"
                style={{ borderRadius: '2px' }}
              >
                {meta.cta_primary_label}
              </a>
              <a
                href={meta.cta_secondary_href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-orange text-orange font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:bg-orange hover:text-white"
                style={{ borderRadius: '2px' }}
              >
                {meta.cta_secondary_label}
              </a>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={600}>
            <div className="flex gap-6 lg:gap-10 justify-center lg:justify-start pt-7 border-t border-[rgba(1,156,255,0.1)] flex-wrap">
              <div>
                <div className="font-display font-extrabold text-[1.8rem] lg:text-[2rem] text-blue leading-none mb-1">{meta.stat_1_value}</div>
                <div className="font-mono text-[0.55rem] lg:text-[0.6rem] tracking-[0.14em] uppercase text-muted">{meta.stat_1_label}</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-[1.8rem] lg:text-[2rem] text-blue leading-none mb-1">{meta.stat_2_value}</div>
                <div className="font-mono text-[0.55rem] lg:text-[0.6rem] tracking-[0.14em] uppercase text-muted">{meta.stat_2_label}</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-[1.8rem] lg:text-[2rem] text-blue leading-none mb-1">{meta.stat_3_value}</div>
                <div className="font-mono text-[0.55rem] lg:text-[0.6rem] tracking-[0.14em] uppercase text-muted">{meta.stat_3_label}</div>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
