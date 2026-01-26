import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export function BottomNav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const items = [
    { path: '/', label: t('nav.home'), icon: <HomeIcon /> },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 glass-nav rounded-full shadow-nav"
      style={{ opacity: 0, animation: 'fade-in-up 0.6s ease-out 0.6s forwards' }}
    >
      {items.map(({ path, label, icon }) => {
        const active = pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              active
                ? 'bg-white text-primary'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
