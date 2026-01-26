import { Link } from 'react-router-dom';

export function Logo({ linkTo = '/', light = false, size = 'default' }) {
  const sizes = {
    small: { fontSize: '1.25rem' },
    default: { fontSize: '1.6rem' },
    large: { fontSize: '2.5rem' },
  };

  const sizeStyle = sizes[size];

  const content = (
    <span
      className="select-none lowercase"
      style={{
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: sizeStyle.fontSize,
        letterSpacing: '-0.03em',
        color: light ? '#ffffff' : '#1e293b',
        fontWeight: 800,
      }}
    >
      maemo
    </span>
  );

  if (!linkTo) return content;

  return (
    <Link to={linkTo} className="hover:opacity-70 transition-opacity duration-300">
      {content}
    </Link>
  );
}
