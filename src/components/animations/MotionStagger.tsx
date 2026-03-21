'use client';

import { ReactNode, Children, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { STAGGER, DISTANCES, SCALES, SPRING_CONFIGS, THRESHOLDS } from '@/lib/animations';

interface MotionStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.slow,
    },
  },
};

const itemAnimations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: DISTANCES.normal },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        ...SPRING_CONFIGS.soft,
      },
    },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -DISTANCES.normal },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        ...SPRING_CONFIGS.soft,
      },
    },
  },
  fadeRight: {
    hidden: { opacity: 0, x: DISTANCES.normal },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        ...SPRING_CONFIGS.soft,
      },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: SCALES.small },
    visible: {
      opacity: 1,
      scale: SCALES.normal,
      transition: {
        type: 'spring',
        ...SPRING_CONFIGS.soft,
      },
    },
  },
};

export default function MotionStagger({
  children,
  className = '',
  staggerDelay = STAGGER.slow,
  once = true,
  animation = 'fadeUp',
}: MotionStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: THRESHOLDS.medium });

  const customContainerVariants: Variants = {
    ...containerVariants,
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={customContainerVariants}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div variants={itemAnimations[animation]}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
