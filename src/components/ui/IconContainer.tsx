import { colorClasses, type ColorVariant } from '@/types/ui';

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
} as const;

const roundedClasses = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
} as const;

interface IconContainerProps {
  children: React.ReactNode;
  color: ColorVariant;
  size?: keyof typeof sizeClasses;
  rounded?: keyof typeof roundedClasses;
  className?: string;
}

export default function IconContainer({
  children,
  color,
  size = 'md',
  rounded = 'lg',
  className = '',
}: IconContainerProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={`${sizeClasses[size]} ${colors.bgAlpha10} ${roundedClasses[rounded]} flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
