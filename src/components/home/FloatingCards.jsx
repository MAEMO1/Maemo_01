import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

// Card size - all cards are the same size like Jeton (bigger)
const CARD_SIZE = 'w-[260px] h-[280px]';

// Card components with MAEMO topics - all same size like Jeton
// Now accept translations as props
const CARD_COMPONENTS = {
  // Jaarrekening - Green financial card
  jaarrekening: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-3xl p-5 flex flex-col justify-between`}
      style={{
        background: 'linear-gradient(145deg, #22c55e 0%, #16a34a 100%)',
        boxShadow: '0 25px 50px rgba(34, 197, 94, 0.3)',
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-white text-base font-semibold">{t('home.floatingCards.cards.jaarrekening.title')}</span>
      </div>

      <div className="space-y-1">
        <div className="text-white/60 text-sm">{t('home.floatingCards.cards.jaarrekening.subtitle')}</div>
        <div className="text-white text-2xl font-bold">{t('home.floatingCards.cards.jaarrekening.value')}</div>
        <div className="text-white/50 text-xs">{t('home.floatingCards.cards.jaarrekening.label')}</div>
      </div>

      <div
        className="px-4 py-2 rounded-xl text-sm font-medium text-center"
        style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
      >
        {t('home.floatingCards.cards.jaarrekening.status')}
      </div>
    </div>
  ),

  // Profit & Loss - Blue card
  profitLoss: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-3xl p-5 flex flex-col`}
      style={{
        background: '#ffffff',
        border: '3px solid #3b82f6',
        boxShadow: '0 25px 50px rgba(59, 130, 246, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <span className="text-blue-600 text-base font-bold">{t('home.floatingCards.cards.profitLoss.title')}</span>
      </div>

      <div className="text-3xl font-bold text-slate-800 mb-1">{t('home.floatingCards.cards.profitLoss.value')}</div>
      <div className="text-sm text-slate-400 mb-3">{t('home.floatingCards.cards.profitLoss.label')}</div>

      <div className="mt-auto flex gap-1">
        <div className="flex-1 h-8 bg-blue-100 rounded"></div>
        <div className="flex-1 h-12 bg-blue-200 rounded"></div>
        <div className="flex-1 h-10 bg-blue-300 rounded"></div>
        <div className="flex-1 h-16 bg-blue-500 rounded"></div>
      </div>
    </div>
  ),

  // Market Position - White dashboard card
  marketPosition: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-2xl overflow-hidden`}
      style={{
        background: '#ffffff',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <span className="text-white text-sm font-medium ml-2">{t('home.floatingCards.cards.marketPosition.title')}</span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400">{t('home.floatingCards.cards.marketPosition.label')}</span>
          <span className="text-xs font-semibold text-green-500">{t('home.floatingCards.cards.marketPosition.growth')}</span>
        </div>
        <div className="flex items-end gap-2 h-28">
          <div className="flex-1 rounded-t" style={{ height: '45%', background: 'rgba(232, 93, 76, 0.2)' }}></div>
          <div className="flex-1 rounded-t" style={{ height: '65%', background: 'rgba(232, 93, 76, 0.4)' }}></div>
          <div className="flex-1 rounded-t" style={{ height: '55%', background: 'rgba(232, 93, 76, 0.6)' }}></div>
          <div className="flex-1 rounded-t" style={{ height: '85%', background: '#e85d4c' }}></div>
          <div className="flex-1 rounded-t" style={{ height: '95%', background: '#e85d4c' }}></div>
        </div>
      </div>
    </div>
  ),

  // Digital Presence - Coral/pink gradient card
  digitalPresence: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-2xl overflow-hidden`}
      style={{
        background: '#ffffff',
        boxShadow: '0 25px 50px rgba(232, 93, 76, 0.15)',
      }}
    >
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-coral/20 flex items-center justify-center">
            <svg className="w-3 h-3" fill="#e85d4c" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <span className="text-base font-semibold text-slate-800">{t('home.floatingCards.cards.digitalPresence.title')}</span>
        </div>
      </div>

      <div
        className="h-[225px] flex items-center justify-center"
        style={{ background: 'linear-gradient(145deg, #fef2f1 0%, #fee2e2 100%)' }}
      >
        <div className="text-center">
          <div className="text-4xl font-bold" style={{ color: '#e85d4c' }}>{t('home.floatingCards.cards.digitalPresence.value')}</div>
          <div className="text-sm text-slate-500 mt-1">{t('home.floatingCards.cards.digitalPresence.label')}</div>
          <div className="flex justify-center gap-1 mt-3">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Administration - Pink/purple profile card
  administration: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-3xl p-5 flex flex-col items-center justify-center`}
      style={{
        background: 'linear-gradient(145deg, #fce7f3 0%, #f5d0fe 100%)',
        boxShadow: '0 25px 50px rgba(236, 72, 153, 0.2)',
      }}
    >
      <div
        className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center"
        style={{ background: 'linear-gradient(145deg, #ec4899 0%, #a855f7 100%)' }}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <div className="text-slate-800 text-lg font-bold">{t('home.floatingCards.cards.administration.title')}</div>
      <div className="text-sm text-slate-500 mt-1">{t('home.floatingCards.cards.administration.label')}</div>
      <div className="flex items-center gap-1 mt-2">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-green-600 font-medium">{t('home.floatingCards.cards.administration.status')}</span>
      </div>
    </div>
  ),
};

// 5 cards - they will appear ONE BY ONE and OVERLAP in the center
const CARDS = [
  { id: 'jaarrekening', component: 'jaarrekening', zIndex: 5 },
  { id: 'profitLoss', component: 'profitLoss', zIndex: 4 },
  { id: 'marketPosition', component: 'marketPosition', zIndex: 3 },
  { id: 'digitalPresence', component: 'digitalPresence', zIndex: 2 },
  { id: 'administration', component: 'administration', zIndex: 1 },
];

function FloatingCard({ card, index, progress, totalCards, t }) {
  // Smoother easing for consistent feel with ActionStack
  const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

  // Each card has its own animation timing - they appear ONE BY ONE
  // Card 0: 0.0 - 0.3, Card 1: 0.15 - 0.45, Card 2: 0.30 - 0.60, etc.
  const cardStart = index * 0.15;
  const cardEnd = cardStart + 0.35;

  // Calculate card-specific progress
  let cardProgress = 0;
  if (progress >= cardStart) {
    cardProgress = Math.min(1, (progress - cardStart) / (cardEnd - cardStart));
  }

  const easedProgress = easeOutQuart(cardProgress);

  // Each card has a unique starting position (off-screen)
  // Cards fly in from edges like Jeton
  const startPositions = [
    { x: -800, y: -400 },  // jaarrekening - from far top left
    { x: 800, y: -350 },   // profitLoss - from far top right
    { x: -750, y: 400 },   // marketPosition - from far bottom left
    { x: 750, y: 350 },    // digitalPresence - from far bottom right
    { x: 0, y: 500 },      // administration - from far bottom center
  ];

  // End positions - cards CONVERGE to CENTER and OVERLAP tightly (like Jeton)
  // Very small offsets for a tight stacked deck effect
  const endPositions = [
    { x: -30, y: -20 },    // jaarrekening - slightly left and up
    { x: 25, y: -25 },     // profitLoss - slightly right and up
    { x: -20, y: 15 },     // marketPosition - slightly left and down
    { x: 30, y: 10 },      // digitalPresence - slightly right and down
    { x: 0, y: 0 },        // administration - center (front card)
  ];

  const start = startPositions[index];
  const end = endPositions[index];

  const currentX = start.x + (end.x - start.x) * easedProgress;
  const currentY = start.y + (end.y - start.y) * easedProgress;

  // Scale: cards start small (0.7) and grow to full size (1.0)
  const scale = 0.7 + (0.3 * easedProgress);

  // Opacity: hidden until animation starts, then visible
  const opacity = cardProgress > 0 ? 1 : 0;

  const CardComponent = CARD_COMPONENTS[card.component];

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        zIndex: card.zIndex,
        opacity,
        transform: `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${scale})`,
        willChange: 'transform, opacity',
      }}
    >
      <CardComponent t={t} />
    </div>
  );
}

function useStickyScrollProgress() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lerp factor - lower = more momentum/smoothing (0.08 = smooth glide)
    const lerpFactor = 0.08;

    const calculateTargetProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollRange = sectionHeight - viewportHeight;
      const scrolled = Math.max(0, -rect.top);
      targetProgressRef.current = Math.max(0, Math.min(1, scrolled / scrollRange));
    };

    // Animation loop that runs continuously for smooth momentum
    const animate = () => {
      // Lerp current progress towards target
      const diff = targetProgressRef.current - currentProgressRef.current;

      // Only update if there's a meaningful difference
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * lerpFactor;

        if (prefersReducedMotion) {
          setProgress(targetProgressRef.current > 0.1 ? 1 : 0);
        } else {
          setProgress(currentProgressRef.current);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      calculateTargetProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateTargetProgress();
    rafRef.current = requestAnimationFrame(animate);

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
  const { t } = useTranslation();

  // Headline starts LARGE and SHRINKS, then DISAPPEARS (like Jeton)
  // At progress 0: scale 1.0, at progress 0.3: scale 0.6, then fades
  const headlineScale = 1 - (progress * 0.6);
  // Headline fades out by the time first cards arrive
  const headlineOpacity = Math.max(0, 1 - (progress * 3));

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: '450vh', // More scroll distance for sequential card animation
        background: '#ffffff',
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Headline - starts fullscreen, shrinks as you scroll */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 0,
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            willChange: 'transform, opacity',
          }}
        >
          <h2
            className="text-center px-4"
            style={{
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#1e293b',
            }}
          >
            {t('home.floatingCards.headline')}
            <br />
            <span style={{ color: '#e85d4c' }}>{t('home.floatingCards.headlineAccent')}</span>
          </h2>
        </div>

        {/* Cards - come ONE BY ONE from edges and OVERLAP in center */}
        {CARDS.map((card, index) => (
          <FloatingCard
            key={card.id}
            card={card}
            index={index}
            progress={progress}
            totalCards={CARDS.length}
            t={t}
          />
        ))}

        {/* Subtle radial gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(232, 93, 76, 0.03) 0%, transparent 60%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
