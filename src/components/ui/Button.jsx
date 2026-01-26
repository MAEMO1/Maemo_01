import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  to,
  className = '',
  ...props
}) {
  const baseStyles = cn(
    'inline-flex items-center justify-center',
    'font-sans uppercase tracking-nav text-sm',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-maemo-gold/50 focus:ring-offset-2 focus:ring-offset-maemo-dark'
  );

  const variants = {
    primary: cn(
      'border border-maemo-gold/40 text-maemo-text',
      'hover:border-maemo-gold hover:text-maemo-gold',
      'bg-transparent'
    ),
    secondary: cn(
      'border border-maemo-border text-maemo-text-secondary',
      'hover:border-maemo-text-secondary hover:text-maemo-text',
      'bg-transparent'
    ),
    ghost: cn(
      'text-maemo-text-secondary',
      'hover:text-maemo-text',
      'bg-transparent border-none'
    ),
  };

  const sizes = {
    default: 'px-6 py-3',
    small: 'px-4 py-2 text-xs',
    large: 'px-8 py-4',
  };

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  // Render as Link for internal routes
  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  // Render as anchor for external links
  if (href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
