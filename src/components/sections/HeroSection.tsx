'use client';

import { ReactNode } from 'react';
import Badge from '@/components/ui/Badge';
import Button, { ArrowIcon } from '@/components/ui/Button';
import { ColorVariant, CTAConfig, BackgroundVariant } from '@/types/ui';

interface HeroSectionProps {
  badge?: {
    text: string;
    color: ColorVariant;
  };
  title: string | ReactNode;
  description: string;
  cta?: {
    primary?: CTAConfig;
    secondary?: CTAConfig;
  };
  background?: BackgroundVariant;
  backgroundVariant?: 'corners' | 'scattered' | 'hero' | 'minimal';
  children?: ReactNode;
  className?: string;
}

// Color variants for floating shapes
const SHAPE_COLORS = {
  azul: ['#3B82F6', '#60A5FA', '#93C5FD'],
  lima: ['#84CC16', '#A3E635', '#BEF264'],
  naranja: ['#F97316', '#FB923C', '#FDBA74'],
  terracota: ['#C2410C', '#EA580C', '#FB923C'],
};

export default function HeroSection({
  badge,
  title,
  description,
  cta,
  background = 'shapes',
  backgroundVariant = 'corners',
  children,
  className = '',
}: HeroSectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gris-50',
    gradient: 'bg-gradient-to-br from-gris-50 to-white',
    shapes: 'bg-gradient-to-br from-gris-50 via-white to-gris-50',
    mondrian: '',
  };

  // Get colors based on badge color
  const colors = badge?.color ? SHAPE_COLORS[badge.color] || SHAPE_COLORS.azul : SHAPE_COLORS.azul;

  return (
    <section className={`relative overflow-hidden min-h-[70vh] flex items-center ${bgClasses[background]} ${className}`}>
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient blob */}
        <div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20 animate-blob"
          style={{
            background: `radial-gradient(circle, ${colors[0]}40 0%, transparent 70%)`,
            animationDelay: '0s',
          }}
        />

        {/* Medium blob */}
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-15 animate-blob"
          style={{
            background: `radial-gradient(circle, ${colors[1]}40 0%, transparent 70%)`,
            animationDelay: '2s',
          }}
        />

        {/* Small accent blob */}
        <div
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-20 animate-blob"
          style={{
            background: `radial-gradient(circle, ${colors[2]}50 0%, transparent 70%)`,
            animationDelay: '4s',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="container py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          {/* Badge with entrance animation */}
          {badge && (
            <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <Badge color={badge.color} className="mb-6">
                {badge.text}
              </Badge>
            </div>
          )}

          {/* Title with entrance animation */}
          <h1 className="mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {title}
          </h1>

          {/* Description with entrance animation */}
          <p
            className="text-lg md:text-xl text-gris-600 leading-relaxed mb-8 animate-fadeInUp"
            style={{ animationDelay: '0.3s' }}
          >
            {description}
          </p>

          {/* CTAs with entrance animation */}
          {cta && (
            <div
              className="flex flex-wrap gap-4 animate-fadeInUp"
              style={{ animationDelay: '0.4s' }}
            >
              {cta.primary && (
                <Button
                  href={cta.primary.href}
                  variant="primary"
                  icon={cta.primary.icon !== false ? <ArrowIcon /> : undefined}
                >
                  {cta.primary.text}
                </Button>
              )}
              {cta.secondary && (
                <Button
                  href={cta.secondary.href}
                  variant="secondary"
                  icon={cta.secondary.icon ? <ArrowIcon /> : undefined}
                >
                  {cta.secondary.text}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Additional content */}
        {children && (
          <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            {children}
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.05);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          75% {
            transform: translate(30px, 10px) scale(1.02);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 15s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-blob,
          .animate-fadeInUp {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
