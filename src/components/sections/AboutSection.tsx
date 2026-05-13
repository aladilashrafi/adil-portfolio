import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { FlaskSvg } from '@/components/ui/FlaskSvg';

const TAGS = [
  { label: 'SEO & AEO',         variant: 'blue' as const },
  { label: 'Paid Advertising',  variant: 'orange' as const },
  { label: 'E-commerce',        variant: 'blue' as const },
  { label: 'WordPress Dev',     variant: 'orange' as const },
  { label: 'Content Strategy',  variant: 'blue' as const },
  { label: 'Brand Building',    variant: 'orange' as const },
  { label: 'Team Leadership',   variant: 'blue' as const },
  { label: 'Growth Strategy',   variant: 'orange' as const },
];

export function AboutSection({ profile }: { profile: any }) {
  return (
    <section id="about" className="px-6 md:px-16 py-24 bg-dark-2">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="relative order-2 md:order-1 flex justify-center">
            <RevealWrapper>
              <FlaskSvg />
            </RevealWrapper>
          </div>

          <div className="order-1 md:order-2 text-center md:text-left">
            <SectionHeader 
              label="About" 
              title="Where marketing" 
              titleAccent="meets growth" 
            />

            <RevealWrapper delay={200}>
              <div 
                className="mt-8 space-y-5 text-[0.98rem] text-muted leading-relaxed [&_strong]:text-text [&_a]:text-blue [&_a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: profile.bio || 'I transform brands, data, and creative strategy into compounding digital growth.' }}
              />
            </RevealWrapper>

            <RevealWrapper delay={300}>
            <div className="flex flex-wrap gap-2.5 mt-9 justify-center md:justify-start">
                {TAGS.map((tag) => (
                  <span
                    key={tag.label}
                    className={`font-mono text-[0.62rem] tracking-[0.08em] uppercase border px-3 py-1.5 ${
                      tag.variant === 'blue'
                        ? 'text-blue border-[rgba(1,156,255,0.3)] bg-[rgba(1,156,255,0.06)]'
                        : 'text-orange border-[rgba(254,84,1,0.3)] bg-[rgba(254,84,1,0.06)]'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </RevealWrapper>

            <RevealWrapper delay={400}>
              <div className="inline-flex items-center gap-2.5 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-green bg-[rgba(45,206,137,0.08)] border border-[rgba(45,206,137,0.2)] px-4 py-2 mt-8 mx-auto md:mx-0" style={{ borderRadius: '2px' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-[pulseDot_1.6s_ease_infinite]" />
                Open to freelance projects
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
