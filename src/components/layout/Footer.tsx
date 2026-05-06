import type { SiteMeta } from '@/lib/api';

export function Footer({ meta }: { meta: SiteMeta }) {
  return (
    <footer className="px-6 lg:px-16 py-12 bg-dark border-t border-[rgba(1,156,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <p className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted mb-1">
          © {new Date().getFullYear()} — AL ADIL ASHRAFI
        </p>
        <p className="font-mono text-[0.55rem] tracking-[0.12em] text-muted opacity-60 uppercase">
          Digital Marketing Alchemist
        </p>
      </div>

      <div className="flex gap-6 items-center">
        <a
          href="https://markimist.com"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.6rem] tracking-[0.1em] text-muted hover:text-blue transition-colors duration-200"
        >
          Markimist
        </a>
        <a
          href="https://banglatrack.com"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.6rem] tracking-[0.1em] text-muted hover:text-blue transition-colors duration-200"
        >
          Bangla Track
        </a>
      </div>
    </footer>
  );
}
