import { useRef, useState, useEffect } from 'react';

// Cards representing the 5 pillars we analyze - no mock data, just prominent titles
const CARDS = [
  {
    id: 'jaarrekening',
    title: 'Jaarrekening',
    icon: 'document',
    color: '#0d9488',
    startPos: { top: '5%', left: '-20%' },
    endOffset: { x: -15, y: -20 },
    startRotation: -15,
    endRotation: -8,
    zIndex: 1,
  },
  {
    id: 'profit-loss',
    title: 'Profit & Loss',
    icon: 'chart',
    color: '#1e3a5f',
    startPos: { top: '0%', right: '-25%' },
    endOffset: { x: 25, y: -10 },
    startRotation: 18,
    endRotation: 6,
    zIndex: 3,
  },
  {
    id: 'digital',
    title: 'Digital Presence',
    icon: 'globe',
    color: '#0d9488',
    startPos: { bottom: '0%', left: '-25%' },
    endOffset: { x: -25, y: 15 },
    startRotation: 12,
    endRotation: 4,
    zIndex: 2,
  },
  {
    id: 'market',
    title: 'Market Position',
    icon: 'target',
    color: '#475569',
    startPos: { top: '40%', right: '-25%' },
    endOffset: { x: 20, y: 25 },
    startRotation: -12,
    endRotation: -5,
    zIndex: 4,
  },
  {
    id: 'admin',
    title: 'Administration',
    icon: 'clipboard',
    color: '#1e3a5f',
    startPos: { bottom: '5%', right: '-20%' },
    endOffset: { x: 0, y: 0 },
    startRotation: -18,
    endRotation: -3,
    zIndex: 5,
  },
];

// Uniform card size
const CARD_SIZE = 'w-[260px] h-[160px]';

// Icon components
const ICONS = {
  document: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  ),
  chart: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  ),
  globe: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  ),
  target: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  ),
  clipboard: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  ),
};

// Single card component - prominent title with icon
function AnalysisCard({ card }) {
  return (
    <div
      className={`${CARD_SIZE} rounded-3xl shadow-elevated p-6 flex flex-col justify-between`}
      style={{ backgroundColor: card.color }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {ICONS[card.icon]}
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white leading-tight">
        {card.title}
      </h3>
    </div>
  );
}

function FloatingCard({ card, progress }) {
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
  const endX = card.endOffset.x;
  const endY = card.endOffset.y;

  // Card dimensions for centering: 260x160
  const cardHalfWidth = 130;
  const cardHalfHeight = 80;

  return (
    <div
      className="absolute"
      style={{
        zIndex: card.zIndex,
        opacity,
        transform: `rotate(${currentRotationDeg}deg) scale(${scale})`,
        willChange: 'transform, opacity',
        // Transition from edge to center
        top: 'top' in card.startPos
          ? `calc(${parseFloat(card.startPos.top)}% + ${(50 - parseFloat(card.startPos.top)) * easedProgress}% + ${endY * easedProgress}px - ${cardHalfHeight}px)`
          : undefined,
        bottom: 'bottom' in card.startPos
          ? `calc(${parseFloat(card.startPos.bottom)}% + ${(50 - parseFloat(card.startPos.bottom)) * easedProgress}% + ${-endY * easedProgress}px - ${cardHalfHeight}px)`
          : undefined,
        left: 'left' in card.startPos
          ? `calc(${parseFloat(card.startPos.left)}% + ${(50 - parseFloat(card.startPos.left)) * easedProgress}% + ${endX * easedProgress}px - ${cardHalfWidth}px)`
          : undefined,
        right: 'right' in card.startPos
          ? `calc(${parseFloat(card.startPos.right)}% + ${(50 - parseFloat(card.startPos.right)) * easedProgress}% + ${-endX * easedProgress}px - ${cardHalfWidth}px)`
          : undefined,
      }}
    >
      <AnalysisCard card={card} />
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
