import { useTranslation } from '../hooks/useTranslation';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PILLARS = [
  { key: 'market', num: '01', color: '#0d9488' },
  { key: 'financial', num: '02', color: '#1e3a5f' },
  { key: 'growth', num: '03', color: '#475569' },
  { key: 'digital', num: '04', color: '#0d9488' },
];

export default function ApproachPage() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20 bg-hero-gradient">
        <div className="text-center max-w-5xl">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-primary/10 border border-primary/20 transition-all duration-500 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary text-sm font-medium">Strategic Framework</span>
          </div>

          <h1
            className={`text-headline text-primary mb-6 transition-all duration-500 delay-100 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t('approach.title')}
          </h1>

          <p
            className={`text-xl text-text-medium max-w-2xl mx-auto transition-all duration-500 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t('approach.subtitle')}
          </p>
        </div>
      </section>

      {/* Pillars */}
      {PILLARS.map((pillar, i) => (
        <section
          key={pillar.key}
          className={`py-32 px-6 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <AnimatedSection>
                <div className="flex items-start gap-6">
                  <span
                    className="text-8xl md:text-9xl font-medium leading-none"
                    style={{ color: pillar.color }}
                  >
                    {pillar.num}
                  </span>
                  <div className="pt-4">
                    <h2 className="text-3xl md:text-4xl font-medium text-text-dark mb-4">
                      {t(`approach.pillars.${pillar.key}.title`)}
                    </h2>
                    <p className="text-lg text-text-medium leading-relaxed">
                      {t(`approach.pillars.${pillar.key}.description`)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div
                  className="aspect-square max-w-sm mx-auto rounded-3xl flex items-center justify-center"
                  style={{ backgroundColor: `${pillar.color}10` }}
                >
                  <span
                    className="text-[12rem] font-medium opacity-20"
                    style={{ color: pillar.color }}
                  >
                    {pillar.num}
                  </span>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-headline text-white mb-6">
              Ready to be evaluated?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              MAEMO selects partners with exceptional potential. We're listening.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-primary font-semibold text-lg hover:bg-white/90 transition-colors"
            >
              Get in Touch
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
