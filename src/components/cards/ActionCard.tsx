import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { ColorVariant, colorClasses } from '@/types/ui';
import { Pathnames } from '@/i18n/routing';
import { CheckIcon, ArrowRightIcon } from '@/components/ui';

interface ActionCardProps {
  icon: ReactNode;
  color: ColorVariant;
  title: string;
  description: string;
  href?: Pathnames;
  linkText?: string;
  details?: string[];
  className?: string;
}

export default function ActionCard({
  icon,
  color,
  title,
  description,
  href,
  linkText,
  details,
  className = '',
}: ActionCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`card card-interactive group ${className}`}>
      {/* Icono grande */}
      <div
        className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8
          transition-all duration-300 hover:scale-110 hover:rotate-3
          ${colors.bgAlpha10} ${colors.textDark}
          ${colors.hoverBg} hover:text-white hover:shadow-lg ${colors.hoverShadow}`}
      >
        {icon}
      </div>

      {/* Badge con subtítulo */}
      <span className={`badge ${colors.badge} mb-4`}>
        {title}
      </span>

      {/* Descripción */}
      <p className="text-gris-600 dark:text-gris-400 mb-6 text-lg leading-relaxed">
        {description}
      </p>

      {/* Lista de detalles si existe */}
      {details && details.length > 0 && (
        <ul className="space-y-3 mb-6">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bgAlpha10} ${colors.text}`}>
                <CheckIcon className="w-3 h-3" />
              </div>
              <span className="text-gris-700 dark:text-gris-300 text-sm">{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Link */}
      {href && linkText && (
        <Link href={href} className="btn-outline group/link inline-flex items-center">
          <span>{linkText}</span>
          <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover/link:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
