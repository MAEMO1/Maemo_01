'use client';

import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';
import { AnimatedSection } from '../ui/AnimatedSection';

export function HomePageContent() {
  const { t } = useTranslation();

  return (
    <>
      {/* Big Text Section */}
      <section className="py-12 md:py-32 flex items-center justify-center px-6 bg-white">
        <AnimatedSection className="text-center max-w-5xl" animation="fade-in-scale">
          <h2 className="text-headline text-primary">
            {t('home.bigText.line1')}
            <br />
            {t('home.bigText.line2')}
          </h2>
        </AnimatedSection>
      </section>
    </>
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
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.95]"
            style={{
              background: '#1e293b',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(30, 41, 59, 0.25), 0 8px 32px rgba(30, 41, 59, 0.15)',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#334155';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 41, 59, 0.3), 0 12px 40px rgba(30, 41, 59, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e293b';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(30, 41, 59, 0.25), 0 8px 32px rgba(30, 41, 59, 0.15)';
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
