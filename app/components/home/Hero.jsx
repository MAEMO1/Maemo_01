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
      const tl = gsap.timeline({
        defaults: { ease: 'cubic-bezier(.215,.61,.355,1)' },
        delay: 0.15,
      });

      // Headline - simple fade up
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2 }
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-white">
      {/* Content - centered with massive typography */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Massive headline - dominates the viewport */}
          <h1
            ref={headlineRef}
            className="text-ink will-change-transform"
            style={{
              fontSize: 'clamp(3.5rem, 15vw, 12rem)',
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              opacity: 0,
            }}
          >
            {t('home.hero.tagline')}
          </h1>

          {/* Subtitle - restrained */}
          <p
            ref={subtitleRef}
            className="mt-8 md:mt-12 text-stone text-lg md:text-xl max-w-xl leading-relaxed will-change-transform"
            style={{ opacity: 0 }}
          >
            {t('home.hero.subtitle').split('maemo').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="font-semibold text-ink">maemo</span>}
              </span>
            ))}
          </p>

          {/* CTA - minimal */}
          <div ref={ctaRef} className="mt-10 md:mt-14 will-change-transform" style={{ opacity: 0 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-white font-medium transition-opacity duration-200 hover:opacity-80"
            >
              {t('home.hero.cta')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
