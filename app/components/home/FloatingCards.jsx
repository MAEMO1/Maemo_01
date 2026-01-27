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
};

// Card positions - fly in from edges on desktop
const CARDS = [
  { id: 'jaarrekening', component: 'jaarrekening', startX: -150, startY: -100, endX: -15, endY: -8 },
  { id: 'profitLoss', component: 'profitLoss', startX: 150, startY: -80, endX: 12, endY: -5 },
  { id: 'administration', component: 'administration', startX: 0, startY: 120, endX: 0, endY: 10 },
];

export function FloatingCards() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return; // No scroll animations on mobile

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
      tl.to(headlineRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
      }, 0);

      // Cards fly in from their start positions
      CARDS.forEach((card, index) => {
        const cardEl = cardRefs.current[index];
        if (!cardEl) return;

        // Set initial position (off-screen)
        gsap.set(cardEl, {
          x: `${card.startX}%`,
          y: `${card.startY}%`,
          opacity: 0,
          scale: 0.8,
        });

        // Animate to final position
        tl.to(cardEl, {
          x: `${card.endX}%`,
          y: `${card.endY}%`,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, 0.1 + index * 0.1);
      });

      // After cards are in place, scale up slightly
      tl.to(cardsContainerRef.current, {
        scale: 1.05,
        duration: 0.3,
      }, 0.6);

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className={`relative ${isMobile ? 'min-h-screen' : 'h-[250vh]'}`}
      style={{ background: '#ffffff' }}
    >
      <div className={`floating-cards-content ${isMobile ? '' : 'h-screen'} flex items-center justify-center overflow-hidden py-16 md:py-0`}>
        {/* Headline */}
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
              color: 'rgba(30, 41, 59, 0.08)',
            }}
          >
            {t('home.floatingCards.headline')}
            <br />
            <span style={{ color: 'rgba(232, 93, 76, 0.12)' }}>{t('home.floatingCards.headlineAccent')}</span>
          </h2>
        </div>

        {/* Cards - fly in on desktop, static on mobile */}
        <div
          ref={cardsContainerRef}
          className="relative flex flex-col md:block items-center gap-4 md:gap-0"
          style={{ zIndex: 1 }}
        >
          {CARDS.map((card, index) => {
            const CardComponent = CARD_COMPONENTS[card.component];
            return (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="relative md:absolute md:left-1/2 md:top-1/2"
                style={{
                  transform: isMobile
                    ? 'none'
                    : 'translate(-50%, -50%)',
                }}
              >
                <CardComponent t={t} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
