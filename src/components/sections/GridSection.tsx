import { ReactNode } from 'react';
import Badge from '@/components/ui/Badge';
import { ColorVariant, GridColumns, BackgroundVariant } from '@/types/ui';

interface GridSectionProps {
  badge?: {
    text: string;
    color: ColorVariant;
  };
  title?: string;
  description?: string;
  columns?: GridColumns;
  background?: 'white' | 'gray';
  children: ReactNode;
  className?: string;
  centered?: boolean;
  gap?: 'sm' | 'md' | 'lg';
  stagger?: boolean;
}

export default function GridSection({
  badge,
  title,
  description,
  columns = 3,
  background = 'white',
  children,
  className = '',
  centered = true,
  gap = 'md',
  stagger = false,
}: GridSectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gris-50',
  };

  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const staggerClass = stagger ? 'stagger-container' : '';

  return (
    <section className={`section ${bgClasses[background]} scroll-reveal ${className}`}>
      <div className="container">
        {/* Header */}
        {(badge || title || description) && (
          <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {badge && (
              <Badge color={badge.color} className="mb-4">
                {badge.text}
              </Badge>
            )}
            {title && <h2 className="mb-4">{title}</h2>}
            {description && (
              <p className={`text-gris-600 text-lg ${centered ? 'max-w-2xl mx-auto' : ''}`}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${staggerClass}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
