'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ALL_COLORS, SUBTLE_BACKGROUND_COLORS } from '@/lib/design';
import type { ColorVariant } from '@/types/ui';

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  color: ColorVariant;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Initialize floating shapes - usando los 4 colores institucionales
  useEffect(() => {
    const initialShapes: FloatingShape[] = [];

    for (let i = 0; i < 4; i++) {
      initialShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 200 + Math.random() * 150,
        color: ALL_COLORS[i % 4],
        speedX: (Math.random() - 0.5) * 0.01,
        speedY: (Math.random() - 0.5) * 0.01,
        opacity: 0.15 + Math.random() * 0.1,
      });
    }

    setShapes(initialShapes);
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });

    // Calculate mouse speed for particle generation
    const dx = x - lastMouseRef.current.x;
    const dy = y - lastMouseRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Generate particles on fast movement - más sutiles
    if (speed > 8 && particles.length < 15) {
      const colors = ['rgba(200, 200, 200, 0.4)', 'rgba(220, 220, 220, 0.3)', 'rgba(210, 210, 210, 0.35)'];
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: 3 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: 0.8,
      };
      setParticles(prev => [...prev, newParticle]);
    }

    lastMouseRef.current = { x, y };
  }, [particles.length]);

  // Animate shapes following mouse
  useEffect(() => {
    const animate = () => {
      setShapes(prevShapes =>
        prevShapes.map(shape => {
          // Subtle attraction to mouse
          const containerWidth = containerRef.current?.clientWidth || 1;
          const containerHeight = containerRef.current?.clientHeight || 1;

          const mouseXPercent = (mousePosition.x / containerWidth) * 100;
          const mouseYPercent = (mousePosition.y / containerHeight) * 100;

          const attractionX = (mouseXPercent - shape.x) * 0.0003;
          const attractionY = (mouseYPercent - shape.y) * 0.0003;

          let newX = shape.x + shape.speedX + (isHovering ? attractionX : 0);
          let newY = shape.y + shape.speedY + (isHovering ? attractionY : 0);

          // Bounce off edges
          if (newX < -10 || newX > 110) shape.speedX *= -1;
          if (newY < -10 || newY > 110) shape.speedY *= -1;

          newX = Math.max(-10, Math.min(110, newX));
          newY = Math.max(-10, Math.min(110, newY));

          return { ...shape, x: newX, y: newY };
        })
      );

      // Animate particles
      setParticles(prevParticles =>
        prevParticles
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
            vy: p.vy + 0.02, // gravity
          }))
          .filter(p => p.life > 0)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, isHovering]);

  // Event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMouseMove]);


  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      {/* Floating Shapes */}
      {shapes.map(shape => (
        <div
          key={shape.id}
          className="absolute rounded-full blur-3xl transition-transform duration-1000"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            backgroundColor: SUBTLE_BACKGROUND_COLORS[shape.color],
            opacity: shape.opacity,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}

      {/* Mouse Glow Effect - Muy sutil */}
      {isHovering && (
        <div
          className="pointer-events-none transition-opacity duration-500"
          style={{
            position: 'absolute',
            left: mousePosition.x,
            top: mousePosition.y,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle at center,
              rgba(200, 200, 200, 0.08) 0%,
              transparent 60%)`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-30" />
    </div>
  );
}
