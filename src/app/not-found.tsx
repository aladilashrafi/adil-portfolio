import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 relative z-10">
      <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-blue mb-4 flex items-center gap-3">
        <span className="w-6 h-px bg-blue" /> Error 404
      </p>
      <h1 className="font-syne font-extrabold leading-none tracking-tight gradient-text mb-6"
          style={{ fontSize:'clamp(4rem,10vw,9rem)' }}>
        404
      </h1>
      <p className="font-baskerville italic text-[1.1rem] text-ink-dim mb-10 text-center max-w-sm">
        This reaction didn't produce a result. The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="btn-clip inline-flex items-center gap-2 bg-blue text-white font-mono text-[0.7rem]
                   tracking-[0.14em] uppercase px-8 py-3.5 hover:bg-orange transition-all duration-250"
        style={{ boxShadow:'0 0 30px rgba(1,156,255,0.35)' }}
      >
        Back to Home →
      </Link>
    </main>
  );
}
