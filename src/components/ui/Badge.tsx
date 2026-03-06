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
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : '';

  const colorClass = color === 'gray'
    ? 'bg-gris-100 text-gris-600 border-gris-200'
    : colorClasses[color].badge;

  return (
    <span className={`badge ${colorClass} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
}
