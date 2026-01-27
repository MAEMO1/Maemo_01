'use client';

import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto w-full text-center">
          <h1
            className="text-ink mb-8 md:mb-12"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              opacity: 0,
              animation: 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards'
            }}
          >
            We choose
            <br />
            our clients.
          </h1>

          <p
            className="text-stone text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ opacity: 0, animation: 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' }}
          >
            {t('home.hero.subtitle').split('maemo').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <strong className="font-semibold text-ink">maemo</strong>}
              </span>
            ))}
          </p>

          <div
            style={{ opacity: 0, animation: 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards' }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink text-white font-medium hover:bg-charcoal transition-all duration-300"
            >
              {t('home.hero.cta')}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0, animation: 'fade-in 1s ease-out 1s forwards' }}
      >
        <div className="w-5 h-8 rounded-full border border-stone/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-stone/50 rounded-full animate-float" />
        </div>
        <span className="text-xs text-stone/40 uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
