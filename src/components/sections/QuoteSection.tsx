import { MondrianGrid } from '@/components/decorations';

interface QuoteSectionProps {
  quote: string;
  author?: string;
  className?: string;
}

export default function QuoteSection({
  quote,
  author = 'Colores del Mundo',
  className = '',
}: QuoteSectionProps) {
  return (
    <section className={`py-20 relative overflow-hidden ${className}`}>
      {/* Fondo artístico Mondrian */}
      <MondrianGrid variant="default" opacity={40} />

      <div className="container relative z-10">
        <blockquote className="max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          {/* Icono de comillas */}
          <svg className="w-12 h-12 mx-auto mb-6 text-naranja" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>

          {/* Cita */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium italic mb-8 leading-relaxed text-gris-800">
            &ldquo;{quote}&rdquo;
          </p>

          {/* Autor */}
          <footer className="text-gradient-4colors font-semibold text-lg">
            — {author}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
