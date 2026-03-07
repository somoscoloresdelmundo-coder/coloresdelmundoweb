import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { ColorVariant, colorClasses } from '@/types/ui';
import { Pathnames } from '@/i18n/routing';
import { ChevronRightIcon } from '@/components/ui';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: ColorVariant;
  href?: Pathnames;
  linkText?: string;
  variant?: 'default' | 'bordered' | 'interactive';
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  color = 'naranja',
  href,
  linkText,
  variant = 'default',
  className = '',
}: FeatureCardProps) {
  const colors = colorClasses[color];

  const variantClasses = {
    default: 'card',
    bordered: `card border-l-4 ${colors.border}`,
    interactive: 'card card-interactive',
  };

  const content = (
    <>
      <div
        className={`w-14 h-14 ${colors.bgColor} rounded-2xl flex items-center justify-center mb-5
          group-hover:scale-110 ${colors.groupHoverBg} transition-all duration-300`}
      >
        <div className={`${colors.textDark} group-hover:text-white transition-colors`}>
          {icon}
        </div>
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${colors.hoverText} transition-colors`}>
        {title}
      </h3>
      <p className="text-gris-600 text-sm leading-relaxed mb-4">
        {description}
      </p>
      {linkText && (
        <div className={`flex items-center ${colors.textDark} text-sm font-medium`}>
          <span>{linkText}</span>
          <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${variantClasses[variant]} group block ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`${variantClasses[variant]} group ${className}`}>
      {content}
    </div>
  );
}
