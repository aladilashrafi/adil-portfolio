'use client';

import { useEffect, useRef } from 'react';
import type { ExperienceItem, Skill, SiteMeta } from '@/lib/api';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

export function ExperienceSection({
  experience,
  skills,
  meta,
}: {
  experience: ExperienceItem[];
  skills: Skill[];
  meta: SiteMeta;
}) {
  const work = experience.filter((e) => e.type === 'work');
  const edu = experience.filter((e) => e.type === 'education');

  return (
    <section id="experience" className="px-6 lg:px-16 py-24 bg-dark-2">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20">

          {/* Left: Title + Education + Skills */}
          <div>
            <RevealWrapper>
              <SectionHeader 
                label={meta.resume_label} 
                title={meta.resume_title} 
                titleAccent={meta.resume_accent} 
              />
            </RevealWrapper>

            {/* Education */}
            <div className="mt-12">
              <RevealWrapper delay={100}>
                <p className="font-mono text-[0.64rem] tracking-[0.22em] uppercase text-orange flex items-center gap-3 mb-4">
                  Education
                  <span className="w-8 h-px bg-orange inline-block" />
                </p>
              </RevealWrapper>

              <div className="flex flex-col gap-5 mt-4">
                {edu.map((item, i) => (
                  <RevealWrapper key={item.id} delay={150 + i * 60}>
                    <div className="flex gap-4 items-start">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                        style={{
                          background: i % 2 === 0 ? '#fe5401' : '#019cff',
                          boxShadow: i % 2 === 0
                            ? '0 0 8px rgba(254,84,1,0.5)'
                            : '0 0 8px rgba(1,156,255,0.5)',
                        }}
                      />
                      <div>
                        <p className="font-display font-bold text-[0.9rem] text-text">{item.role}</p>
                        <p className="text-[0.82rem] text-blue">{item.company}</p>
                        <p className="font-mono text-[0.58rem] tracking-[0.1em] text-muted mt-0.5">
                          {item.period}
                        </p>
                      </div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-12">
              <RevealWrapper delay={200}>
                <p className="font-mono text-[0.64rem] tracking-[0.22em] uppercase text-orange flex items-center gap-3 mb-4">
                  Core Skills
                  <span className="w-8 h-px bg-orange inline-block" />
                </p>
              </RevealWrapper>

              <div className="flex flex-col gap-5 mt-4">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.id} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <RevealWrapper delay={100}>
            <div className="relative pl-0">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(1,156,255,0.13)]" />

              {work.map((item, i) => (
                <div key={item.id} className="relative pl-8 pb-10 last:pb-0">
                  {/* Dot */}
                  <span
                    className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border"
                    style={
                      i < 2
                        ? {
                            background: '#fe5401',
                            borderColor: '#fe5401',
                            boxShadow: '0 0 12px rgba(254,84,1,0.5)',
                          }
                        : {
                            background: '#019cff',
                            borderColor: '#019cff',
                            boxShadow: '0 0 8px rgba(1,156,255,0.4)',
                          }
                    }
                  />

                  <p className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-muted mb-1.5">
                    {item.period}
                  </p>
                  <h3 className="font-display font-bold text-[1.1rem] text-text leading-tight mb-0.5">
                    {item.role}
                  </h3>
                  <p className="text-[0.85rem] text-blue font-medium mb-3">
                    {item.company}
                  </p>
                  <p className="text-[0.84rem] text-muted leading-[1.7]">{item.description}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>

        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setTimeout(() => {
            fill.style.width = `${skill.percentage}%`;
          }, index * 120);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(fill);
    return () => observer.disconnect();
  }, [index, skill.percentage]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-[0.64rem] tracking-[0.1em] uppercase text-text">
          {skill.name}
        </span>
        <span className="font-mono text-[0.6rem] text-muted">{skill.percentage}%</span>
      </div>
      <div className="h-0.5 bg-[rgba(1,156,255,0.1)] rounded-sm overflow-hidden">
        <div ref={fillRef} className="skill-fill" />
      </div>
    </div>
  );
}
