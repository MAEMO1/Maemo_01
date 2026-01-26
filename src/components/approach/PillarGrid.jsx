import { useTranslation } from '../../hooks/useTranslation';
import { PillarCard } from './PillarCard';
import { cn } from '../../utils/cn';

const pillarKeys = ['market', 'financial', 'growth', 'digital'];

export function PillarGrid() {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',
        'max-w-5xl mx-auto'
      )}
    >
      {pillarKeys.map((key, index) => (
        <PillarCard
          key={key}
          pillarKey={key}
          title={t(`approach.pillars.${key}.title`)}
          description={t(`approach.pillars.${key}.description`)}
          index={index}
        />
      ))}
    </div>
  );
}
