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
    shapes: 'bg-gradient-to-br from-gris-50 to-white',
    mondrian: '',
  };

  return (
    <section className={`relative overflow-hidden ${bgClasses[background]} ${className}`}>
      {/* Contenido */}
      <div className="container py-20 md:py-28 relative z-10">
        <div className="max-w-3xl anim-slide-up">
          {/* Badge */}
          {badge && (
            <Badge color={badge.color} className="mb-6">
              {badge.text}
            </Badge>
          )}

          {/* Título */}
          <h1 className="mb-6">
            {title}
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-gris-600 leading-relaxed mb-8">
            {description}
          </p>

          {/* CTAs */}
          {cta && (
            <div className="flex flex-wrap gap-4">
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

        {/* Contenido adicional (logo, stats, etc.) */}
        {children}
      </div>
    </section>
  );
}
