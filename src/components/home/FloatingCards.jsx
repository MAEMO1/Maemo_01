import { useParallax } from '../../hooks/useParallax';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const CARDS = [
  {
    id: 'revenue',
    label: 'Annual Revenue',
    value: '€2.4M',
    trend: '+18%',
    trendUp: true,
    color: '#0d9488',
    position: { top: '12%', left: '8%' },
    delay: 0,
  },
  {
    id: 'growth',
    label: 'YoY Growth',
    value: '+32%',
    icon: 'chart',
    color: '#1e3a5f',
    position: { top: '8%', right: '10%' },
    delay: 200,
  },
  {
    id: 'market',
    label: 'Market Share',
    value: '14.2%',
    trend: '+2.1%',
    trendUp: true,
    color: '#475569',
    position: { bottom: '18%', left: '6%' },
    delay: 400,
  },
  {
    id: 'digital',
    label: 'Online Presence',
    value: '94/100',
    icon: 'globe',
    color: '#0d9488',
    position: { bottom: '12%', right: '8%' },
    delay: 600,
  },
];

function ChartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function TrendArrow({ up }) {
  return (
    <svg className={`w-3 h-3 ${up ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={up ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
    </svg>
  );
}

function FloatingCard({ card, isVisible, parallaxOffset }) {
  const icons = {
    chart: <ChartIcon />,
    globe: <GlobeIcon />,
  };

  return (
    <div
      className="absolute z-10 transition-all duration-700 ease-out"
      style={{
        ...card.position,
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? parallaxOffset * 0.3 : 30}px) scale(${isVisible ? 1 : 0.95})`,
        transitionDelay: `${card.delay}ms`,
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-elevated p-4 min-w-[140px] hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
        style={{ borderLeft: `3px solid ${card.color}` }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-medium font-medium">{card.label}</span>
          {card.icon && (
            <span style={{ color: card.color }}>{icons[card.icon]}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-text-dark">{card.value}</span>
          {card.trend && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${card.trendUp ? 'text-green-500' : 'text-red-500'}`}>
              <TrendArrow up={card.trendUp} />
              {card.trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function FloatingCards() {
  const parallaxOffset = useParallax(0.2);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

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
          parallaxOffset={parallaxOffset}
        />
      ))}

      {/* Central content */}
      <div
        className="text-center max-w-3xl relative z-20 transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 40}px)`,
          transitionDelay: '100ms',
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
