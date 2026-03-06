import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { Pathnames } from '@/i18n/routing';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: Pathnames;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  href,
  icon,
  iconPosition = 'right',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  };

  const baseClasses = `${variantClasses[variant]} group ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2 transition-transform group-hover:-translate-x-1">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="ml-2 transition-transform group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
}

// Icono de flecha común para CTAs
export function ArrowIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
