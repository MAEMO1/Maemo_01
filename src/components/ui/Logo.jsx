import { Link } from 'react-router-dom';

export function Logo({ linkTo = '/', light = false }) {
  const content = (
    <span
      className="font-medium text-2xl tracking-tight select-none"
      style={{ color: light ? '#ffffff' : '#1a1a1a' }}
    >
      MAEMO
    </span>
  );

  if (!linkTo) return content;

  return (
    <Link to={linkTo} className="hover:opacity-80 transition-opacity">
      {content}
    </Link>
  );
}
