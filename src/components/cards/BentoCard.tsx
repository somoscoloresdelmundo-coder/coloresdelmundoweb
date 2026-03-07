'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ColorVariant, colorClasses } from '@/types/ui';

interface BentoCardProps {
  children: ReactNode;
  color?: ColorVariant;
  span?: 1 | 2 | 3 | 'full';
  rowSpan?: 1 | 2;
  className?: string;
  variant?: 'default' | 'glass' | 'colored' | 'gradient';
}

const spanClasses = {
  1: '',
  2: 'span-2',
  3: 'span-3',
  full: 'span-full',
} as const;

export default function BentoCard({
  children,
  color = 'naranja',
  span = 1,
  rowSpan = 1,
  className = '',
  variant = 'default',
}: BentoCardProps) {
  const colors = colorClasses[color];

  const variantStyles = {
    default: 'card-bento',
    glass: 'card-bento glass-v2',
    colored: `card-bento ${colors.bgColor}`,
    gradient: `card-bento bg-gradient-to-br from-white to-${color}-subtle`,
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className={`${variantStyles[variant]} ${spanClasses[span]} ${rowSpan === 2 ? 'row-2' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
