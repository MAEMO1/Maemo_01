import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const CARDS = [
  {
    id: 'jaarrekening',
    type: 'document',
    title: 'Jaarrekening',
    subtitle: '2024',
    value: '€2.4M',
    trend: '+18%',
    color: '#0d9488',
    position: { top: '5%', left: '-2%' },
    rotation: '-6deg',
    delay: 0,
    floatDuration: '7s',
  },
  {
    id: 'profit-loss',
    type: 'chart',
    title: 'Profit & Loss',
    value: '+32%',
    color: '#1e3a5f',
    position: { top: '8%', right: '-3%' },
    rotation: '4deg',
    delay: 200,
    floatDuration: '6s',
  },
  {
    id: 'digital',
    type: 'score',
    title: 'Digital Presence',
    value: '94',
    maxValue: '100',
    color: '#0d9488',
    position: { bottom: '15%', left: '-4%' },
    rotation: '5deg',
    delay: 400,
    floatDuration: '8s',
  },
  {
    id: 'market',
    type: 'position',
    title: 'Market Position',
    value: '#3',
    subtitle: 'in sector',
    color: '#475569',
    position: { top: '35%', right: '-5%' },
    rotation: '-3deg',
    delay: 300,
    floatDuration: '7.5s',
  },
  {
    id: 'admin',
    type: 'status',
    title: 'Administration',
    status: 'Complete',
    items: '847 items',
    color: '#1e3a5f',
    position: { bottom: '8%', right: '2%' },
    rotation: '-4deg',
    delay: 500,
    floatDuration: '6.5s',
  },
];

function DocumentCard({ card }) {
  return (
    <div className="bg-white rounded-2xl shadow-elevated p-5 w-[180px]">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${card.color}15` }}
        >
          <svg className="w-4 h-4" style={{ color: card.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-text-dark">{card.title}</p>
          <p className="text-[10px] text-text-medium">{card.subtitle}</p>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-text-dark">{card.value}</span>
        <span className="text-xs font-medium text-green-500">{card.trend}</span>
      </div>
    </div>
  );
}

function ChartCard({ card }) {
  return (
    <div className="bg-white rounded-2xl shadow-elevated p-5 w-[160px]">
      <p className="text-xs font-medium text-text-medium mb-2">{card.title}</p>
      <div className="flex items-end gap-1 h-12 mb-2">
        {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all"
            style={{
              height: `${h}%`,
              backgroundColor: i === 6 ? card.color : `${card.color}30`,
            }}
          />
        ))}
      </div>
      <span className="text-xl font-semibold" style={{ color: card.color }}>{card.value}</span>
    </div>
  );
}

function ScoreCard({ card }) {
  const percentage = (parseInt(card.value) / parseInt(card.maxValue)) * 100;
  return (
    <div className="bg-white rounded-2xl shadow-elevated p-5 w-[150px]">
      <p className="text-xs font-medium text-text-medium mb-3">{card.title}</p>
      <div className="relative w-16 h-16 mx-auto mb-2">
        <svg className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={card.color}
            strokeWidth="6"
            strokeDasharray={`${percentage * 1.76} 176`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-text-dark">
          {card.value}
        </span>
      </div>
      <p className="text-[10px] text-text-medium text-center">out of {card.maxValue}</p>
    </div>
  );
}

function PositionCard({ card }) {
  return (
    <div className="bg-white rounded-2xl shadow-elevated p-5 w-[140px]">
      <p className="text-xs font-medium text-text-medium mb-2">{card.title}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold" style={{ color: card.color }}>{card.value}</span>
        <span className="text-xs text-text-medium">{card.subtitle}</span>
      </div>
    </div>
  );
}

function StatusCard({ card }) {
  return (
    <div className="bg-white rounded-2xl shadow-elevated p-5 w-[160px]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-text-dark">{card.title}</p>
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: card.color }}
        />
      </div>
      <div className="flex items-center gap-2 mb-1">
        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm font-medium text-green-600">{card.status}</span>
      </div>
      <p className="text-[10px] text-text-medium">{card.items}</p>
    </div>
  );
}

const CARD_COMPONENTS = {
  document: DocumentCard,
  chart: ChartCard,
  score: ScoreCard,
  position: PositionCard,
  status: StatusCard,
};

function FloatingCard({ card, isVisible }) {
  const CardComponent = CARD_COMPONENTS[card.type];

  return (
    <div
      className="absolute z-10"
      style={{
        ...card.position,
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 60}px) rotate(${isVisible ? card.rotation : '0deg'}) scale(${isVisible ? 1 : 0.8})`,
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${card.delay}ms`,
      }}
    >
      <div
        style={{
          animation: isVisible ? `float-gentle ${card.floatDuration} ease-in-out infinite` : 'none',
        }}
      >
        <CardComponent card={card} />
      </div>
    </div>
  );
}

export function FloatingCards() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-cream overflow-hidden"
    >
      {/* Floating cards */}
      {CARDS.map((card) => (
        <FloatingCard
          key={card.id}
          card={card}
          isVisible={isVisible}
        />
      ))}

      {/* Central content - Much larger like Jeton */}
      <div
        className="text-center relative z-20 px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 40}px)`,
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
        }}
      >
        <h2 className="text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.95] tracking-tight text-text-dark">
          Unify your
          <br />
          <span className="text-primary">opportunities</span>
        </h2>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.04) 0%, transparent 60%)',
          }}
        />
      </div>
    </section>
  );
}
