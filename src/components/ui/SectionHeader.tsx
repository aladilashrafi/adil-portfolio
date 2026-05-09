import { RevealWrapper } from '@/components/ui/RevealWrapper';

interface Props {
  label: string;
  title: string;
  titleAccent?: string;
  centered?: boolean;
}

export function SectionHeader({ label, title, titleAccent, centered = false }: Props) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-center lg:text-left'}`}>
      <RevealWrapper>
        <p
          className={`font-mono text-[0.64rem] tracking-[0.22em] uppercase text-orange
                      flex items-center gap-3 mb-3 ${centered ? 'justify-center' : 'justify-center lg:justify-start'}`}
        >
          <span className={`w-8 h-px bg-orange inline-block ${centered ? '' : 'lg:hidden'}`} />
          {label}
          <span className="w-8 h-px bg-orange inline-block" />
        </p>
      </RevealWrapper>
      <RevealWrapper delay={80}>
        <h2
          className="font-display font-extrabold leading-[1.1] lg:leading-[0.96] tracking-tight text-text"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 3.2rem)', letterSpacing: '-0.035em' }}
        >
          {title}
          {titleAccent && (
            <>
              <span className="hidden lg:inline"><br /></span>
              <span className="inline lg:hidden"> </span>
              <span className="text-blue">{titleAccent}</span>
            </>
          )}
        </h2>
      </RevealWrapper>
    </div>
  );
}
