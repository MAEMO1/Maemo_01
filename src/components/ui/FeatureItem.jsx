const COLORS = {
  teal: { bg: '#0d9488', text: '#0d9488' },
  navy: { bg: '#1e3a5f', text: '#1e3a5f' },
  slate: { bg: '#475569', text: '#475569' },
};

const ICONS = {
  chart: (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  bolt: (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
};

export function FeatureItem({ word, color = 'teal', icon = 'chart', className = '' }) {
  const colorConfig = COLORS[color] || COLORS.teal;
  const iconElement = ICONS[icon] || ICONS.chart;

  return (
    <div className={`flex items-center gap-8 ${className}`}>
      <div
        className="icon-box flex-shrink-0 shadow-soft"
        style={{ backgroundColor: colorConfig.bg }}
      >
        {iconElement}
      </div>
      <span
        className="text-feature"
        style={{ color: colorConfig.text }}
      >
        {word}
      </span>
    </div>
  );
}
