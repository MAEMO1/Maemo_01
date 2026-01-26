import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useParallax } from '../../hooks/useParallax';

export function Hero() {
  const { t } = useTranslation();
  const parallaxSlow = useParallax(0.3);
  const parallaxFast = useParallax(0.5);

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient noise-overlay">
      {/* Decorative elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orb - moves slower */}
        <div
          className="absolute -top-[30%] -right-[20%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full animate-float parallax-slow"
          style={{
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 60%)',
            transform: `translateY(${parallaxSlow}px)`,
          }}
        />

        {/* Decorative line - moves faster */}
        <div
          className="absolute top-[20%] right-[10%] w-px h-[30vh] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0"
          style={{
            opacity: 0,
            animation: 'fade-in 1.5s ease-out 0.5s forwards',
            transform: `translateY(${parallaxFast}px)`,
          }}
        />

        {/* Small accent circle - moves faster */}
        <div
          className="absolute bottom-[25%] right-[15%] w-3 h-3 rounded-full bg-primary/40"
          style={{
            opacity: 0,
            animation: 'fade-in 1s ease-out 1s forwards',
            transform: `translateY(${parallaxFast}px)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto w-full">
          {/* Eyebrow */}
          <p
            className="text-primary text-sm md:text-base font-medium tracking-wide uppercase mb-6 md:mb-8"
            style={{ opacity: 0, animation: 'slide-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' }}
          >
            Exclusive Business Consultancy
          </p>

          {/* Main headline - Clean sans-serif */}
          <h1
            className="text-display text-ink mb-8 md:mb-12 max-w-4xl"
            style={{ opacity: 0, animation: 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards' }}
          >
            We <span className="text-primary">choose</span>
            <br />
            our clients.
          </h1>

          {/* Bottom row with subtitle and CTA */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p
              className="text-stone text-lg md:text-xl max-w-md leading-relaxed"
              style={{ opacity: 0, animation: 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards' }}
            >
              {t('home.hero.subtitle')}
            </p>

            <div
              className="flex items-center gap-6"
              style={{ opacity: 0, animation: 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards' }}
            >
              <Link
                to="/contact"
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
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-center gap-3"
        style={{ opacity: 0, animation: 'fade-in 1s ease-out 1.2s forwards' }}
      >
        <div className="w-5 h-8 rounded-full border border-stone/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-stone/50 rounded-full animate-float" />
        </div>
        <span className="text-xs text-stone/60 uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
