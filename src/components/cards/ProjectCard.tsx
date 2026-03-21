import { ColorVariant, colorClasses } from '@/types/ui';

interface ProjectCardProps {
  type: string;
  title: string;
  description: string;
  status?: string;
  color?: ColorVariant;
  className?: string;
}

export default function ProjectCard({
  type,
  title,
  description,
  status,
  color = 'naranja',
  className = '',
}: ProjectCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`card ${className}`}>
      {/* Header con tipo y estado */}
      <div className="flex items-center justify-between mb-4">
        <span className={`badge ${colors.badge}`}>{type}</span>
        {status && (
          <span className="text-xs text-gris-500 dark:text-gris-400 bg-gris-100 dark:bg-gris-800 px-2 py-1 rounded">
            {status}
          </span>
        )}
      </div>

      {/* Título */}
      <h3 className="font-semibold text-lg mb-2 dark:text-gris-100">{title}</h3>

      {/* Descripción */}
      <p className="text-sm text-gris-600 dark:text-gris-400">{description}</p>
    </div>
  );
}
