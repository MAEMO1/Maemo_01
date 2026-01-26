import { cn } from '../../utils/cn';

// Color schemes for each pillar - Jeton style
const colorSchemes = {
  market: {
    bg: 'bg-green',
    text: 'text-white',
    icon: 'text-white',
  },
  financial: {
    bg: 'bg-blue',
    text: 'text-white',
    icon: 'text-white',
  },
  growth: {
    bg: 'bg-coral',
    text: 'text-white',
    icon: 'text-white',
  },
  digital: {
    bg: 'bg-purple',
    text: 'text-white',
    icon: 'text-white',
  },
};

// Icons for each pillar
const icons = {
  market: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  financial: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  growth: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  digital: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export function PillarCard({ pillarKey, title, description, index = 0 }) {
  const colors = colorSchemes[pillarKey] || colorSchemes.market;

  return (
    <div
      className={cn(
        'group relative p-8 md:p-10 rounded-3xl',
        colors.bg,
        'transition-all duration-300 ease-out',
        'hover:scale-[1.02] hover:shadow-xl',
        'opacity-0 animate-fade-in-up'
      )}
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      {/* Icon */}
      <div className={cn('mb-6', colors.icon)}>
        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
          {icons[pillarKey]}
        </div>
      </div>

      {/* Title */}
      <h3 className={cn('font-bold text-2xl md:text-3xl mb-4', colors.text)}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn('text-lg leading-relaxed', colors.text, 'opacity-90')}>
        {description}
      </p>
    </div>
  );
}
