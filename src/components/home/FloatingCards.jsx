import { useRef, useState, useEffect } from 'react';

// Cards with start positions (spread around edges) and end positions (stacked in exact center)
// All cards are the SAME SIZE and converge to ONE STACK in the center
const CARDS = [
  {
    id: 'jaarrekening',
    type: 'document',
    title: 'Jaarrekening',
    subtitle: '2024',
    value: '€2.4M',
    trend: '+18%',
    color: '#0d9488',
    // Start: top left, outside viewport
    startPos: { top: '5%', left: '-20%' },
    // End: center stack with slight offset
    endOffset: { x: -15, y: -20 },
    startRotation: -15,
    endRotation: -8,
    zIndex: 1,
  },
  {
    id: 'profit-loss',
    type: 'chart',
    title: 'Profit & Loss',
    value: '+32%',
    color: '#1e3a5f',
    startPos: { top: '0%', right: '-25%' },
    endOffset: { x: 25, y: -10 },
    startRotation: 18,
    endRotation: 6,
    zIndex: 3,
  },
  {
    id: 'digital',
    type: 'score',
    title: 'Digital Presence',
    value: '94',
    maxValue: '100',
    color: '#0d9488',
    startPos: { bottom: '0%', left: '-25%' },
    endOffset: { x: -25, y: 15 },
    startRotation: 12,
    endRotation: 4,
    zIndex: 2,
  },
  {
    id: 'market',
    type: 'position',
    title: 'Market Position',
    value: '#3',
    subtitle: 'in sector',
    color: '#475569',
    startPos: { top: '40%', right: '-25%' },
    endOffset: { x: 20, y: 25 },
    startRotation: -12,
    endRotation: -5,
    zIndex: 4,
  },
  {
    id: 'admin',
    type: 'status',
    title: 'Administration',
    status: 'Complete',
    items: '847 items',
    color: '#1e3a5f',
    startPos: { bottom: '5%', right: '-20%' },
    endOffset: { x: 0, y: 0 },
    startRotation: -18,
    endRotation: -3,
    zIndex: 5, // Top of stack
  },
];

// Uniform card size for all cards
const CARD_SIZE = 'w-[240px] h-[180px]';

// All cards have UNIFORM SIZE: 240x180px
function DocumentCard({ card }) {
  return (
    <div className={`${CARD_SIZE} bg-white rounded-3xl shadow-elevated p-6 flex flex-col justify-between`}>
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${card.color}15` }}
        >
          <svg className="w-6 h-6" style={{ color: card.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-text-dark">{card.title}</p>
          <p className="text-xs text-text-medium">{card.subtitle}</p>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-text-dark">{card.value}</span>
        <span className="text-sm font-semibold text-green-500">{card.trend}</span>
      </div>
    </div>
  );
}

function ChartCard({ card }) {
  return (
    <div className={`${CARD_SIZE} bg-white rounded-3xl shadow-elevated p-6 flex flex-col justify-between`}>
      <p className="text-sm font-semibold text-text-medium">{card.title}</p>
      <div className="flex items-end gap-1.5 h-16">
        {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              backgroundColor: i === 6 ? card.color : `${card.color}30`,
            }}
          />
        ))}
      </div>
      <span className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</span>
    </div>
  );
}

function ScoreCard({ card }) {
  const percentage = (parseInt(card.value) / parseInt(card.maxValue)) * 100;
  return (
    <div className={`${CARD_SIZE} bg-white rounded-3xl shadow-elevated p-6 flex flex-col items-center justify-between`}>
      <p className="text-sm font-semibold text-text-medium self-start">{card.title}</p>
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke={card.color}
            strokeWidth="6"
            strokeDasharray={`${percentage * 1.63} 163`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-text-dark">
          {card.value}
        </span>
      </div>
      <p className="text-xs text-text-medium">out of {card.maxValue}</p>
    </div>
  );
}

function PositionCard({ card }) {
  return (
    <div className={`${CARD_SIZE} bg-white rounded-3xl shadow-elevated p-6 flex flex-col justify-between`}>
      <p className="text-sm font-semibold text-text-medium">{card.title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold" style={{ color: card.color }}>{card.value}</span>
        <span className="text-sm text-text-medium">{card.subtitle}</span>
      </div>
    </div>
  );
}

function StatusCard({ card }) {
  return (
    <div className={`${CARD_SIZE} bg-white rounded-3xl shadow-elevated p-6 flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-text-dark">{card.title}</p>
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: card.color }}
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-lg font-semibold text-green-600">{card.status}</span>
        </div>
        <p className="text-xs text-text-medium">{card.items}</p>
      </div>
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

