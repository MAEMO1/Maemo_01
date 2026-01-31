'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap } from '../../lib/gsap';

export function CTASection() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(.215,.61,.355,1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div ref={contentRef} className="text-center will-change-transform" style={{ opacity: 0 }}>
          <h2
            className="text-ink mb-6"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {t('home.cta.title')}{' '}
            <span className="text-coral">{t('home.cta.titleAccent')}</span>
          </h2>
          
          <p className="text-stone text-lg md:text-xl mb-10 max-w-xl mx-auto">
            <span className="font-semibold text-ink">maemo</span> {t('home.cta.description')}
          </p>
          
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
    </section>
  );
}
