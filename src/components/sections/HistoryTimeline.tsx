'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Card3D } from '@/components/immersive';
import { colorClasses, ColorVariant } from '@/types/ui';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  color: ColorVariant;
  icon?: React.ReactNode;
}

export interface HistoryTimelineProps {
  badge: string;
  title: string;
  items: TimelineItem[];
}

export default function HistoryTimeline({ badge, title, items }: HistoryTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Efecto de línea de progreso vertical al hacer scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="section bg-gris-50 dark:bg-gris-900/30 relative overflow-hidden">
      {/* Elementos decorativos artísticos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-azul-muted/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-naranja-muted/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16 md:mb-24">
          <span className="badge badge-terracota mb-4">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-negro dark:text-white max-w-2xl mx-auto">
            {title}
          </h2>
        </div>

        {/* Contenedor de la línea de tiempo */}
        <div className="relative max-w-5xl mx-auto">
          {/* Línea vertical de fondo (gris inactivo) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gris-200 dark:bg-gris-800 -translate-x-1/2" />

          {/* Línea vertical activa (progreso del scroll animado) */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-terracota via-naranja to-lima origin-top -translate-x-1/2"
            style={{ scaleY }}
          />

          {/* Hitos del timeline */}
          <div className="space-y-12 md:space-y-20">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              const colors = colorClasses[item.color];

              return (
                <div 
                  key={item.year} 
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Nodo central (Año en la línea vertical) */}
                  <div className="absolute left-8 md:left-1/2 top-6 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
                      className={`w-12 h-12 rounded-full border-4 border-white dark:border-gris-900 shadow-lg flex items-center justify-center font-bold text-sm ${colors.bgColor} ${colors.textDark}`}
                    >
                      {item.year.substring(2)}
                    </motion.div>
                  </div>

                  {/* Espacio vacío en desktop para alineación de cards alternados */}
                  <div className="hidden md:block w-1/2" />

                  {/* Tarjeta con el contenido */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <Card3D
                        className="bg-white dark:bg-gris-800 rounded-3xl p-6 md:p-8 shadow-md border border-gris-100 dark:border-gris-700/60 relative overflow-hidden"
                        tiltIntensity={8}
                        shineColor={
                          item.color === 'azul'
                            ? 'blue'
                            : item.color === 'lima'
                            ? 'lime'
                            : item.color === 'naranja'
                            ? 'orange'
                            : 'terracotta'
                        }
                      >
                        {/* Indicador de color lateral */}
                        <div className={`absolute top-0 left-0 w-2 h-full ${colors.bgColor}`} />

                        {/* Año destacado */}
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${colors.bgAlpha10} ${colors.textDark}`}>
                          {item.year}
                        </span>

                        {/* Título de hito */}
                        <h3 className="text-xl font-bold mb-3 text-negro dark:text-white flex items-center gap-3">
                          {item.icon && (
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bgAlpha10} ${colors.text}`}>
                              {item.icon}
                            </span>
                          )}
                          {item.title}
                        </h3>

                        {/* Descripción de hito */}
                        <p className="text-gris-600 dark:text-gris-300 text-sm md:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </Card3D>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
