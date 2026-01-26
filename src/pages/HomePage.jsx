import { Hero } from '../components/home/Hero';
import { FloatingCards } from '../components/home/FloatingCards';
import { ActionStack } from '../components/home/ActionStack';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />

      {/* Big Text Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32 bg-white">
        <AnimatedSection className="text-center max-w-5xl" animation="fade-in-scale">
          <h2 className="text-headline text-primary">
            Strategic excellence
            <br />
            for the exceptional.
          </h2>
        </AnimatedSection>
      </section>

      {/* Floating Cards Section - Jeton style */}
      <FloatingCards />

      {/* Action Stack - Jeton Add/Send/Exchange style */}
      <ActionStack />

      {/* Full-bleed Statement Section - Large and impactful */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-ink">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection animation="fade-in-scale">
            <h2
              className="text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[1.1] tracking-tight mb-8"
              style={{ color: '#ffffff' }}
            >
              We identify potential before it
              <br />
              <span style={{ color: '#e85d4c' }}>becomes obvious.</span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <strong className="font-bold" style={{ color: '#ffffff' }}>maemo</strong> proactively selects high-potential enterprises. We don't wait for opportunities—we find them.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-headline mb-6" style={{ color: '#1e293b' }}>
              Ready to be <span style={{ color: '#e85d4c' }}>evaluated?</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
              <strong className="font-bold" style={{ color: '#1e293b' }}>maemo</strong> selects partners with exceptional potential. If you believe your business qualifies, we're listening.
            </p>
            <Link
              to="/contact"
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
    </>
  );
}
