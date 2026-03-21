'use client';

import React from 'react';
import Link from 'next/link';
import { COLOR_MAP } from '@/lib/design';
import type { ColorVariant } from '@/types/ui';

// ============================================================================
// TYPES
// ============================================================================
export interface HorizontalScrollItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: ColorVariant;
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
// HORIZONTAL SCROLL SECTION COMPONENT
// Simplificado: usa grid responsive en lugar de scroll horizontal con GSAP
// ============================================================================
export function HorizontalScrollSection({
  badge,
  title,
  items,
  linkText,
  linkHref,
}: HorizontalScrollSectionProps): React.JSX.Element {
  return (
    <section
      className="py-16 md:py-24 px-4 md:px-8 transition-colors duration-500"
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => {
          const colors = COLOR_MAP[item.color];
          return (
            <div
              key={item.id}
              className="rounded-2xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                borderTop: `4px solid ${colors.primary}`,
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.bg }}
              >
                <div className="w-8 h-8" style={{ color: colors.primary }}>
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
              <p className="text-stone-600 mb-4 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Details */}
              {item.details && item.details.length > 0 && (
                <ul className="space-y-2">
                  {item.details.slice(0, 3).map((detail, detailIndex) => (
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
        <div className="text-center mt-12">
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
