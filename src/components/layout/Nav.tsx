'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { SiteMeta } from '@/lib/api';

const NAV_LINKS = [
  { href: '#about',      label: 'About'      },
  { href: '#services',   label: 'Services'    },
  { href: '#experience', label: 'Experience'  },
  { href: '#projects',   label: 'Projects'    },
  { href: '#contact',    label: 'Contact'     },
];

export function Nav({ meta }: { meta: SiteMeta }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 lg:px-16 h-16 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[rgba(5,12,20,0.93)] backdrop-blur-[14px] border-[rgba(1,156,255,0.1)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <Link
          href="/"
          className="font-display font-extrabold text-base tracking-tight text-text no-underline transition-colors duration-200 hover:text-blue"
          style={{ letterSpacing: '-0.02em' }}
        >
          Al Adil <span className="text-blue">Ashrafi</span>
        </Link>

        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted no-underline transition-colors duration-200 hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-block font-mono text-[0.65rem] tracking-[0.12em] uppercase text-orange border border-orange px-5 py-2 transition-all duration-200 hover:bg-orange hover:text-white"
          style={{ borderRadius: '2px' }}
        >
          Let&apos;s Work →
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-muted rounded-sm transition-all duration-300 ${
              menuOpen ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-muted rounded-sm transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-muted rounded-sm transition-all duration-300 ${
              menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[190] bg-dark/80 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 bottom-0 z-[210] w-[280px] bg-dark-2 border-l border-[rgba(1,156,255,0.1)] transition-transform duration-500 lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-8 p-12 mt-16">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold text-2xl text-text hover:text-blue transition-colors duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-block mt-4 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-orange border border-orange px-6 py-3 text-center"
          >
            Let&apos;s Work →
          </a>
        </div>
      </div>
    </>
  );
}
