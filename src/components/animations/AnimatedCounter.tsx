'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform, MotionValue } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

function CounterDisplay({ motionValue, className }: { motionValue: MotionValue<number>; className?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (v) => {
      setDisplayValue(Math.round(v));
    });
    return unsubscribe;
  }, [motionValue]);

  return <span className={className}>{displayValue}</span>;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000,
  });

  const rounded = useTransform(springValue, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <CounterDisplay motionValue={rounded} />
      {suffix}
    </motion.span>
  );
}
