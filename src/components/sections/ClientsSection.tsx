import { RevealWrapper } from '@/components/ui/RevealWrapper';
import type { Client } from '@/lib/api';

export function ClientsSection({ clients = [] }: { clients?: Client[] }) {
  // Duplicate list for seamless loop
  const doubled = clients && Array.isArray(clients) ? [...clients, ...clients] : [];

  if (doubled.length === 0) return null;

  return (
    <section
      id="clients"
      className="px-6 lg:px-16 py-16 bg-dark border-t border-[rgba(1,156,255,0.08)]"
    >
      <RevealWrapper>
        <div
          className="overflow-hidden border-t border-b border-[rgba(1,156,255,0.08)] py-8 -mx-6 lg:-mx-16"
        >
          <div
            className="flex gap-16 animate-marquee items-center"
            style={{ width: 'max-content' }}
          >
            {doubled.map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-16 transition-opacity duration-300"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 lg:h-10 w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <span className="font-display font-bold text-[1.1rem] text-muted whitespace-nowrap hover:text-text transition-colors duration-200 cursor-default uppercase tracking-wider">
                    {client.name}
                  </span>
                )}
                <span className="w-1.5 h-1.5 rounded-full bg-blue/20 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