function FloatingCard({ card, progress }) {
  const CardComponent = CARD_COMPONENTS[card.type];

  // Easing function for smooth animation
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(progress);

  // Rotation interpolates from startRotation to endRotation
  const currentRotationDeg = card.startRotation + (card.endRotation - card.startRotation) * easedProgress;

  // Scale: starts smaller, ends at full size
  const scale = 0.85 + (0.15 * easedProgress);

  // Opacity: fade in during first 20% of progress
  const opacity = Math.min(1, progress * 5);

  // At progress=1, all cards stack in CENTER with slight offsets
  // The transform will move cards from their CSS position to center + offset
  const endX = card.endOffset.x;
  const endY = card.endOffset.y;

  return (
    <div
      className="absolute"
      style={{
        ...card.startPos,
        zIndex: card.zIndex,
        opacity,
        // At progress=0: cards at their startPos
        // At progress=1: cards centered with endOffset
        // We use calc to interpolate: start position → center
        // The transform handles the final offset and centers the card
        transform: `rotate(${currentRotationDeg}deg) scale(${scale})`,
        willChange: 'transform, opacity',
        // Transition from edge to center
        top: 'top' in card.startPos
          ? `calc(${parseFloat(card.startPos.top)}% + ${(50 - parseFloat(card.startPos.top)) * easedProgress}% + ${endY * easedProgress}px - 90px)`
          : undefined,
        bottom: 'bottom' in card.startPos
          ? `calc(${parseFloat(card.startPos.bottom)}% + ${(50 - parseFloat(card.startPos.bottom)) * easedProgress}% + ${-endY * easedProgress}px - 90px)`
          : undefined,
        left: 'left' in card.startPos
          ? `calc(${parseFloat(card.startPos.left)}% + ${(50 - parseFloat(card.startPos.left)) * easedProgress}% + ${endX * easedProgress}px - 120px)`
          : undefined,
        right: 'right' in card.startPos
          ? `calc(${parseFloat(card.startPos.right)}% + ${(50 - parseFloat(card.startPos.right)) * easedProgress}% + ${-endX * easedProgress}px - 120px)`
          : undefined,
      }}
    >
      <CardComponent card={card} />
    </div>
  );
}

// Hook for sticky scroll progress
function useStickyScrollProgress() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const calculateProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Scroll range = section height minus one viewport (the sticky portion)
      const scrollRange = sectionHeight - viewportHeight;

      // How much we've scrolled into the section
      // When rect.top = 0, we're at the start of sticky
      // When rect.top = -(scrollRange), we're at the end
      const scrolled = Math.max(0, -rect.top);

      // Progress from 0 to 1 over the scroll range
      const newProgress = Math.max(0, Math.min(1, scrolled / scrollRange));

      if (prefersReducedMotion) {
        setProgress(newProgress > 0.1 ? 1 : 0);
      } else {
        setProgress(newProgress);
      }
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateProgress(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { containerRef, progress };
}

export function FloatingCards() {
  const { containerRef, progress } = useStickyScrollProgress();

  // Headline fades out as cards converge (inverse of progress)
  const headlineOpacity = Math.max(0, 1 - progress * 1.5);
  const headlineScale = 1 - (progress * 0.1);

  return (
    // Outer container - tall to create scroll room (2.5x viewport)
    <section
      ref={containerRef}
      className="relative bg-cream"
      style={{ height: '250vh' }}
    >
      {/* Sticky container - stays in view while scrolling */}
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Floating cards - positioned absolutely within sticky container */}
        {CARDS.map((card) => (
          <FloatingCard
            key={card.id}
            card={card}
            progress={progress}
          />
        ))}

        {/* Central headline - fades as cards converge */}
        <div
          className="text-center relative z-0 px-8 pointer-events-none"
          style={{
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            willChange: 'transform, opacity',
          }}
        >
          <h2 className="text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.95] tracking-tight text-text-dark">
            Unify your
            <br />
            <span className="text-primary">opportunities</span>
          </h2>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(13, 148, 136, 0.04) 0%, transparent 60%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
