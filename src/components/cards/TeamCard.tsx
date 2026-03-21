import { ColorVariant, colorClasses } from '@/types/ui';

interface TeamCardProps {
  name: string;
  role?: string;
  color?: ColorVariant;
  className?: string;
}

export default function TeamCard({
  name,
  role,
  color = 'azul',
  className = '',
}: TeamCardProps) {
  const colors = colorClasses[color];
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={`card card-interactive group text-center ${className}`}>
      {/* Avatar con inicial */}
      <div
        className={`w-16 h-16 ${colors.bgColor} rounded-2xl flex items-center justify-center mb-4 mx-auto
          group-hover:scale-110 transition-transform`}
      >
        <span className={`text-2xl font-bold ${colors.textDark}`}>
          {initial}
        </span>
      </div>

      {/* Nombre */}
      <h3 className={`font-semibold text-base dark:text-gris-100 ${colors.hoverText} transition-colors`}>
        {name}
      </h3>

      {/* Rol (opcional) */}
      {role && (
        <p className={`${colors.text} font-medium text-sm mt-1`}>
          {role}
        </p>
      )}
    </div>
  );
}
