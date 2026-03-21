import { ColorVariant, colorClasses } from '@/types/ui';

interface ValueCardProps {
  number: string;
  title: string;
  description: string;
  color?: ColorVariant;
  span?: 1 | 2;
  className?: string;
}

export default function ValueCard({
  number,
  title,
  description,
  color = 'naranja',
  span = 1,
  className = '',
}: ValueCardProps) {
  const spanClass = span === 2 ? 'md:col-span-2' : '';
  const colors = colorClasses[color];

  return (
    <div className={`card text-center ${spanClass} ${className}`}>
      <span
        className={`text-4xl font-bold ${colors.text} opacity-20 mb-2 block`}
        aria-hidden="true"
      >
        {number}
      </span>
      <h3 className="font-semibold mb-2 dark:text-gris-100">{title}</h3>
      <p className="text-sm text-gris-600 dark:text-gris-400">{description}</p>
    </div>
  );
}
