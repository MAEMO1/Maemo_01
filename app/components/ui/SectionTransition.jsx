'use client';

/**
 * SectionTransition - Creates smooth gradient overlays between sections
 * Inspired by jeton.com's layered visual approach
 */
export function SectionTransition({
  from = '#ffffff',
  to = '#f8fafc',
  height = 'h-24 sm:h-32 md:h-40',
  direction = 'down' // 'down' or 'up'
}) {
  const gradientDirection = direction === 'down' ? 'to bottom' : 'to top';

  return (
    <div
      className={`relative ${height} w-full pointer-events-none`}
      style={{
        background: `linear-gradient(${gradientDirection}, ${from} 0%, ${to} 100%)`,
        marginTop: direction === 'down' ? '-1px' : 0,
        marginBottom: direction === 'up' ? '-1px' : 0,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * SectionDivider - Subtle accent line between sections
 */
export function SectionDivider({ color = '#e85d4c' }) {
  return (
    <div className="flex justify-center py-8 sm:py-12 md:py-16 bg-white">
      <div
        className="w-12 sm:w-16 h-0.5 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * OverlapSection - Creates a section that overlaps the previous one
 * Similar to jeton.com's negative margin stacking
 */
export function OverlapSection({
  children,
  className = '',
  overlap = '-mt-16 sm:-mt-20 md:-mt-24',
  background = '#f8fafc',
  zIndex = 1,
}) {
  return (
    <section
      className={`relative ${overlap} ${className}`}
      style={{
        background,
        zIndex,
      }}
    >
      {/* Soft top edge */}
      <div
        className="absolute inset-x-0 -top-16 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${background} 100%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </section>
  );
}
