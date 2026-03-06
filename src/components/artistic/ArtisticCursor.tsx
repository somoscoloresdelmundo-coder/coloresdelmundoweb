'use client';

import { useEffect, useRef, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface ArtisticCursorProps {
  enabled?: boolean;
  trailEnabled?: boolean;
  trailLength?: number;
}

/**
 * Cursor artístico personalizado con efecto de estela
 * Se activa solo en dispositivos con mouse (no touch)
 */
export default function ArtisticCursor({
  enabled = true,
  trailEnabled = true,
  trailLength = 8,
}: ArtisticCursorProps) {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const trailRef = useRef<CursorPosition[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Detectar si es dispositivo táctil
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    checkTouchDevice();

    if (!enabled) return;

    const colors = [
      'rgba(75, 137, 191, 0.6)',   // azul
      'rgba(154, 173, 46, 0.5)',   // lima
      'rgba(242, 154, 46, 0.5)',   // naranja
      'rgba(217, 68, 35, 0.4)',    // terracota
    ];

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Actualizar trail
      if (trailEnabled) {
        trailRef.current.unshift({ x: e.clientX, y: e.clientY });
        if (trailRef.current.length > trailLength) {
          trailRef.current.pop();
        }
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detectar hover sobre elementos interactivos
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .hoverable');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);

    // Crear elementos del trail
    const createTrailElement = (index: number) => {
      const el = document.createElement('div');
      el.className = 'cursor-trail';
      el.style.cssText = `
        position: fixed;
        width: ${6 - index * 0.5}px;
        height: ${6 - index * 0.5}px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        background: ${colors[index % colors.length]};
        transform: translate(-50%, -50%);
        transition: opacity 0.1s ease;
      `;
      document.body.appendChild(el);
      return el;
    };

    const trailElements = trailEnabled
      ? Array.from({ length: trailLength }, (_, i) => createTrailElement(i))
      : [];

    // Animación del trail
    const animateTrail = () => {
      trailElements.forEach((el, i) => {
        const pos = trailRef.current[i];
        if (pos) {
          el.style.left = `${pos.x}px`;
          el.style.top = `${pos.y}px`;
          el.style.opacity = `${1 - i / trailLength}`;
        }
      });
      rafRef.current = requestAnimationFrame(animateTrail);
    };

    if (trailEnabled) {
      rafRef.current = requestAnimationFrame(animateTrail);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
      trailElements.forEach(el => el.remove());
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, trailEnabled, trailLength]);

  // No renderizar en dispositivos táctiles
  if (!enabled || isTouchDevice) return null;

  return (
    <>
      {/* Punto central */}
      <div
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Anillo exterior */}
      <div
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible ? 0.5 : 0,
        }}
      />
    </>
  );
}
