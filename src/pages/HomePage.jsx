import { Hero } from '../components/home/Hero';
import { FloatingCards } from '../components/home/FloatingCards';
import { ActionStack } from '../components/home/ActionStack';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Link } from 'react-router-dom';

export default function HomePage() {

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
