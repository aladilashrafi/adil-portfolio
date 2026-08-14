import { getPortfolioData } from '@/lib/api';
import { Nav } from '@/components/layout/Nav';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

// ISR: revalidate every hour
export const revalidate = 3600;

export default async function HomePage() {
  const {
    projects, services, experience, skills, testimonials, clients, resumeUrl, profile,
    highlightedCards, techStackSection, industriesSection, testimonialsSection,
  } = await getPortfolioData();

  return (
    <main>
      <Nav social={profile.social} />
      <HeroSection resumeUrl={resumeUrl} profile={profile} highlightedCards={highlightedCards} />
      <AboutSection profile={profile} />
      <ServicesSection services={services} />
      <ExperienceSection experience={experience} skills={skills} />
      <TechStackSection section={techStackSection} />
      <ProjectsSection projects={projects} />
      <IndustriesSection section={industriesSection} />
      <ClientsSection clients={clients} />
      <TestimonialsSection testimonials={testimonials} section={testimonialsSection} />
      <ContactSection profile={profile} />
      <Footer social={profile.social} name={profile.name} />
    </main>
  );
}
