'use client';

import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';
import { AnimatedSection } from '../ui/AnimatedSection';

export function HomePageContent() {
  const { t } = useTranslation();

  return (
    <>
      {/* Big Text Section */}
      <section className="py-24 md:py-32 flex items-center justify-center px-6 bg-white">
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
    <section className="py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-headline mb-6" style={{ color: '#1e293b' }}>
            {t('home.cta.title')} <span style={{ color: '#e85d4c' }}>{t('home.cta.titleAccent')}</span>
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            <strong className="font-bold" style={{ color: '#1e293b' }}>maemo</strong> {t('home.cta.description')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300"
            style={{ background: '#1e293b', color: '#ffffff' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#334155'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1e293b'; }}
          >
            {t('home.hero.cta')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
