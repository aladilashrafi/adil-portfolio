import { getPortfolioData } from '@/lib/api';
import { Nav } from '@/components/layout/Nav';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

// ISR: revalidate every hour (WordPress plugin auto-triggers on publish too)
export const revalidate = 3600;

export default async function HomePage() {
  const { meta, projects, services, experience, skills, testimonials, clients } =
    await getPortfolioData();

  return (
    <main>
      <Nav meta={meta} />
      <HeroSection meta={meta} />
      <AboutSection meta={meta} />
      <ServicesSection services={services} meta={meta} />
      <ExperienceSection experience={experience} skills={skills} meta={meta} />
      <ProjectsSection projects={projects} meta={meta} />
      <ClientsSection clients={clients} />
      <TestimonialsSection testimonials={testimonials} meta={meta} />
      <ContactSection meta={meta} />
      <Footer meta={meta} />
    </main>
  );
}
