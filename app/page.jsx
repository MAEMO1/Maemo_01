import { Hero } from './components/home/Hero';
import { FloatingCards } from './components/home/FloatingCards';
import { ActionStack } from './components/home/ActionStack';
import { StatementSection } from './components/home/StatementSection';
import { HomePageContent, CTASection } from './components/home/HomePageContent';

export const metadata = {
  title: 'maemo | Digital Marketing Bureau',
  description: 'maemo helpt ambitieuze bedrijven groeien met strategische marketing, branding en digitale oplossingen. Ontdek hoe wij jouw bedrijf naar het volgende niveau tillen.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomePageContent />
      <FloatingCards />
      <ActionStack />
      <StatementSection />
      <CTASection />
    </>
  );
}
