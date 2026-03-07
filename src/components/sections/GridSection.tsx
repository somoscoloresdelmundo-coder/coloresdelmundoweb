import { ReactNode } from 'react';
import SectionHeader from './SectionHeader';
import { ColorVariant, GridColumns } from '@/types/ui';

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

const bgClasses = {
  white: 'bg-white',
  gray: 'bg-gris-50',
} as const;

const columnClasses = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
} as const;

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
} as const;

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
  return (
    <section className={`section ${bgClasses[background]} scroll-reveal ${className}`}>
      <div className="container">
        <SectionHeader
          badge={badge}
          title={title}
          description={description}
          centered={centered}
        />

        <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${stagger ? 'stagger-container' : ''}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
