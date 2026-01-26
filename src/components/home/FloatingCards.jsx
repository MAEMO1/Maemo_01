import { useRef, useState, useEffect } from 'react';

// Cards with start positions (spread around edges) and end positions (stacked in center)
// All cards converge to the CENTER and stack on top of each other
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
    startPos: { top: '8%', left: '-15%' },
    // End: stacked in center (slight offset for visual interest)
    endPos: { top: '38%', left: '38%' },
    startRotation: -12,
    endRotation: -6,
    zIndex: 2,
    floatDuration: '7s',
  },
  {
    id: 'profit-loss',
    type: 'chart',
    title: 'Profit & Loss',
    value: '+32%',
    color: '#1e3a5f',
    startPos: { top: '5%', right: '-18%' },
    endPos: { top: '32%', right: '35%' },
    startRotation: 15,
    endRotation: 5,
    zIndex: 4,
    floatDuration: '6s',
  },
  {
    id: 'digital',
    type: 'score',
    title: 'Digital Presence',
    value: '94',
    maxValue: '100',
    color: '#0d9488',
    startPos: { bottom: '5%', left: '-20%' },
    endPos: { bottom: '30%', left: '40%' },
    startRotation: 10,
    endRotation: 4,
    zIndex: 1,
    floatDuration: '8s',
  },
  {
    id: 'market',
    type: 'position',
    title: 'Market Position',
    value: '#3',
    subtitle: 'in sector',
    color: '#475569',
    startPos: { top: '50%', right: '-20%' },
    endPos: { top: '42%', right: '38%' },
    startRotation: -8,
    endRotation: -3,
    zIndex: 3,
    floatDuration: '7.5s',
  },
  {
    id: 'admin',
    type: 'status',
    title: 'Administration',
    status: 'Complete',
    items: '847 items',
    color: '#1e3a5f',
    startPos: { bottom: '10%', right: '-15%' },
    endPos: { bottom: '28%', right: '36%' },
    startRotation: -15,
    endRotation: -4,
    zIndex: 5,
    floatDuration: '6.5s',
  },
];

function DocumentCard({ card }) {
  return (
    <div className="bg-white rounded-3xl shadow-elevated p-6 w-[220px]">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
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
    <div className="bg-white rounded-3xl shadow-elevated p-6 w-[200px]">
      <p className="text-sm font-semibold text-text-medium mb-3">{card.title}</p>
      <div className="flex items-end gap-1.5 h-16 mb-3">
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
      <span className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</span>
    </div>
  );
}

function ScoreCard({ card }) {
  const percentage = (parseInt(card.value) / parseInt(card.maxValue)) * 100;
  return (
    <div className="bg-white rounded-3xl shadow-elevated p-6 w-[180px]">
      <p className="text-sm font-semibold text-text-medium mb-4">{card.title}</p>
      <div className="relative w-20 h-20 mx-auto mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={card.color}
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.136} 214`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-text-dark">
          {card.value}
        </span>
      </div>
      <p className="text-xs text-text-medium text-center">out of {card.maxValue}</p>
    </div>
  );
}

function PositionCard({ card }) {
  return (
    <div className="bg-white rounded-3xl shadow-elevated p-6 w-[170px]">
      <p className="text-sm font-semibold text-text-medium mb-3">{card.title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold" style={{ color: card.color }}>{card.value}</span>
        <span className="text-sm text-text-medium">{card.subtitle}</span>
      </div>
    </div>
  );
}

function StatusCard({ card }) {
  return (
    <div className="bg-white rounded-3xl shadow-elevated p-6 w-[200px]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-text-dark">{card.title}</p>
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: card.color }}
        />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-base font-semibold text-green-600">{card.status}</span>
      </div>
      <p className="text-xs text-text-medium">{card.items}</p>
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

// Interpolate between two position objects based on progress
function interpolatePosition(startPos, endPos, progress) {
  const result = {};

  // Handle top/bottom
  if ('top' in startPos && 'top' in endPos) {
    const startVal = parseFloat(startPos.top);
    const endVal = parseFloat(endPos.top);
    result.top = `${startVal + (endVal - startVal) * progress}%`;
  } else if ('top' in startPos) {
    result.top = startPos.top;
  } else if ('bottom' in startPos && 'bottom' in endPos) {
    const startVal = parseFloat(startPos.bottom);
    const endVal = parseFloat(endPos.bottom);
    result.bottom = `${startVal + (endVal - startVal) * progress}%`;
  } else if ('bottom' in startPos) {
    result.bottom = startPos.bottom;
  }

  // Handle left/right
  if ('left' in startPos && 'left' in endPos) {
    const startVal = parseFloat(startPos.left);
    const endVal = parseFloat(endPos.left);
    result.left = `${startVal + (endVal - startVal) * progress}%`;
  } else if ('left' in startPos) {
    result.left = startPos.left;
  } else if ('right' in startPos && 'right' in endPos) {
    const startVal = parseFloat(startPos.right);
    const endVal = parseFloat(endPos.right);
    result.right = `${startVal + (endVal - startVal) * progress}%`;
  } else if ('right' in startPos) {
    result.right = startPos.right;
  }

  return result;
}

function FloatingCard({ card, progress }) {
  const CardComponent = CARD_COMPONENTS[card.type];

  // Easing function for smooth animation
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(progress);

  // Interpolate position from start to end
  const currentPosition = interpolatePosition(card.startPos, card.endPos, easedProgress);

  // Rotation interpolates from startRotation to endRotation
  const currentRotationDeg = card.startRotation + (card.endRotation - card.startRotation) * easedProgress;

  // Scale: starts smaller, ends at full size
  const scale = 0.85 + (0.15 * easedProgress);

  // Opacity: fade in during first 25% of progress
  const opacity = Math.min(1, progress * 4);

  return (
    <div
      className="absolute"
      style={{
        ...currentPosition,
        zIndex: card.zIndex,
        opacity,
        transform: `rotate(${currentRotationDeg}deg) scale(${scale})`,
        willChange: 'transform, opacity, top, left, right, bottom',
      }}
    >
      <div
        style={{
          animation: progress > 0.85 ? `float-gentle ${card.floatDuration} ease-in-out infinite` : 'none',
        }}
      >
        <CardComponent card={card} />
      </div>
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
