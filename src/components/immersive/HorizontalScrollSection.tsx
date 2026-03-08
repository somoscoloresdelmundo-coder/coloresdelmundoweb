'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  createGSAPContext,
} from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useGSAP';

// ============================================================================
// TYPES
// ============================================================================
export interface HorizontalScrollItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'azul' | 'lima' | 'naranja' | 'terracota';
  details?: string[];
}

export interface HorizontalScrollSectionProps {
  badge?: string;
  title?: string;
  items: HorizontalScrollItem[];
  linkText?: string;
  linkHref?: string;
}

// ============================================================================
// COLOR MAPPING
// ============================================================================
const COLOR_MAP = {
  azul: {
    primary: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.08)',
    bgSolid: '#EFF6FF',
    border: 'rgba(59, 130, 246, 0.2)',
    text: '#1E40AF',
    accent: '#3B82F6',
  },
  lima: {
    primary: '#84CC16',
    bg: 'rgba(132, 204, 22, 0.08)',
    bgSolid: '#F7FEE7',
    border: 'rgba(132, 204, 22, 0.2)',
    text: '#3F6212',
    accent: '#84CC16',
  },
  naranja: {
    primary: '#F97316',
    bg: 'rgba(249, 115, 22, 0.08)',
    bgSolid: '#FFF7ED',
    border: 'rgba(249, 115, 22, 0.2)',
    text: '#9A3412',
    accent: '#F97316',
  },
  terracota: {
    primary: '#C2410C',
    bg: 'rgba(194, 65, 12, 0.08)',
    bgSolid: '#FEF2F2',
    border: 'rgba(194, 65, 12, 0.2)',
    text: '#7C2D12',
    accent: '#C2410C',
  },
} as const;

