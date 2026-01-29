'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 100;

      setVisible(!scrollingDown);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    {
      path: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      path: '/contact',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex justify-center px-6 pb-4">
        <div
          className="flex items-center justify-center gap-1"
          style={{
            background: '#e85d4c',
            borderRadius: '7em',
            height: '48px',
            padding: '0 6px',
            boxShadow: '0 4px 24px rgba(232, 93, 76, 0.35), 0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {navItems.map(({ path, icon }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className="relative flex items-center justify-center transition-all duration-300"
                style={{
                  width: '44px',
                  height: '40px',
                  borderRadius: '6em',
                  color: 'white',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                }}
              >
                <div
                  className="transition-transform duration-300"
                  style={{
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    opacity: isActive ? 1 : 0.8,
                  }}
                >
                  {icon}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
