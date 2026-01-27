'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const CARD_SIZE = 'w-[220px] h-[240px] md:w-[260px] md:h-[280px]';

const CARD_COMPONENTS = {
  jaarrekening: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-3xl p-4 md:p-5 flex flex-col justify-between`}
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
        <span className="text-white text-sm md:text-base font-semibold">{t('home.floatingCards.cards.jaarrekening.title')}</span>
      </div>
      <div className="space-y-1">
        <div className="text-white/60 text-xs md:text-sm">{t('home.floatingCards.cards.jaarrekening.subtitle')}</div>
        <div className="text-white text-xl md:text-2xl font-bold">{t('home.floatingCards.cards.jaarrekening.value')}</div>
        <div className="text-white/50 text-xs">{t('home.floatingCards.cards.jaarrekening.label')}</div>
      </div>
      <div
        className="px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-center"
        style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
      >
        {t('home.floatingCards.cards.jaarrekening.status')}
      </div>
    </div>
  ),
  profitLoss: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-3xl p-4 md:p-5 flex flex-col`}
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
        <span className="text-blue-600 text-sm md:text-base font-bold">{t('home.floatingCards.cards.profitLoss.title')}</span>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{t('home.floatingCards.cards.profitLoss.value')}</div>
      <div className="text-xs md:text-sm text-slate-400 mb-3">{t('home.floatingCards.cards.profitLoss.label')}</div>
      <div className="mt-auto flex gap-1">
        <div className="flex-1 h-6 md:h-8 bg-blue-100 rounded"></div>
        <div className="flex-1 h-10 md:h-12 bg-blue-200 rounded"></div>
        <div className="flex-1 h-8 md:h-10 bg-blue-300 rounded"></div>
        <div className="flex-1 h-14 md:h-16 bg-blue-500 rounded"></div>
      </div>
    </div>
  ),
  administration: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center`}
      style={{
        background: 'linear-gradient(145deg, #fce7f3 0%, #f5d0fe 100%)',
        boxShadow: '0 25px 50px rgba(236, 72, 153, 0.2)',
      }}
    >
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-xl mb-3 flex items-center justify-center"
        style={{ background: 'linear-gradient(145deg, #ec4899 0%, #a855f7 100%)' }}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <div className="text-slate-800 text-base md:text-lg font-bold">{t('home.floatingCards.cards.administration.title')}</div>
      <div className="text-xs md:text-sm text-slate-500 mt-1">{t('home.floatingCards.cards.administration.label')}</div>
      <div className="flex items-center gap-1 mt-2">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-green-600 font-medium">{t('home.floatingCards.cards.administration.status')}</span>
      </div>
    </div>
  ),
  marketPosition: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-3xl p-4 md:p-5 flex flex-col`}
      style={{
        background: 'linear-gradient(145deg, #fef3c7 0%, #fde68a 100%)',
        boxShadow: '0 25px 50px rgba(245, 158, 11, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <span className="text-amber-700 text-sm md:text-base font-bold">{t('home.floatingCards.cards.marketPosition.title')}</span>
      </div>
      <div className="text-xs md:text-sm text-amber-600 mb-2">{t('home.floatingCards.cards.marketPosition.label')}</div>
      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-amber-200 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-amber-500 rounded-full"></div>
          </div>
          <span className="text-amber-700 text-sm font-bold">{t('home.floatingCards.cards.marketPosition.growth')}</span>
        </div>
      </div>
    </div>
  ),
  digitalPresence: ({ t }) => (
    <div
      className={`${CARD_SIZE} rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center`}
      style={{
        background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
        boxShadow: '0 25px 50px rgba(30, 41, 59, 0.3)',
      }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl mb-3 bg-white/10 flex items-center justify-center">
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>
      <div className="text-white text-base md:text-lg font-bold">{t('home.floatingCards.cards.digitalPresence.title')}</div>
      <div className="text-2xl md:text-3xl font-bold text-white mt-1">{t('home.floatingCards.cards.digitalPresence.value')}</div>
      <div className="text-xs md:text-sm text-white/60 mt-1">{t('home.floatingCards.cards.digitalPresence.label')}</div>
    </div>
  ),
};

// Card positions - fly in from edges on desktop
const CARDS = [
  { id: 'jaarrekening', component: 'jaarrekening', startX: -150, startY: -100, endX: -25, endY: -15 },
  { id: 'profitLoss', component: 'profitLoss', startX: 150, startY: -80, endX: 20, endY: -10 },
  { id: 'marketPosition', component: 'marketPosition', startX: -120, startY: 100, endX: -18, endY: 12 },
  { id: 'digitalPresence', component: 'digitalPresence', startX: 120, startY: 80, endX: 15, endY: 8 },
  { id: 'administration', component: 'administration', startX: 0, startY: 150, endX: 0, endY: 18 },
];

export function FloatingCards() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    // Only run animations on desktop
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

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
      CARDS.forEach((card, index) => {
        const cardEl = cardRefs.current[index];
        if (!cardEl) return;

        gsap.set(cardEl, {
          x: `${card.startX}%`,
          y: `${card.startY}%`,
          opacity: 0,
          scale: 0.8,
        });

        tl.to(cardEl, {
          x: `${card.endX}%`,
          y: `${card.endY}%`,
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
  }, [mounted]);

  // Mobile cards subset
  const mobileCardIds = ['jaarrekening', 'profitLoss', 'administration'];

  return (
    <section ref={containerRef} className="relative bg-white">
      {/* MOBILE LAYOUT - visible on small screens only */}
      <div className="md:hidden py-16 px-6">
        <h2
          className="text-center mb-10"
          style={{
            fontSize: 'clamp(1.75rem, 8vw, 2.5rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#1e293b',
          }}
        >
          {t('home.floatingCards.headline')}
          <br />
          <span style={{ color: '#e85d4c' }}>{t('home.floatingCards.headlineAccent')}</span>
        </h2>
        <div className="flex flex-col items-center gap-4">
          {mobileCardIds.map((cardId) => {
            const CardComponent = CARD_COMPONENTS[cardId];
            return (
              <div key={cardId} style={{ transform: 'scale(0.9)' }}>
                <CardComponent t={t} />
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP LAYOUT - visible on md+ screens only */}
      <div className="hidden md:block h-[250vh]">
        <div className="floating-cards-content h-screen flex items-center justify-center overflow-hidden">
          <div
            ref={headlineRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <h2
              className="text-center px-4"
              style={{
                fontSize: 'clamp(2rem, 8vw, 8rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'rgba(30, 41, 59, 0.25)',
              }}
            >
              {t('home.floatingCards.headline')}
              <br />
              <span style={{ color: 'rgba(232, 93, 76, 0.35)' }}>
                {t('home.floatingCards.headlineAccent')}
              </span>
            </h2>
          </div>
          <div ref={cardsContainerRef} className="relative" style={{ zIndex: 1 }}>
            {CARDS.map((card, index) => {
              const CardComponent = CARD_COMPONENTS[card.component];
              return (
                <div
                  key={card.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <CardComponent t={t} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
