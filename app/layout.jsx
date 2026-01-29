import './globals.css';
import { Providers } from './providers';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';

export const metadata = {
  title: 'maemo | Digital Marketing Bureau',
  description: 'maemo helpt ambitieuze bedrijven groeien met strategische marketing, branding en digitale oplossingen. Ontdek hoe wij jouw bedrijf naar het volgende niveau tillen.',
  keywords: 'marketing, digital marketing, branding, website, SEO, strategie, België',
  authors: [{ name: 'maemo' }],
  openGraph: {
    title: 'maemo | Digital Marketing Bureau',
    description: 'maemo helpt ambitieuze bedrijven groeien met strategische marketing, branding en digitale oplossingen.',
    url: 'https://maemo.be',
    siteName: 'maemo',
    locale: 'nl_BE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'maemo | Digital Marketing Bureau',
    description: 'maemo helpt ambitieuze bedrijven groeien met strategische marketing, branding en digitale oplossingen.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
