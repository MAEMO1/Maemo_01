'use client';

import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { AnimatedNumber } from '../ui/AnimatedNumber';

// Card header height that stays visible when stacked
const HEADER_HEIGHT = 80;

const CARDS = [
  {
    id: 'jaarrekening',
    color: 'linear-gradient(145deg, #22c55e 0%, #16a34a 100%)',
    textColor: 'white',
    valueKey: 'home.floatingCards.cards.jaarrekening.value',
    labelKey: 'home.floatingCards.cards.jaarrekening.subtitle',
    titleKey: 'home.floatingCards.cards.jaarrekening.title',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'profitLoss',
    color: '#ffffff',
    textColor: '#1e293b',
    accentColor: '#3b82f6',
    valueKey: 'home.floatingCards.cards.profitLoss.value',
    labelKey: 'home.floatingCards.cards.profitLoss.label',
    titleKey: 'home.floatingCards.cards.profitLoss.title',
    border: '2px solid #3b82f6',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'marketPosition',
    color: '#ffffff',
    textColor: '#1e293b',
    accentColor: '#e85d4c',
    valueKey: 'home.floatingCards.cards.marketPosition.growth',
    labelKey: 'home.floatingCards.cards.marketPosition.label',
    titleKey: 'home.floatingCards.cards.marketPosition.title',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#e85d4c" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v16h18M7 16l4-4 4 4 5-5" />
      </svg>
    ),
  },
  {
    id: 'digitalPresence',
    color: 'linear-gradient(145deg, #fef2f1 0%, #fee2e2 100%)',
    textColor: '#1e293b',
    accentColor: '#e85d4c',
    valueKey: 'home.floatingCards.cards.digitalPresence.value',
    labelKey: 'home.floatingCards.cards.digitalPresence.label',
    titleKey: 'home.floatingCards.cards.digitalPresence.title',
    icon: (
      <svg className="w-5 h-5" fill="#e85d4c" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
  },
];

function StackCard({ card, t, index, innerRef }) {
  const valueColor = card.accentColor || card.textColor;

  return (
    <div
      ref={innerRef}
      className="absolute w-full left-0 rounded-2xl overflow-hidden"
      style={{
        background: card.color,
        border: card.border || 'none',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.15)',
        top: 0,
        zIndex: index + 1,
      }}
    >
      {/* Header - Always visible when stacked */}
      <div
        className="flex items-center justify-between px-6"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: card.accentColor
                ? `${card.accentColor}20`
                : 'rgba(255,255,255,0.2)'
            }}
          >
            {card.icon}
          </div>
          <div>
            <div
              className="text-sm font-medium opacity-70"
              style={{ color: card.textColor }}
            >
              {t(card.labelKey)}
            </div>
            <div
              className="text-2xl md:text-3xl font-bold"
              style={{ color: valueColor }}
            >
              <AnimatedNumber value={t(card.valueKey)} duration={1800} delay={200 + index * 150} />
            </div>
          </div>
        </div>
        <div
          className="text-xs font-medium opacity-50"
          style={{ color: card.textColor }}
        >
          {t(card.titleKey)}
        </div>
      </div>

      {/* Body - Gets covered by next card */}
      <div className="px-6 pb-6 pt-2">
        <div className="h-24 rounded-xl" style={{
          background: card.accentColor
            ? `${card.accentColor}10`
            : 'rgba(255,255,255,0.1)'
        }}>
          {/* Visual chart/graph placeholder */}
          <div className="flex items-end justify-center gap-2 h-full p-4">
            {[40, 65, 50, 80, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t transition-all duration-500"
                style={{
                  height: `${h}%`,
                  background: card.accentColor || 'rgba(255,255,255,0.3)',
                  opacity: 0.2 + (i * 0.2)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloatingCards() {
  const containerRef = useRef(null);
  const stackRef = useRef(null);
  const cardRefs = useRef([]);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const totalCards = cards.length;

      // Set initial positions - cards stacked off-screen below
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: 400 + (i * 50),
          opacity: 0,
        });
      });

      // Create timeline for stacking animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalCards * 400}`,
          scrub: 1,
          pin: stackRef.current,
        },
      });

      // Animate each card to stack position
      cards.forEach((card, i) => {
        const stackPosition = i * HEADER_HEIGHT;

        tl.to(card, {
          y: stackPosition,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, i * 0.5);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `${CARDS.length * 400 + 100}vh` }}
    >
      <div
        ref={stackRef}
        className="h-screen flex flex-col items-center justify-center px-4"
      >
        {/* Headline */}
        <h2
          className="text-center mb-12"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 600,
            color: '#1e293b',
          }}
        >
          {t('home.floatingCards.headline')}{' '}
          <span style={{ color: '#e85d4c' }}>{t('home.floatingCards.headlineAccent')}</span>
        </h2>

        {/* Card Stack Container */}
        <div
          className="relative w-full max-w-lg"
          style={{ height: CARDS.length * HEADER_HEIGHT + 120 }}
        >
          {CARDS.map((card, index) => (
            <StackCard
              key={card.id}
              card={card}
              t={t}
              index={index}
              innerRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
