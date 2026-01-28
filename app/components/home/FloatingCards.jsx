'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '../../lib/gsap';

// Responsive card sizing via Tailwind classes
const CARD_BASE = 'w-[200px] h-[220px] sm:w-[220px] sm:h-[240px] md:w-[240px] md:h-[260px] lg:w-[260px] lg:h-[280px]';

// "Serious Capital" palette - institutional, boardroom aesthetics
const PALETTE = {
  deepEmerald: '#064E3B',
  oxfordNavy: '#1E3A8A',
  burnishedCopper: '#9A3412',
  graphite: '#374151',
  slate: '#1e293b',
  ivory: '#f8fafc',
  coral: '#e85d4c',
};

const CARD_COMPONENTS = {
  jaarrekening: ({ t }) => (
    <div
      className={`${CARD_BASE} rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 flex flex-col justify-between will-change-transform`}
      style={{
        background: `linear-gradient(145deg, ${PALETTE.deepEmerald} 0%, #065F46 100%)`,
        boxShadow: '0 25px 50px rgba(6, 78, 59, 0.25)',
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/15 flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-white text-xs sm:text-sm md:text-base font-semibold">{t('home.floatingCards.cards.jaarrekening.title')}</span>
      </div>
      <div className="space-y-0.5 sm:space-y-1">
        <div className="text-white/50 text-[10px] sm:text-xs md:text-sm">{t('home.floatingCards.cards.jaarrekening.subtitle')}</div>
        <div className="text-white text-lg sm:text-xl md:text-2xl font-bold">{t('home.floatingCards.cards.jaarrekening.value')}</div>
        <div className="text-white/40 text-[10px] sm:text-xs">{t('home.floatingCards.cards.jaarrekening.label')}</div>
      </div>
      <div
        className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-medium text-center"
        style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}
      >
        {t('home.floatingCards.cards.jaarrekening.status')}
      </div>
    </div>
  ),
  profitLoss: ({ t }) => (
    <div
      className={`${CARD_BASE} rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 flex flex-col will-change-transform`}
      style={{
        background: '#ffffff',
        border: `2px solid ${PALETTE.oxfordNavy}`,
        boxShadow: '0 25px 50px rgba(30, 58, 138, 0.15)',
      }}
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center" style={{ background: PALETTE.oxfordNavy }}>
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <span className="text-xs sm:text-sm md:text-base font-bold" style={{ color: PALETTE.oxfordNavy }}>{t('home.floatingCards.cards.profitLoss.title')}</span>
      </div>
      <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: PALETTE.slate }}>{t('home.floatingCards.cards.profitLoss.value')}</div>
      <div className="text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3" style={{ color: PALETTE.graphite }}>{t('home.floatingCards.cards.profitLoss.label')}</div>
      <div className="mt-auto flex gap-0.5 sm:gap-1">
        <div className="flex-1 h-5 sm:h-6 md:h-8 rounded" style={{ background: 'rgba(30, 58, 138, 0.1)' }}></div>
        <div className="flex-1 h-8 sm:h-10 md:h-12 rounded" style={{ background: 'rgba(30, 58, 138, 0.2)' }}></div>
        <div className="flex-1 h-6 sm:h-8 md:h-10 rounded" style={{ background: 'rgba(30, 58, 138, 0.35)' }}></div>
        <div className="flex-1 h-12 sm:h-14 md:h-16 rounded" style={{ background: PALETTE.oxfordNavy }}></div>
      </div>
    </div>
  ),
  administration: ({ t }) => (
    <div
      className={`${CARD_BASE} rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center will-change-transform`}
      style={{
        background: `linear-gradient(145deg, ${PALETTE.ivory} 0%, #f1f5f9 100%)`,
        border: '1px solid rgba(55, 65, 81, 0.1)',
        boxShadow: '0 25px 50px rgba(55, 65, 81, 0.12)',
      }}
    >
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-3 flex items-center justify-center"
        style={{ background: PALETTE.graphite }}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <div className="text-sm sm:text-base md:text-lg font-bold" style={{ color: PALETTE.slate }}>{t('home.floatingCards.cards.administration.title')}</div>
      <div className="text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1" style={{ color: PALETTE.graphite }}>{t('home.floatingCards.cards.administration.label')}</div>
      <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: PALETTE.deepEmerald }}>
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[10px] sm:text-xs font-medium" style={{ color: PALETTE.deepEmerald }}>{t('home.floatingCards.cards.administration.status')}</span>
      </div>
    </div>
  ),
  marketPosition: ({ t }) => (
    <div
      className={`${CARD_BASE} rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 flex flex-col will-change-transform`}
      style={{
        background: `linear-gradient(145deg, ${PALETTE.burnishedCopper} 0%, #B45309 100%)`,
        boxShadow: '0 25px 50px rgba(154, 52, 18, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/15 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <span className="text-white text-xs sm:text-sm md:text-base font-bold">{t('home.floatingCards.cards.marketPosition.title')}</span>
      </div>
      <div className="text-[10px] sm:text-xs md:text-sm text-white/70 mb-1 sm:mb-2">{t('home.floatingCards.cards.marketPosition.label')}</div>
      <div className="mt-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex-1 h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-white rounded-full"></div>
          </div>
          <span className="text-white text-xs sm:text-sm font-bold">{t('home.floatingCards.cards.marketPosition.growth')}</span>
        </div>
      </div>
    </div>
  ),
  digitalPresence: ({ t }) => (
    <div
      className={`${CARD_BASE} rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center will-change-transform`}
      style={{
        background: `linear-gradient(145deg, ${PALETTE.slate} 0%, #0f172a 100%)`,
        boxShadow: '0 25px 50px rgba(15, 23, 42, 0.3)',
      }}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-3 bg-white/10 flex items-center justify-center">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>
      <div className="text-white text-sm sm:text-base md:text-lg font-bold">{t('home.floatingCards.cards.digitalPresence.title')}</div>
      <div className="text-xl sm:text-2xl md:text-3xl font-bold mt-0.5 sm:mt-1" style={{ color: PALETTE.coral }}>{t('home.floatingCards.cards.digitalPresence.value')}</div>
      <div className="text-[10px] sm:text-xs md:text-sm text-white/50 mt-0.5 sm:mt-1">{t('home.floatingCards.cards.digitalPresence.label')}</div>
    </div>
  ),
};

// Card positions for desktop animation - percentages from center
const CARD_POSITIONS = [
  { id: 'jaarrekening', startX: -150, startY: -100, endX: -55, endY: -45 },
  { id: 'profitLoss', startX: 150, startY: -80, endX: 55, endY: -40 },
  { id: 'marketPosition', startX: -120, startY: 100, endX: -50, endY: 45 },
  { id: 'digitalPresence', startX: 120, startY: 80, endX: 50, endY: 40 },
  { id: 'administration', startX: 0, startY: 150, endX: 0, endY: 55 },
];

// Mobile card positions - overlapping stack like jeton.com (percentages from center)
// Creates a fanned/stacked visual composition
const MOBILE_CARD_POSITIONS = [
  { id: 'jaarrekening', x: -25, y: -35, rotation: -6, zIndex: 5, startX: -100, startY: -80 },
  { id: 'profitLoss', x: 25, y: -30, rotation: 4, zIndex: 4, startX: 100, startY: -60 },
  { id: 'administration', x: 0, y: 40, rotation: 0, zIndex: 3, startX: 0, startY: 120 },
  { id: 'marketPosition', x: -20, y: 15, rotation: -3, zIndex: 2, startX: -80, startY: 60 },
  { id: 'digitalPresence', x: 22, y: 20, rotation: 5, zIndex: 1, startX: 80, startY: 70 },
];

export function FloatingCards() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const mobileCardsRef = useRef([]);
  const cardRefs = useRef([]);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useBreakpoint('md');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Desktop animations
  useLayoutEffect(() => {
    if (!mounted || !isDesktop) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: '.floating-cards-content',
        },
      });

      // Headline fades out
      if (headlineRef.current) {
        tl.to(headlineRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
        }, 0);
      }

      // Cards fly in from their start positions
      CARD_POSITIONS.forEach((card, index) => {
        const cardEl = cardRefs.current[index];
        if (!cardEl) return;

        gsap.set(cardEl, {
          xPercent: card.startX,
          yPercent: card.startY,
          opacity: 0,
          scale: 0.8,
        });

        tl.to(cardEl, {
          xPercent: card.endX,
          yPercent: card.endY,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, 0.1 + index * 0.1);
      });

      // Scale up slightly at end
      if (cardsContainerRef.current) {
        tl.to(cardsContainerRef.current, {
          scale: 1.05,
          duration: 0.3,
        }, 0.6);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, isDesktop]);

  // Mobile animations - jeton.com style overlapping stack with scroll-pinned reveal
  useLayoutEffect(() => {
    if (!mounted || isDesktop) return;

    const ctx = gsap.context(() => {
      // Pin the section and animate cards as user scrolls - like jeton.com
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // 1.5x viewport height for scroll
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Headline fades out as cards come in
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.85, duration: 0.3 },
          0
        );
      }

      // Animate each card from start position to final stacked position
      mobileCardsRef.current.forEach((card, index) => {
        if (!card) return;

        const pos = MOBILE_CARD_POSITIONS[index];
        const staggerOffset = index * 0.08;

        // Set initial state - cards start from outside/far positions
        gsap.set(card, {
          xPercent: pos.startX,
          yPercent: pos.startY,
          opacity: 0,
          scale: 0.7,
          rotation: pos.rotation * 2,
          transformPerspective: 1000,
        });

        // Animate to final stacked position
        tl.to(card, {
          xPercent: pos.x,
          yPercent: pos.y,
          opacity: 1,
          scale: 1,
          rotation: pos.rotation,
          duration: 0.35,
          ease: 'power3.out',
        }, 0.1 + staggerOffset);
      });

      // Slight scale up at end for impact
      tl.to(cardsContainerRef.current, {
        scale: 1.02,
        duration: 0.2,
      }, 0.6);

    }, containerRef);

    return () => ctx.revert();
  }, [mounted, isDesktop]);

  return (
    <section ref={containerRef} className="relative bg-white">
      {/* Unified layout for both desktop and mobile - scroll-pinned */}
      <div className={isDesktop ? 'h-[250vh]' : 'h-[200vh]'}>
        <div className="floating-cards-content h-screen flex items-center justify-center overflow-hidden">
          {/* Headline - absolute positioned, fades out as cards come in */}
          <div
            ref={headlineRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <h2
              className="text-center px-4"
              style={{
                fontSize: isDesktop ? 'clamp(3rem, 14vw, 14rem)' : 'clamp(2.5rem, 12vw, 4rem)',
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#1e293b',
              }}
            >
              {t('home.floatingCards.headline')}
              <br />
              <span style={{ color: '#e85d4c' }}>
                {t('home.floatingCards.headlineAccent')}
              </span>
            </h2>
          </div>

          {/* Cards container - always uses absolute positioning for stacking */}
          <div
            ref={cardsContainerRef}
            className="relative"
            style={{ zIndex: 1 }}
          >
            {isDesktop ? (
              // Desktop: absolute positioned cards
              CARD_POSITIONS.map((card, index) => {
                const CardComponent = CARD_COMPONENTS[card.id];
                return (
                  <div
                    key={card.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="absolute left-1/2 top-1/2 will-change-transform"
                    style={{ transform: 'translate(-50%, -50%)' }}
                  >
                    <CardComponent t={t} />
                  </div>
                );
              })
            ) : (
              // Mobile: absolute positioned overlapping stack - like jeton.com
              MOBILE_CARD_POSITIONS.map((pos, index) => {
                const CardComponent = CARD_COMPONENTS[pos.id];
                return (
                  <div
                    key={pos.id}
                    ref={(el) => (mobileCardsRef.current[index] = el)}
                    className="absolute left-1/2 top-1/2 will-change-transform"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      zIndex: pos.zIndex,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <CardComponent t={t} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
