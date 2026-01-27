'use client';

import Link from 'next/link';

export function Logo({ linkTo = '/', light = false, size = 'default', variant }) {
  const sizes = {
    small: { fontSize: '1.25rem' },
    default: { fontSize: '1.6rem' },
    large: { fontSize: '2.5rem' },
  };

  const sizeStyle = sizes[size];

  // Support both 'light' prop and 'variant' prop
  const isLight = light || variant === 'light';

  const content = (
    <span
      className="select-none lowercase"
      style={{
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: sizeStyle.fontSize,
        letterSpacing: '-0.03em',
        color: isLight ? '#ffffff' : '#1e293b',
        fontWeight: 800,
      }}
    >
      maemo
    </span>
  );

  if (!linkTo) return content;

  return (
    <Link href={linkTo} className="hover:opacity-70 transition-opacity duration-300">
      {content}
    </Link>
  );
}
