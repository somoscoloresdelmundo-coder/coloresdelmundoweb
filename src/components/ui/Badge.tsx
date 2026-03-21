import { ReactNode } from 'react';
import { ColorVariant, colorClasses } from '@/types/ui';

interface BadgeProps {
  children: ReactNode;
  color?: ColorVariant | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  color = 'naranja',
  size = 'md',
  className = ''
}: BadgeProps) {
  // Touch target mínimo 44px - ajustamos padding
  const sizeClasses = size === 'sm'
    ? 'text-xs px-3 py-1.5 min-h-[44px] inline-flex items-center'
    : 'min-h-[44px] inline-flex items-center';

  const colorClass = color === 'gray'
    ? 'bg-gris-100 text-gris-600 border-gris-200 dark:bg-gris-800 dark:text-gris-300'
    : colorClasses[color].badge;

  return (
    <span className={`badge ${colorClass} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
}
