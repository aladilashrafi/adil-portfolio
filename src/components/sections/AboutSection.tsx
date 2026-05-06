import type { SiteMeta } from '@/lib/api';
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

export function AboutSection({ meta }: { meta: SiteMeta }) {
  return (
    <section id="about" className="px-6 lg:px-16 py-24 bg-dark-2">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* Flask visual */}
          <RevealWrapper className="flex justify-center items-center lg:order-1 order-2">
      <FlaskSvg className="w-[180px] lg:w-[280px] h-auto" />
  </RevealWrapper>

  {/* Text */}
  <RevealWrapper delay={100} className="lg:order-2 order-1 text-center lg:text-left">
    <SectionHeader 
      label={meta.about_label} 
      title={meta.about_title} 
      titleAccent={meta.about_accent} 
      centered={typeof window !== 'undefined' && window.innerWidth < 1024}
    />

    <p className="text-muted mb-4 text-[0.95rem] lg:text-[1.02rem] leading-relaxed">
      I&apos;m <strong className="text-text font-medium">Al Adil Ashrafi Saikat</strong> — a 22-year-old Bangladeshi digital marketing professional, entrepreneur, and The Marketing Alchemist.
    </p>

    <p className="text-muted mb-4 text-[0.95rem] lg:text-[1.02rem] leading-relaxed">
      Just as a chemist transforms raw elements into new compounds, I transform <strong className="text-text font-medium">brands, data, and creative strategy</strong> into compounding digital growth — organic, paid, and everything in between.
    </p>

    <p className="text-muted mb-6 text-[0.95rem] lg:text-[1.02rem] leading-relaxed">
      Currently leading digital growth at <strong className="text-text font-medium">Mediusware Limited</strong>, co-founding{' '}
      <a href="https://markimist.com" target="_blank" rel="noreferrer" className="text-blue hover:underline">Markimist</a>, and building{' '}
      <a href="https://banglatrack.com" target="_blank" rel="noreferrer" className="text-blue hover:underline">Bangla Track</a> — a WooCommerce courier plugin serving Bangladesh&apos;s e-commerce market.
    </p>

    <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
              {TAGS.map((tag) => (
                <span
                  key={tag.label}
                  className={`font-mono text-[0.58rem] tracking-[0.1em] uppercase px-3 py-1.5 border ${
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

            <div
              className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-green bg-[rgba(45,206,137,0.08)] border border-[rgba(45,206,137,0.2)] px-3 py-1.5 mt-6"
              style={{ borderRadius: '2px' }}
            >
              <span className="w-[5px] h-[5px] rounded-full bg-green animate-[pulseDot_1.6s_ease_infinite]" />
              Open to freelance projects
            </div>
          </RevealWrapper>

        </div>
      </div>
    </section>
  );
}
