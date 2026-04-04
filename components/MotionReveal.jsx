'use client';

import { motion } from 'framer-motion';

const variantsMap = {
  up: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 }
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 }
  }
};

export function MotionReveal({
  children,
  className,
  variant = 'up',
  delay = 0,
  duration = 0.6,
  amount = 0.22,
  once = true
}) {
  return (
    <motion.div
      className={className}
      variants={variantsMap[variant] || variantsMap.up}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({ children, className, stagger = 0.12, delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className, variant = 'up', duration = 0.55 }) {
  return (
    <motion.div
      className={className}
      variants={variantsMap[variant] || variantsMap.up}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
