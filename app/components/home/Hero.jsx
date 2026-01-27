'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap } from '../../lib/gsap';

export function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Premium staggered entrance animation - jeton.com level
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.2,
      });

      // Headline - dramatic entrance with scale and slight rotation
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 80, scale: 0.92, rotationX: 10 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.4 }
      );

      // Subtitle - smooth fade in with offset
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.8'
      );

      // CTA button - refined entrance with subtle bounce
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24">
        <div className="max-w-5xl mx-auto w-full text-center">
          <h1
            ref={headlineRef}
            className="text-ink mb-8 sm:mb-10 md:mb-14 will-change-transform"
            style={{
              fontSize: 'clamp(3rem, 12vw, 9rem)',
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              opacity: 0,
            }}
          >
            {t('home.hero.tagline').split(' ').slice(0, 2).join(' ')}
            <br />
            {t('home.hero.tagline').split(' ').slice(2).join(' ')}
          </h1>

          <p
            ref={subtitleRef}
            className="text-stone text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 md:mb-12 will-change-transform"
            style={{ opacity: 0 }}
          >
            {t('home.hero.subtitle').split('maemo').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <strong className="font-semibold text-ink">maemo</strong>}
              </span>
            ))}
          </p>

          <div ref={ctaRef} className="will-change-transform" style={{ opacity: 0 }}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-ink text-white font-medium hover:bg-charcoal transition-all duration-300 text-sm sm:text-base"
            >
              {t('home.hero.cta')}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator - with iOS safe area support */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pb-safe"
        style={{
          opacity: 0,
          animation: 'fade-in 1s ease-out 1s forwards',
          paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)'
        }}
      >
        <div className="w-5 h-8 rounded-full border border-stone/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-stone/50 rounded-full animate-float" />
        </div>
        <span className="text-xs text-stone/40 uppercase tracking-widest">{t('common.scroll')}</span>
      </div>
    </section>
  );
}
