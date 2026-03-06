import { ReactNode } from 'react';
import Button, { ArrowIcon } from '@/components/ui/Button';
import { MondrianGrid } from '@/components/decorations';
import { CTAConfig, BackgroundVariant } from '@/types/ui';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryButton: CTAConfig;
  secondaryButton?: CTAConfig;
  background?: 'white' | 'gray' | 'shapes' | 'mondrian';
  className?: string;
  children?: ReactNode;
}

export default function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  background = 'gray',
  className = '',
  children,
}: CTASectionProps) {
  const needsDecoration = background === 'shapes' || background === 'mondrian';
  const bgClass = background === 'white' ? 'bg-white' : background === 'gray' ? 'bg-gris-50' : '';

  return (
    <section className={`section ${bgClass} relative overflow-hidden scroll-reveal ${className}`}>
      {/* Decoración de fondo */}
      {background === 'mondrian' && <MondrianGrid variant="default" opacity={40} />}

      <div className="container text-center relative z-10">
        {/* Card con glassmorphism para fondos decorativos */}
        <div className={needsDecoration ? 'bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-2xl mx-auto' : 'max-w-2xl mx-auto'}>
          {/* Decoración superior */}
          {needsDecoration && (
            <div className="divider-4colors w-20 mx-auto mb-6" />
          )}

          {/* Título */}
          <h2 className="mb-6">{title}</h2>

          {/* Descripción */}
          {description && (
            <p className="text-gris-600 mb-8 max-w-xl mx-auto">
              {description}
            </p>
          )}

          {/* Contenido adicional */}
          {children}

          {/* Botones */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href={primaryButton.href}
              variant="primary"
              icon={primaryButton.icon !== false ? <ArrowIcon /> : undefined}
            >
              {primaryButton.text}
            </Button>
            {secondaryButton && (
              <Button
                href={secondaryButton.href}
                variant="secondary"
                icon={secondaryButton.icon ? <ArrowIcon /> : undefined}
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