// ============================================================================
// HORIZONTAL SCROLL SECTION COMPONENT
// ============================================================================
export function HorizontalScrollSection({
  badge,
  title,
  items,
  linkText,
  linkHref,
}: HorizontalScrollSectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  // Start with mobile=true for SSR to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const reducedMotion = useReducedMotion();

  // Hydration-safe mobile detection
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update background color based on current card
  const updateBackgroundColor = useCallback((progress: number) => {
    if (!sectionRef.current || items.length === 0) return;

    const itemProgress = progress * (items.length - 1);
    const currentIdx = Math.floor(itemProgress);
    const nextIdx = Math.min(currentIdx + 1, items.length - 1);
    const blend = itemProgress - currentIdx;

    const currentColor = COLOR_MAP[items[currentIdx].color].bg;
    const nextColor = COLOR_MAP[items[nextIdx].color].bg;

    // Parse rgba and blend
    const parseRgba = (rgba: string) => {
      const match = rgba.match(/[\d.]+/g);
      return match ? match.map(Number) : [0, 0, 0, 0];
    };

    const [r1, g1, b1, a1] = parseRgba(currentColor);
    const [r2, g2, b2, a2] = parseRgba(nextColor);

    const r = Math.round(r1 + (r2 - r1) * blend);
    const g = Math.round(g1 + (g2 - g1) * blend);
    const b = Math.round(b1 + (b2 - b1) * blend);
    const a = a1 + (a2 - a1) * blend;

    sectionRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    setCurrentIndex(Math.round(progress * (items.length - 1)));
  }, [items]);

  // Setup horizontal scroll animation
  useEffect(() => {
    if (
      !sectionRef.current ||
      !containerRef.current ||
      !trackRef.current ||
      isMobile ||
      reducedMotion ||
      prefersReducedMotion()
    ) {
      return;
    }

    const ctx = createGSAPContext(sectionRef.current);

    ctx.add(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[];
      const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];

      if (cards.length === 0) return;

      // Calculate total scroll distance
      const totalWidth = trackRef.current!.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      // Main horizontal scroll animation
      const horizontalTween = gsap.to(trackRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress bar
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            // Update background color
            updateBackgroundColor(self.progress);
          },
        },
      });

      // Parallax effect for icons (faster)
      icons.forEach((icon, index) => {
        if (!icon) return;
        gsap.fromTo(
          icon,
          { x: 50 },
          {
            x: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[index],
              containerAnimation: horizontalTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      // Parallax effect for text (slower)
      texts.forEach((text, index) => {
        if (!text) return;
        gsap.fromTo(
          text,
          { x: 20 },
          {
            x: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[index],
              containerAnimation: horizontalTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      // Card entrance animations
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0.3,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: 'left 80%',
              end: 'left 30%',
              scrub: true,
            },
          }
        );

        // Exit animation
        gsap.to(card, {
          opacity: 0.3,
          scale: 0.9,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: 'right 70%',
            end: 'right 20%',
            scrub: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [isMobile, reducedMotion, items.length, updateBackgroundColor]);

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile vertical layout
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="py-16 px-4 transition-colors duration-500"
        style={{ backgroundColor: COLOR_MAP[items[0]?.color || 'azul'].bg }}
      >
        {/* Header */}
        {(badge || title) && (
          <div className="max-w-7xl mx-auto mb-12 text-center">
            {badge && (
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-white/80 text-stone-700 mb-4">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Mobile Cards */}
        <div className="max-w-lg mx-auto space-y-6">
          {items.map((item, index) => {
            const colors = COLOR_MAP[item.color];
            return (
              <div
                key={item.id}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{
                  backgroundColor: colors.bgSolid,
                  borderLeft: `4px solid ${colors.primary}`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: colors.bg }}
                >
                  <div style={{ color: colors.primary }}>
                    {item.icon}
                  </div>
                </div>

                {/* Number */}
                <div
                  className="text-sm font-bold mb-2"
                  style={{ color: colors.accent }}
                >
                  {String(index + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: colors.text }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-stone-600 mb-4">
                  {item.description}
                </p>

                {/* Details */}
                {item.details && item.details.length > 0 && (
                  <ul className="space-y-2">
                    {item.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start gap-2 text-sm text-stone-500"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: colors.primary }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Link */}
        {linkText && linkHref && (
          <div className="text-center mt-10">
            <Link
              href={linkHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
            >
              {linkText}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </section>
    );
  }

  // Desktop horizontal scroll layout
  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: COLOR_MAP[items[0]?.color || 'azul'].bg,
        willChange: 'background-color',
      }}
    >
      {/* Header - Fixed position */}
      {(badge || title) && (
        <div className="absolute top-8 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between">
              <div>
                {badge && (
                  <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-white/80 text-stone-700 backdrop-blur-sm mb-2">
                    {badge}
                  </span>
                )}
                {title && (
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
                    {title}
                  </h2>
                )}
              </div>

              {/* Slide indicator */}
              <div className="flex items-center gap-4">
                <span
                  className="text-4xl font-bold tabular-nums"
                  style={{ color: COLOR_MAP[items[currentIndex]?.color || 'azul'].primary }}
                >
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-stone-400 text-xl">/</span>
                <span className="text-stone-400 text-xl">
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="h-full flex items-center"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-8 pl-8 pr-8"
          style={{ willChange: 'transform' }}
        >
          {/* Spacer for header */}
          <div className="w-[5vw] flex-shrink-0" />

          {items.map((item, index) => {
            const colors = COLOR_MAP[item.color];
            return (
              <div
                key={item.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="relative flex-shrink-0 w-[85vw] max-w-[1200px] h-[70vh] rounded-3xl overflow-hidden"
                style={{
                  backgroundColor: 'white',
                  boxShadow: `0 25px 50px -12px ${colors.primary}20`,
                  willChange: 'transform, opacity',
                }}
              >
                {/* Color accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: colors.primary }}
                />

                {/* Card content */}
                <div className="h-full flex flex-col md:flex-row">
                  {/* Left side - Icon and number */}
                  <div
                    className="w-full md:w-2/5 h-full flex flex-col items-center justify-center p-12"
                    style={{ backgroundColor: colors.bg }}
                  >
                    {/* Large icon with parallax */}
                    <div
                      ref={(el) => { iconRefs.current[index] = el; }}
                      className="w-32 h-32 md:w-48 md:h-48 rounded-3xl flex items-center justify-center mb-8"
                      style={{
                        backgroundColor: 'white',
                        boxShadow: `0 20px 40px -10px ${colors.primary}30`,
                        willChange: 'transform',
                      }}
                    >
                      <div
                        className="w-16 h-16 md:w-24 md:h-24"
                        style={{ color: colors.primary }}
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* Number indicator */}
                    <div
                      className="text-6xl md:text-8xl font-black opacity-20"
                      style={{ color: colors.primary }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div
                    ref={(el) => { textRefs.current[index] = el; }}
                    className="w-full md:w-3/5 h-full flex flex-col justify-center p-12"
                    style={{ willChange: 'transform' }}
                  >
                    {/* Title */}
                    <h3
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                      style={{ color: colors.text }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-stone-600 mb-8 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Details list */}
                    {item.details && item.details.length > 0 && (
                      <ul className="space-y-4">
                        {item.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-3 text-stone-500"
                          >
                            <span
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: colors.primary }}
                            />
                            <span className="text-base md:text-lg">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Color indicator dots */}
                    <div className="flex items-center gap-2 mt-auto pt-8">
                      {items.map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className="w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: dotIndex === index
                              ? colors.primary
                              : `${colors.primary}30`,
                            transform: dotIndex === index ? 'scale(1.5)' : 'scale(1)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Spacer for end */}
          <div className="w-[5vw] flex-shrink-0" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-200/50">
        <div
          ref={progressRef}
          className="h-full origin-left transition-colors duration-300"
          style={{
            backgroundColor: COLOR_MAP[items[currentIndex]?.color || 'azul'].primary,
            transform: 'scaleX(0)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Link button */}
      {linkText && linkHref && (
        <div className="absolute bottom-8 right-8 z-20">
          <Link
            href={linkHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
          >
            {linkText}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}

export default HorizontalScrollSection;
