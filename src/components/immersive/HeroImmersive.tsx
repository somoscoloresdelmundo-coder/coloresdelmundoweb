'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Pathnames } from '@/i18n/routing';
import Button, { ArrowIcon } from '@/components/ui/Button';
import {
  gsap,
  ScrollTrigger,
  createGSAPContext,
  easings,
} from '@/lib/animations';
import { useReducedMotion } from '@/hooks';

// ============================================================================
// TYPES
// ============================================================================
export interface HeroImmersiveProps {
  badge: string;
  titleParts: {
    before: string;
    art: string;
    middle: string;
    education: string;
  };
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  slogan: { inclusion: string; diversity: string; creation: string };
  logoSrc: string;
}

// ============================================================================
// COLORS
// ============================================================================
const COLORS = {
  azul: '#3B82F6',
  lima: '#84CC16',
  naranja: '#F97316',
  terracota: '#C2410C',
} as const;

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

// Animated letter component for title reveal
function AnimatedLetter({
  char,
  index,
  className = ''
}: {
  char: string;
  index: number;
  className?: string;
}) {
  return (
    <span
      className={`letter-reveal inline-block ${className}`}
      style={{
        display: char === ' ' ? 'inline' : 'inline-block',
        minWidth: char === ' ' ? '0.3em' : undefined,
      }}
      data-index={index}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  );
}

// Split text into animated letters
function SplitText({
  text,
  className = '',
  startIndex = 0,
}: {
  text: string;
  className?: string;
  startIndex?: number;
}) {
  return (
    <>
      {text.split('').map((char, i) => (
        <AnimatedLetter
          key={`${startIndex + i}-${char}`}
          char={char}
          index={startIndex + i}
          className={className}
        />
      ))}
    </>
  );
}

// Animated underline for special words
function AnimatedUnderline({ color }: { color: string }) {
  return (
    <span
      className="underline-reveal absolute bottom-0 left-0 right-0 h-[3px] md:h-[4px] origin-left scale-x-0"
      style={{ backgroundColor: color }}
    />
  );
}

