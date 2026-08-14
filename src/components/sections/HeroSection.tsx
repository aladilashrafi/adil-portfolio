import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { AtomSvg } from '@/components/ui/AtomSvg';
import DynamicIcon from '@/components/ui/DynamicIcon';
import type { HighlightedCards } from '@/lib/api';

const FALLBACK_STATS = [
  { id: 'years', title: '4+', subtitle: 'Years of Experience', icon: '' },
  { id: 'brands', title: '30+', subtitle: 'Brands Scaled', icon: '' },
  { id: 'products', title: '3', subtitle: 'Products Built', icon: '' },
];

export function HeroSection({
  resumeUrl,
  profile,
  highlightedCards,
}: {
  resumeUrl: string | null;
  profile: any;
  highlightedCards?: HighlightedCards;
}) {
  const nameParts = (profile.name || 'Al Adil Ashrafi').split(' ');
  const firstName = nameParts.slice(0, -1).join(' ');
  const lastName = nameParts.slice(-1)[0];

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
        {/* Mobile Atom (subtle background visual) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] opacity-[0.35] pointer-events-none md:hidden">
          <AtomSvg />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 relative z-10">
          <div className="max-w-[620px] mx-auto md:mx-0 text-center md:text-left">
            <RevealWrapper>
              <div className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-blue bg-[rgba(1,156,255,0.08)] border border-[rgba(1,156,255,0.22)] px-4 py-1.5 mb-8" style={{ borderRadius: '2px' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue animate-[pulseDot_2s_ease_infinite]" />
                Available · {profile.location || 'Mohammadpur, Dhaka'}
              </div>
            </RevealWrapper>

            <RevealWrapper delay={100}>
              <h1
                className="font-display font-extrabold leading-[0.93] mb-1"
                style={{ fontSize: 'clamp(2.8rem, 10vw, 5.8rem)', letterSpacing: '-0.04em' }}
              >
                {firstName} <span className="text-blue">{lastName}</span>
              </h1>
            </RevealWrapper>

            <RevealWrapper delay={200}>
              <p
                className="font-display italic text-muted mb-4"
                style={{ fontSize: 'clamp(1.4rem, 5vw, 2.6rem)', letterSpacing: '-0.025em' }}
              >
                {profile.tagline || 'The Marketing Alchemist'}
              </p>
            </RevealWrapper>

            <RevealWrapper delay={300}>
              <p className="font-mono text-[0.68rem] lg:text-[0.72rem] tracking-[0.08em] text-muted flex items-center justify-center md:justify-start gap-3 mb-7">
                <span className="w-5 lg:w-7 h-px bg-muted inline-block" />
                Mktg + Sales = Growth
              </p>
            </RevealWrapper>

            <RevealWrapper delay={400}>
              <div 
                className="text-[0.95rem] lg:text-[1.05rem] text-muted leading-[1.8] max-w-[500px] mx-auto md:mx-0 mb-9 [&_strong]:text-text [&_strong]:font-medium [&_a]:text-blue [&_a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: profile.hero_bio || 'Digital marketing specialist who blends data-driven strategy with creative precision.' }}
              />
            </RevealWrapper>

            <RevealWrapper delay={500}>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap mb-12">
                <a
                  href="#contact"
                  className="btn-clip inline-flex items-center gap-2 bg-blue text-white font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:bg-[#0088e0] hover:-translate-y-px"
                  style={{ borderRadius: '2px' }}
                >
                  Let's Work →
                </a>
                <a
                  href={resumeUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-clip-reverse inline-flex items-center gap-2 bg-[rgba(254,84,1,0.12)] text-orange font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all duration-200 hover:bg-orange hover:text-white"
                  style={{ borderRadius: '2px' }}
                >
                  View Resume
                </a>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={600}>
              <div className="flex flex-wrap gap-6 lg:gap-10 justify-center md:justify-start pt-7 border-t border-[rgba(1,156,255,0.1)]">
                {(highlightedCards?.cards?.length ? highlightedCards.cards : FALLBACK_STATS).map((card) => (
                  <div key={card.id} className="text-center">
                    {card.icon && (
                      <DynamicIcon name={card.icon} className="text-blue mb-1.5 mx-auto" size={20} strokeWidth={1.75} />
                    )}
                    <div className="font-display font-extrabold text-[1.8rem] lg:text-[2rem] text-blue leading-none mb-1">
                      {card.title}
                    </div>
                    <div className="font-mono text-[0.55rem] lg:text-[0.6rem] tracking-[0.14em] uppercase text-muted max-w-[150px] mx-auto">
                      {card.subtitle}
                    </div>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>

          {/* Atom SVG Col */}
          <div className="relative hidden md:flex justify-center">
            <div className="w-[450px] lg:w-[600px] h-[450px] lg:h-[600px]">
              <AtomSvg />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
