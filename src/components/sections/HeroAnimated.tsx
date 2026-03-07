'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/animations';

interface HeroAnimatedProps {
  badge?: ReactNode;
  title: ReactNode;
  description: string;
  primaryCTA?: ReactNode;
  secondaryCTA?: ReactNode;
  visual?: ReactNode;
  sloganItems?: Array<{ text: string; className?: string }>;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 20,
    },
  },
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 60,
      damping: 20,
      delay: 0.4,
    },
  },
};

export default function HeroAnimated({
  badge,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  visual,
  sloganItems,
}: HeroAnimatedProps) {
  return (
    <section className="relative bg-gradient-to-b from-white via-gris-50 to-gris-50 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="container py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {badge && (
              <motion.div variants={itemVariants}>
                {badge}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              {title}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gris-500 mb-8 max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {primaryCTA && (
                <MagneticButton strength={0.2}>
                  {primaryCTA}
                </MagneticButton>
              )}
              {secondaryCTA}
            </motion.div>
          </motion.div>

          {visual && (
            <motion.div
              variants={visualVariants}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>

      {/* Slogan animated */}
      {sloganItems && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="py-6 mt-auto"
        >
          <div className="divider-4colors max-w-xs mx-auto mb-6 opacity-60" />
          <div className="flex items-center justify-center gap-6 md:gap-10 text-sm md:text-base font-semibold tracking-widest uppercase">
            {sloganItems.map((item, i) => (
              <span key={i}>
                {i > 0 && <span className="w-2 h-2 rounded-full bg-gris-200 inline-block mr-6 md:mr-10" />}
                <span className={item.className}>{item.text}</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
