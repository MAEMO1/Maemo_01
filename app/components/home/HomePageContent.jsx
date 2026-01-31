'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/gsap';
import { AnimatedSection } from '../ui/AnimatedSection';

const PREMIUM_EASE = 'cubic-bezier(.215,.61,.355,1)';

export function HomePageContent() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const isDesktop = useBreakpoint('md');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Split text into words for line 1
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;

      if (line1 && line2) {
        // Get the text content
        const text1 = t('home.bigText.line1');
        const text2 = t('home.bigText.line2');

        // Create word spans for line 1
        line1.innerHTML = text1.split(' ').map((word, i) =>
          `<span class="word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: top;">
            <span class="word" style="display: inline-block; transform: translateY(100%); opacity: 0;" data-index="${i}">${word}</span>
          </span>`
        ).join(' ');

        // Create word spans for line 2
        line2.innerHTML = text2.split(' ').map((word, i) =>
          `<span class="word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: top;">
            <span class="word" style="display: inline-block; transform: translateY(100%); opacity: 0;" data-index="${i}">${word}</span>
          </span>`
        ).join(' ');

        // Animate words on scroll
        const words1 = line1.querySelectorAll('.word');
        const words2 = line2.querySelectorAll('.word');

        // Line 1 animation
        gsap.to(words1, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: PREMIUM_EASE,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        // Line 2 animation with delay
        gsap.to(words2, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.3,
          ease: PREMIUM_EASE,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        // Subtle parallax on scroll - starts after reveal completes
        if (isDesktop) {
          gsap.fromTo(
            [line1, line2],
            { yPercent: 0 },
            {
              yPercent: -5, // Very subtle for smooth feel
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 50%', // After reveal trigger point
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, isDesktop, t]);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-40 flex items-center justify-center px-6 bg-white overflow-hidden"
    >
      <div className="text-center max-w-5xl">
        <h2
          className="will-change-transform"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#1e293b',
          }}
        >
          <span
            ref={line1Ref}
            className="block mb-2"
            style={{ visibility: mounted ? 'visible' : 'hidden' }}
          >
            {!mounted && t('home.bigText.line1')}
          </span>
          <span
            ref={line2Ref}
            className="block"
            style={{ color: '#e85d4c', visibility: mounted ? 'visible' : 'hidden' }}
          >
            {!mounted && t('home.bigText.line2')}
          </span>
        </h2>
      </div>
    </section>
  );
}

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-28 md:pb-36 px-6 bg-white overflow-hidden">
      {/* Gradient overlay from StatementSection */}
      <div
        className="absolute inset-x-0 top-0 h-24 sm:h-32 md:h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-headline mb-6" style={{ color: '#1e293b' }}>
            {t('home.cta.title')} <span style={{ color: '#e85d4c' }}>{t('home.cta.titleAccent')}</span>
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            <strong className="font-bold" style={{ color: '#1e293b' }}>maemo</strong> {t('home.cta.description')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[0.98] active:scale-[0.96]"
            style={{
              background: '#1e293b',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(30, 41, 59, 0.25), 0 8px 32px rgba(30, 41, 59, 0.15)',
              WebkitTapHighlightColor: 'transparent',
              transitionTimingFunction: 'cubic-bezier(.215,.61,.355,1)',
            }}
          >
            {t('home.hero.cta')}
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
