import { useTranslation } from '../hooks/useTranslation';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  const fadeClass = (delay = 0) =>
    `transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

  return (
    <div className="min-h-screen bg-hero-gradient">
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-primary/10 border border-primary/20 ${fadeClass()}`}
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary text-sm font-medium">By Invitation</span>
          </div>

          {/* Title */}
          <h1 className={`text-headline text-primary mb-6 ${fadeClass()}`} style={{ transitionDelay: '100ms' }}>
            {t('contact.title')}
          </h1>

          {/* Subtitle */}
          <p className={`text-xl text-text-medium max-w-2xl mx-auto mb-12 ${fadeClass()}`} style={{ transitionDelay: '200ms' }}>
            {t('contact.subtitle')}
          </p>

          {/* Contact Info */}
          <div className={`space-y-8 ${fadeClass()}`} style={{ transitionDelay: '300ms' }}>
            <div>
              <p className="text-sm text-text-light uppercase tracking-wider mb-2">Email</p>
              <a
                href="mailto:inquiries@maemo.be"
                className="text-2xl md:text-3xl font-medium text-text-dark hover:text-primary transition-colors"
              >
                inquiries@maemo.be
              </a>
            </div>

            <div>
              <p className="text-sm text-text-light uppercase tracking-wider mb-2">Location</p>
              <p className="text-2xl md:text-3xl font-medium text-text-dark">
                Ghent, Belgium
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className={`text-sm text-text-light mt-16 max-w-md mx-auto ${fadeClass()}`} style={{ transitionDelay: '400ms' }}>
            {t('contact.disclaimer')}
          </p>
        </div>
      </section>
    </div>
  );
}
