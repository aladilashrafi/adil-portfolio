import type { ExperienceItem, Skill } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

export function ExperienceSection({ experience, skills }: { experience: ExperienceItem[]; skills: Skill[] }) {
  const education = experience.filter(item => item.type === 'education');
  const work = experience.filter(item => item.type === 'work');

  return (
    <section id="experience" className="px-6 md:px-16 py-24 bg-dark-2">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left Column: Education & Skills */}
          <div>
            <SectionHeader 
              label="Experience" 
              title="The reaction" 
              titleAccent="history" 
            />

            {/* Education */}
            <div className="mt-12">
              <RevealWrapper delay={100}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                  <span className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted">Education</span>
                </div>
              </RevealWrapper>

              <div className="space-y-6">
                {education.map((edu, i) => (
                  <RevealWrapper key={edu.id} delay={150 + i * 50}>
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center pt-1.5">
                        <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-orange shadow-[0_0_8px_rgba(254,84,1,0.5)]' : 'bg-blue shadow-[0_0_8px_rgba(1,156,255,0.5)]'}`} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-[0.95rem] text-text leading-tight">{edu.role}</h4>
                        {edu.company_url ? (
                          <a href={edu.company_url} target="_blank" rel="noopener noreferrer" className="text-[0.82rem] text-blue mt-1 hover:underline">
                            {edu.company}
                          </a>
                        ) : (
                          <p className="text-[0.82rem] text-blue mt-1">{edu.company}</p>
                        )}
                        <p className="font-mono text-[0.58rem] text-muted mt-1.5">{edu.period}</p>
                      </div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-16">
              <RevealWrapper delay={200}>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue" />
                  <span className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted">Core Skills</span>
                </div>
              </RevealWrapper>

              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <RevealWrapper key={skill.id} delay={250 + i * 50}>
                    <div className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-mono text-[0.64rem] tracking-[0.1em] uppercase text-text">{skill.name}</span>
                        <span className="font-mono text-[0.6rem] text-muted">{skill.percentage}%</span>
                      </div>
                      <div className="h-[2px] w-full bg-[rgba(1,156,255,0.1)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue to-[rgba(254,84,1,0.8)] transition-all duration-1000 ease-out origin-left"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Work Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(1,156,255,0.13)] hidden sm:block" />

            <div className="space-y-12 sm:pl-10">
              {work.map((job, i) => (
                <RevealWrapper key={job.id} delay={100 + i * 100}>
                  <div className="relative group">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[45px] top-1.5 w-[10px] h-[10px] rounded-full border border-current hidden sm:block ${i === 0 ? 'bg-orange text-orange shadow-[0_0_12px_rgba(254,84,1,0.5)]' : 'bg-blue text-blue shadow-[0_0_8px_rgba(1,156,255,0.4)]'}`} />
                    
                    <div className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-muted mb-3">
                      {job.period}
                    </div>
                    <h3 className="font-display font-bold text-[1.2rem] text-text leading-tight mb-1.5">
                      {job.role}
                    </h3>
                    <div className="text-[0.88rem] text-blue font-medium mb-4">
                      {job.company_url ? (
                        <a href={job.company_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </div>
                    <p className="text-[0.84rem] text-muted leading-[1.7]">
                      {job.description}
                    </p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
