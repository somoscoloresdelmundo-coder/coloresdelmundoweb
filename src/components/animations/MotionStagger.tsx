'use client';

import { ReactNode, Children, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

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
      staggerChildren: 0.1,
    },
  },
};

const itemAnimations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  },
};

export default function MotionStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
  animation = 'fadeUp',
}: MotionStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

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
