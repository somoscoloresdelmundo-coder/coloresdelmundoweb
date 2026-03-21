'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView, Variant } from 'framer-motion';
import { DURATIONS, DISTANCES, SCALES, BLUR, THRESHOLDS } from '@/lib/animations';

type RevealAnimation = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur';

interface MotionRevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const variants: Record<RevealAnimation, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: DISTANCES.lg },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -DISTANCES.lg },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -DISTANCES.lg },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: DISTANCES.lg },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: SCALES.medium },
    visible: { opacity: 1, scale: SCALES.normal },
  },
  blur: {
    hidden: { opacity: 0, filter: `blur(${BLUR.medium}px)` },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

export default function MotionReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = DURATIONS.slower,
  className = '',
  once = true,
  threshold = THRESHOLDS.medium,
}: MotionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[animation]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
