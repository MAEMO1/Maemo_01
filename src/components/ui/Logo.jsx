import { Link } from 'react-router-dom';

export function Logo({ linkTo = '/', light = false, size = 'default' }) {
  const sizes = {
    small: { fontSize: '1.25rem', letterSpacing: '0.2em' },
    default: { fontSize: '1.5rem', letterSpacing: '0.25em' },
    large: { fontSize: '2rem', letterSpacing: '0.3em' },
  };

  const sizeStyle = sizes[size];

  const content = (
    <span
      className="font-medium select-none"
      style={{
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: sizeStyle.fontSize,
        letterSpacing: sizeStyle.letterSpacing,
        color: light ? '#ffffff' : '#1e293b',
        fontWeight: 500,
      }}
    >
      MAEMO
    </span>
  );

  if (!linkTo) return content;

  return (
    <Link to={linkTo} className="hover:opacity-70 transition-opacity duration-300">
      {content}
    </Link>
  );
}
