'use client';

import { useEffect, useRef } from 'react';
import { PARTICLE_COLORS } from '@/lib/design/colors';
import { PARTICLES } from '@/lib/animations';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  type: 'circle' | 'square' | 'line';
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  speed?: 'slow' | 'normal' | 'fast';
  maxSize?: number;
  className?: string;
}

/**
 * Sistema de partículas flotantes con canvas
 * Efecto artístico de elementos que flotan en el fondo
 */
export default function FloatingParticles({
  count = PARTICLES.count,
  colors = PARTICLE_COLORS as unknown as string[],
  speed = 'slow',
  maxSize = PARTICLES.maxSize,
  className = '',
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive canvas
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Inicializar partículas
    const initParticles = () => {
      particlesRef.current = [];
      const types: Particle['type'][] = ['circle', 'square', 'line'];

      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 2 + Math.random() * maxSize,
          speedX: (Math.random() - 0.5) * PARTICLES.speed[speed],
          speedY: -0.2 - Math.random() * PARTICLES.speed[speed],
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.3 + Math.random() * 0.5,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    initParticles();

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Mover partícula
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Rebote en bordes
        if (particle.y < -20) {
          particle.y = canvas.height + 20;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;

        // Dibujar partícula
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;

        ctx.beginPath();
        switch (particle.type) {
          case 'circle':
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'square':
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.y * 0.01);
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            ctx.restore();
            break;
          case 'line':
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.y * 0.02);
            ctx.fillRect(-1, -particle.size, 2, particle.size * 2);
            ctx.restore();
            break;
        }
      });

      // Reset globalAlpha para evitar afectar otros renders
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, colors, speed, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Versión CSS pura de partículas flotantes (más ligera)
 */
export function CSSParticles({
  count = 15,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  const colors = ['azul', 'lima', 'naranja', 'terracota'];

  return (
    <div className={`particles-container ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const color = colors[i % colors.length];
        const size = 4 + (i % 4) * 2;
        const left = `${5 + (i * 7) % 90}%`;
        const delay = `${(i % 8) * 2}s`;
        const type = i % 3 === 0 ? 'line' : i % 3 === 1 ? 'square' : '';

        return (
          <div
            key={i}
            className={`particle-artistic particle-artistic--${type || 'default'}`}
            style={{
              width: size,
              height: type === 'line' ? size * 3 : size,
              left,
              backgroundColor: `var(--${color}-bg)`,
              animationDelay: delay,
              animationDuration: `${12 + (i % 6) * 2}s`,
            }}
          />
        );
      })}
    </div>
  );
}
