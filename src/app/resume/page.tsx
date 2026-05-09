import { getExperience, getSkills, getSiteSettings } from '@/lib/api';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Resume — Al Adil Ashrafi',
  description: 'Professional resume of Al Adil Ashrafi — digital marketing professional, SEO lead, and entrepreneur based in Dhaka, Bangladesh.',
};

export default async function ResumePage() {
  const [experience, skills, meta] = await Promise.all([
    getExperience(),
    getSkills(),
    getSiteSettings(),
  ]);

  const work = experience.filter(e => e.type === 'work');
  const edu  = experience.filter(e => e.type === 'education');

  return (
    <main>
      <Nav />
      <section className="px-8 md:px-16 pt-32 pb-24 relative z-10 max-w-screen-lg mx-auto">

        {/* Header */}
        <RevealWrapper>
          <div className="border-b border-[rgba(1,156,255,0.08)] pb-10 mb-14">
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-blue mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-blue" />Curriculum Vitae
            </p>
            <h1 className="font-display font-extrabold text-[3rem] md:text-[4.5rem] leading-none tracking-tight mb-3">
              Al Adil Ashrafi
            </h1>
            <p className="font-display italic text-[1.2rem] text-muted mb-5">The Marketing Alchemist</p>
            <div className="flex flex-wrap gap-5 font-mono text-[0.65rem] tracking-[0.1em] text-muted">
              <a href={`mailto:${meta.email}`} className="hover:text-blue transition-colors">{meta.email}</a>
              <a href={meta.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue transition-colors">LinkedIn</a>
              <span>{meta.location}</span>
              <span className="text-green">{meta.availability}</span>
            </div>
          </div>
        </RevealWrapper>

        {/* Skills */}
        <RevealWrapper delay={80}>
          <div className="mb-14">
            <h2 className="font-mono font-bold text-[0.7rem] tracking-[0.2em] uppercase text-orange mb-6">Core Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map(skill => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-display text-[0.85rem] font-semibold text-text">{skill.name}</span>
                    <span className="font-mono text-[0.62rem] text-blue">{skill.percentage}%</span>
                  </div>
                  <div className="h-[2px] bg-[rgba(1,156,255,0.1)]">
                    <div
                      className="h-full bg-blue"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>

        {/* Work */}
        <RevealWrapper delay={140}>
          <div className="mb-14">
            <h2 className="font-mono font-bold text-[0.7rem] tracking-[0.2em] uppercase text-orange mb-6">Work History</h2>
            <div className="flex flex-col divide-y divide-[rgba(1,156,255,0.08)]">
              {work.map(item => (
                <div key={item.id} className="py-7 pl-5 relative">
                  <span className="absolute left-0 top-7 w-2 h-2 border border-blue rotate-45" />
                  <div className="flex flex-wrap justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-[1rem] text-text">{item.role}</h3>
                    <span className="font-mono text-[0.62rem] text-muted">{item.period}</span>
                  </div>
                  {item.company_url ? (
                    <a href={item.company_url} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.68rem] text-blue tracking-[0.06em] mb-2 hover:underline inline-block">
                      {item.company}
                    </a>
                  ) : (
                    <p className="font-mono text-[0.68rem] text-blue tracking-[0.06em] mb-2">{item.company}</p>
                  )}
                  <p className="text-[0.82rem] text-muted leading-[1.7]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>

        {/* Education */}
        <RevealWrapper delay={200}>
          <div>
            <h2 className="font-mono font-bold text-[0.7rem] tracking-[0.2em] uppercase text-orange mb-6">Education & Certifications</h2>
            <div className="flex flex-col divide-y divide-[rgba(1,156,255,0.08)]">
              {edu.map(item => (
                <div key={item.id} className="py-7 pl-5 relative">
                  <span className="absolute left-0 top-7 w-2 h-2 border border-blue rotate-45" />
                  <div className="flex flex-wrap justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-[1rem] text-text">{item.role}</h3>
                    <span className="font-mono text-[0.62rem] text-muted">{item.period}</span>
                  </div>
                  {item.company_url ? (
                    <a href={item.company_url} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.68rem] text-blue tracking-[0.06em] mb-2 hover:underline inline-block">
                      {item.company}
                    </a>
                  ) : (
                    <p className="font-mono text-[0.68rem] text-blue tracking-[0.06em] mb-2">{item.company}</p>
                  )}
                  <p className="text-[0.82rem] text-muted leading-[1.7]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={260}>
          <div className="mt-14 pt-10 border-t border-[rgba(1,156,255,0.08)] flex gap-4">
            <a href="/" className="btn-clip inline-flex items-center gap-2 bg-blue text-white font-mono text-[0.7rem] tracking-[0.14em] uppercase px-8 py-3.5 hover:bg-[#0088e0] transition-all duration-250">
              ← Back to Portfolio
            </a>
          </div>
        </RevealWrapper>

      </section>
      <Footer />
    </main>
  );
}
