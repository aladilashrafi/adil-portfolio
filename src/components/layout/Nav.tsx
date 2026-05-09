'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '/#about',      label: 'About'      },
  { href: '/#services',   label: 'Services'   },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects',   label: 'Projects'   },
  { href: '/#contact',    label: 'Contact'     },
];

export function Nav() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[70] h-20 transition-all duration-300 flex items-center justify-between px-6 lg:px-16 ${
          scrolled ? 'bg-[rgba(11,22,34,0.85)] backdrop-blur-md border-b border-[rgba(1,156,255,0.08)]' : 'bg-transparent'
        }`}
      >
        <Link href="/" className="font-display font-extrabold text-[1.15rem] text-text tracking-tight group">
          Al Adil <span className="text-blue group-hover:text-text transition-colors duration-300">Ashrafi</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted hover:text-blue transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Socials & CTA */}
        {mounted && (
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-[rgba(1,156,255,0.15)] pr-6 mr-1">
              <a 
                href="https://github.com/aladilashrafi" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted hover:text-blue transition-colors"
                title="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/al-adil-ashrafi/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted hover:text-blue transition-colors"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
            
            <Link
              href="/#contact"
              className="btn-clip inline-flex items-center gap-2 bg-blue text-white font-mono text-[0.65rem] tracking-[0.1em] uppercase px-7 py-3 transition-all duration-200 hover:bg-[#0088e0] hover:-translate-y-0.5"
              style={{ borderRadius: '2px' }}
            >
              Let's Work →
            </Link>
          </div>
        )}

        {!mounted && (
          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="btn-clip inline-flex items-center gap-2 bg-blue text-white font-mono text-[0.65rem] tracking-[0.1em] uppercase px-7 py-3 transition-all duration-200 hover:bg-[#0088e0]"
              style={{ borderRadius: '2px' }}
            >
              Let's Work →
            </Link>
          </div>
        )}

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-8 h-8 flex flex-col items-end justify-center gap-1.5 focus:outline-none"
        >
          <span className={`h-0.5 bg-blue transition-all duration-300 ${menuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-7'}`} />
          <span className={`h-0.5 bg-blue transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-5'}`} />
          <span className={`h-0.5 bg-blue transition-all duration-300 ${menuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-8'}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0b1622] flex flex-col items-center pt-32 pb-20 justify-start gap-8 transition-transform duration-500 overflow-y-auto md:hidden ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display font-bold text-2xl text-text hover:text-blue transition-colors"
          >
            {link.label}
          </Link>
        ))}
        
        <div className="flex gap-6 mt-4">
          <a href="https://github.com/aladilashrafi" target="_blank" rel="noreferrer" className="text-muted hover:text-blue transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/al-adil-ashrafi/" target="_blank" rel="noreferrer" className="text-muted hover:text-blue transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>

        <Link
          href="/#contact"
          onClick={() => setMenuOpen(false)}
          className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-blue border border-blue px-10 py-4 mt-4"
          style={{ borderRadius: '2px' }}
        >
          Let's Work →
        </Link>
      </div>
    </>
  );
}
