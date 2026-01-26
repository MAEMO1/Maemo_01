import { Hero } from '../components/home/Hero';
import { FloatingCards } from '../components/home/FloatingCards';
import { ActionStack } from '../components/home/ActionStack';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

const PILLARS = [
  { num: '01', key: 'market', color: '#0d9488' },
  { num: '02', key: 'financial', color: '#1e3a5f' },
  { num: '03', key: 'growth', color: '#475569' },
  { num: '04', key: 'digital', color: '#0d9488' },
];

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

      {/* Full-bleed Primary Section */}
      <section className="py-32 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-in-scale">
            <h2 className="text-headline text-white mb-6">
              We identify potential before it becomes obvious.
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              MAEMO proactively selects high-potential enterprises. We don't wait for opportunities—we find them.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Four Pillars Preview */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-headline text-primary">Four Pillars</h2>
            <p className="text-xl text-text-medium mt-4">Our evaluation framework</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => (
              <AnimatedSection key={pillar.num} delay={i * 100}>
                <div className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <span
                    className="text-5xl font-medium block mb-4"
                    style={{ color: pillar.color }}
                  >
                    {pillar.num}
                  </span>
                  <h3 className="text-xl font-medium text-text-dark">
                    {t(`approach.pillars.${pillar.key}.title`)}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={500} className="text-center mt-12">
            <Link
              to="/approach"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
            >
              Discover our approach
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-headline text-text-dark mb-6">
              Ready to be<span className="text-primary"> evaluated?</span>
            </h2>
            <p className="text-xl text-text-medium mb-10 max-w-2xl mx-auto">
              MAEMO selects partners with exceptional potential. If you believe your business qualifies, we're listening.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-white font-semibold text-lg hover:bg-primary-dark transition-colors"
            >
              Get in Touch
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
