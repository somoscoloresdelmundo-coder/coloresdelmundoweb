import { ReactNode } from 'react';
import Badge from '@/components/ui/Badge';
import { ColorVariant } from '@/types/ui';

interface SectionHeaderProps {
  badge?: {
    text: string;
    color: ColorVariant;
  };
  title?: string | ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  if (!badge && !title && !description) return null;

  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <Badge color={badge.color} className="mb-4">
          {badge.text}
        </Badge>
      )}
      {title && (
        typeof title === 'string'
          ? <h2 className="mb-4">{title}</h2>
          : title
      )}
      {description && (
        <p className={`text-gris-600 text-lg ${centered ? 'max-w-2xl mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
