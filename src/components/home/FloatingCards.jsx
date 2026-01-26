import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const CARDS = [
  {
    id: 'jaarrekening',
    label: 'Jaarrekening',
    icon: 'document',
    color: '#0d9488',
    position: { top: '8%', left: '5%' },
    delay: 0,
    floatDuration: '6s',
    floatDelay: '0s',
  },
  {
    id: 'profit-loss',
    label: 'Profit & Loss',
    icon: 'chart',
    color: '#1e3a5f',
    position: { top: '15%', right: '8%' },
    delay: 150,
    floatDuration: '7s',
    floatDelay: '0.5s',
  },
  {
    id: 'digital',
    label: 'Digital Presence',
    icon: 'globe',
    color: '#0d9488',
    position: { bottom: '25%', left: '3%' },
    delay: 300,
    floatDuration: '5.5s',
    floatDelay: '1s',
  },
  {
    id: 'market',
    label: 'Market Position',
    icon: 'target',
    color: '#475569',
    position: { top: '5%', left: '38%' },
    delay: 450,
    floatDuration: '6.5s',
    floatDelay: '0.3s',
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: 'folder',
    color: '#1e3a5f',
    position: { bottom: '18%', right: '5%' },
    delay: 600,
    floatDuration: '7.5s',
    floatDelay: '0.8s',
  },
];

function DocumentIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  );
}

const ICONS = {
  document: <DocumentIcon />,
  chart: <ChartIcon />,
  globe: <GlobeIcon />,
  target: <TargetIcon />,
  folder: <FolderIcon />,
};

function FloatingCard({ card, isVisible }) {
  return (
    <div
      className="absolute z-10"
      style={{
        ...card.position,
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 40}px) scale(${isVisible ? 1 : 0.9})`,
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${card.delay}ms`,
      }}
    >
      <div
        className="floating-card bg-white rounded-2xl shadow-elevated p-5 hover:shadow-lg transition-shadow duration-300"
        style={{
          animation: isVisible ? `float-gentle ${card.floatDuration} ease-in-out ${card.floatDelay} infinite` : 'none',
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
          style={{ backgroundColor: `${card.color}15` }}
        >
          <span style={{ color: card.color }}>{ICONS[card.icon]}</span>
        </div>
        <span className="text-sm font-medium text-text-dark">{card.label}</span>
      </div>
    </div>
  );
}

export function FloatingCards() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-cream overflow-hidden"
    >
      {/* Floating cards */}
      {CARDS.map((card) => (
        <FloatingCard
          key={card.id}
          card={card}
          isVisible={isVisible}
        />
      ))}

      {/* Central content */}
      <div
        className="text-center max-w-3xl relative z-20"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 40}px)`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
        }}
      >
        <h2 className="text-headline text-text-dark mb-6">
          Unify your <span className="text-primary">opportunities</span>
        </h2>
        <p className="text-xl text-text-medium leading-relaxed max-w-xl mx-auto">
          We analyze every dimension of your business—from financial health to digital presence—to unlock hidden potential.
        </p>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>
    </section>
  );
}