// Blob/particle effect around logo
function LogoBlob({ scrollProgress }: { scrollProgress: number }) {
  const blobRef = useRef<SVGSVGElement>(null);

  return (
    <svg
      ref={blobRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 400"
      style={{
        transform: `scale(${1 + scrollProgress * 0.1})`,
        opacity: 1 - scrollProgress * 0.5,
      }}
    >
      <defs>
        <filter id="blob-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
          />
        </filter>
        <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={COLORS.azul} stopOpacity="0.6" />
          <stop offset="33%" stopColor={COLORS.lima} stopOpacity="0.5" />
          <stop offset="66%" stopColor={COLORS.naranja} stopOpacity="0.5" />
          <stop offset="100%" stopColor={COLORS.terracota} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g filter="url(#blob-filter)">
        {/* Animated blobs */}
        <circle
          className="blob-circle blob-1"
          cx="120" cy="120" r="60"
          fill={COLORS.azul}
          opacity="0.4"
        />
        <circle
          className="blob-circle blob-2"
          cx="280" cy="120" r="50"
          fill={COLORS.lima}
          opacity="0.4"
        />
        <circle
          className="blob-circle blob-3"
          cx="280" cy="280" r="55"
          fill={COLORS.naranja}
          opacity="0.4"
        />
        <circle
          className="blob-circle blob-4"
          cx="120" cy="280" r="45"
          fill={COLORS.terracota}
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

// Floating background shapes that follow cursor
function BackgroundShapes({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const shapes = useMemo(() => [
    { id: 1, color: COLORS.azul, size: 300, x: 10, y: 20, speed: 0.02 },
    { id: 2, color: COLORS.lima, size: 250, x: 80, y: 60, speed: 0.015 },
    { id: 3, color: COLORS.naranja, size: 350, x: 60, y: 10, speed: 0.025 },
    { id: 4, color: COLORS.terracota, size: 200, x: 20, y: 70, speed: 0.018 },
    { id: 5, color: COLORS.azul, size: 180, x: 90, y: 30, speed: 0.022 },
    { id: 6, color: COLORS.lima, size: 280, x: 40, y: 80, speed: 0.012 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => {
        const offsetX = (mousePosition.x - 0.5) * shape.speed * 100;
        const offsetY = (mousePosition.y - 0.5) * shape.speed * 100;

        return (
          <div
            key={shape.id}
            className="absolute rounded-full blur-3xl transition-transform duration-1000 ease-out bg-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              backgroundColor: shape.color,
              opacity: 0.15,
              transform: `translate(${offsetX}px, ${offsetY}px) translate(-50%, -50%)`,
            }}
          />
        );
      })}
    </div>
  );
}

// Animated slogan icons
function SloganIcon({ type }: { type: 'inclusion' | 'diversity' | 'creation' }) {
  const icons = {
    inclusion: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    diversity: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    creation: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  };

  return (
    <span className="slogan-icon inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm">
      {icons[type]}
    </span>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function HeroImmersive({
  badge,
  titleParts,
  description,
  primaryButton,
  secondaryButton,
  slogan,
  logoSrc,
}: HeroImmersiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();

  // Calculate letter indices for proper staggering
  const letterIndices = useMemo(() => {
    let currentIndex = 0;
    const indices = {
      before: { start: currentIndex, end: currentIndex + titleParts.before.length },
      art: { start: 0, end: 0 },
      middle: { start: 0, end: 0 },
      education: { start: 0, end: 0 },
    };
    currentIndex = indices.before.end;
    indices.art = { start: currentIndex, end: currentIndex + titleParts.art.length };
    currentIndex = indices.art.end;
    indices.middle = { start: currentIndex, end: currentIndex + titleParts.middle.length };
    currentIndex = indices.middle.end;
    indices.education = { start: currentIndex, end: currentIndex + titleParts.education.length };
    return indices;
  }, [titleParts]);

  // Handle mouse movement for cursor-following effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reducedMotion || isMobile) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePosition({ x, y });
  }, [reducedMotion, isMobile]);

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse move listener
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, reducedMotion, isMobile]);

  // Main GSAP animations
  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const ctx = createGSAPContext(containerRef.current);

    ctx.add(() => {
      // Get all elements
      const letters = containerRef.current!.querySelectorAll('.letter-reveal');
      const underlines = containerRef.current!.querySelectorAll('.underline-reveal');
      const blobCircles = containerRef.current!.querySelectorAll('.blob-circle');
      const sloganIcons = containerRef.current!.querySelectorAll('.slogan-icon');
      const bgShapes = containerRef.current!.querySelectorAll('.bg-shape');

      // Initial states
      gsap.set(badgeRef.current, { opacity: 0, y: 30, scale: 0.9 });
      gsap.set(letters, { opacity: 0, y: 50, rotateX: -90 });
      gsap.set(underlines, { scaleX: 0 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonsRef.current, { opacity: 0, y: 30 });
      gsap.set(logoContainerRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(sloganRef.current, { opacity: 0, y: 20 });
      gsap.set(sloganIcons, { scale: 0, rotation: -180 });
      gsap.set(bgShapes, { scale: 0.5, opacity: 0 });

      // Main timeline
      const tl = gsap.timeline({
        defaults: { ease: easings.smooth },
        delay: 0.3,
      });

      // Background shapes fade in
      tl.to(bgShapes, {
        scale: 1,
        opacity: 0.15,
        duration: 1.5,
        stagger: 0.1,
        ease: easings.expo,
      }, 0);

      // Badge animation
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: easings.back,
      }, 0.2);

      // Logo animation
      tl.to(logoContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: easings.back,
      }, 0.4);

      // Blob circles animation
      tl.fromTo(blobCircles,
        { scale: 0 },
        {
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: easings.elastic,
        }, 0.6);

      // Title letters animation - letter by letter reveal
      tl.to(letters, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: {
          each: 0.03,
          from: 'start',
        },
        ease: easings.back,
      }, 0.8);

      // Underline animations for "art" and "education"
      tl.to(underlines, {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: easings.expo,
      }, '-=0.3');

      // Description fade in
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.4');

      // Buttons animation
      tl.to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5');

      // Slogan animation
      tl.to(sloganRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.4');

      // Slogan icons pop in
      tl.to(sloganIcons, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: easings.back,
      }, '-=0.3');

      // Continuous animations for blobs
      if (!isMobile) {
        blobCircles.forEach((circle, i) => {
          gsap.to(circle, {
            x: `random(-20, 20)`,
            y: `random(-20, 20)`,
            duration: 4 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      // Badge pulse animation
      gsap.to(badgeRef.current, {
        scale: 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });

      // Scroll-based parallax and fade out
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Parallax effects on scroll
      if (!isMobile) {
        // Content parallax (moves up faster)
        gsap.to(contentRef.current, {
          y: () => window.innerHeight * 0.3,
          opacity: 0,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'center top',
            scrub: 1,
          },
        });

        // Logo parallax (different speed)
        gsap.to(logoContainerRef.current, {
          y: () => window.innerHeight * 0.15,
          scale: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'center top',
            scrub: 1.5,
          },
        });

        // Background shapes parallax
        bgShapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: () => window.innerHeight * (0.1 + i * 0.05),
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 2 + i * 0.3,
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion, isMobile, letterIndices]);

  // Magnetic button effect
  const handleButtonMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isMobile) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [reducedMotion, isMobile]);

  const handleButtonMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isMobile) return;

    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, [reducedMotion, isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, ${COLORS.azul}20 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 20%, ${COLORS.lima}15 0%, transparent 50%),
          radial-gradient(ellipse 70% 60% at 70% 80%, ${COLORS.naranja}18 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 30% 90%, ${COLORS.terracota}20 0%, transparent 50%),
          linear-gradient(180deg, #fafafa 0%, #f5f5f5 50%, #ffffff 100%)
        `,
      }}
    >
      {/* Animated background shapes */}
      <BackgroundShapes mousePosition={mousePosition} />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.8) 100%)`,
          opacity: scrollProgress * 0.5,
        }}
      />

      {/* Main content container */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-6 md:mb-8"
        >
          <span
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border"
            style={{
              background: `linear-gradient(135deg, ${COLORS.naranja}15, ${COLORS.terracota}10)`,
              borderColor: `${COLORS.naranja}30`,
              color: COLORS.terracota,
            }}
          >
            <span
              className="w-2 h-2 rounded-full mr-2 animate-pulse"
              style={{ backgroundColor: COLORS.naranja }}
            />
            {badge}
          </span>
        </div>

        {/* Logo with blob effect */}
        <div
          ref={logoContainerRef}
          className="relative w-32 h-32 md:w-40 md:h-40 mb-8 md:mb-10"
        >
          <LogoBlob scrollProgress={scrollProgress} />
          <div className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-2xl">
            <Image
              src={logoSrc}
              alt="Colores del Mundo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Title with letter-by-letter animation */}
        <h1
          ref={titleRef}
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gris-900 mb-6 md:mb-8 leading-tight max-w-5xl"
          style={{ perspective: '1000px' }}
        >
          <SplitText
            text={titleParts.before}
            startIndex={letterIndices.before.start}
          />
          <span className="relative inline-block" style={{ color: COLORS.naranja }}>
            <SplitText
              text={titleParts.art}
              startIndex={letterIndices.art.start}
            />
            <AnimatedUnderline color={COLORS.naranja} />
          </span>
          <SplitText
            text={titleParts.middle}
            startIndex={letterIndices.middle.start}
          />
          <span className="relative inline-block" style={{ color: COLORS.azul }}>
            <SplitText
              text={titleParts.education}
              startIndex={letterIndices.education.start}
            />
            <AnimatedUnderline color={COLORS.azul} />
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-center text-lg md:text-xl text-gris-600 max-w-2xl mb-8 md:mb-10 leading-relaxed px-4"
        >
          {description}
        </p>

        {/* Buttons with magnetic effect */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <div
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="will-change-transform"
          >
            <Button
              href={primaryButton.href as Pathnames}
              variant="primary"
              icon={<ArrowIcon />}
            >
              {primaryButton.text}
            </Button>
          </div>
          <div
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="will-change-transform"
          >
            <Button
              href={secondaryButton.href as Pathnames}
              variant="outline"
            >
              {secondaryButton.text}
            </Button>
          </div>
        </div>

        {/* Slogan with animated icons */}
        <div
          ref={sloganRef}
          className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 px-4 text-gris-500 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <SloganIcon type="inclusion" />
              <span>{slogan.inclusion}</span>
            </div>
            <span className="hidden sm:block text-gris-300">|</span>
            <div className="flex items-center gap-2">
              <SloganIcon type="diversity" />
              <span>{slogan.diversity}</span>
            </div>
            <span className="hidden sm:block text-gris-300">|</span>
            <div className="flex items-center gap-2">
              <SloganIcon type="creation" />
              <span>{slogan.creation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gris-400 transition-opacity duration-500"
        style={{ opacity: 1 - scrollProgress * 3 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-gris-300 rounded-full flex justify-center p-1">
          <div
            className="w-1.5 h-1.5 bg-gris-400 rounded-full animate-bounce"
            style={{ animationDuration: '1.5s' }}
          />
        </div>
      </div>
    </section>
  );
}
