import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * Stagger
 * Orchestre l'entrée séquentielle de ses enfants directs (qui doivent
 * eux-mêmes être des motion.* avec variants 'hidden'/'visible').
 */
export default function Stagger({
  children,
  className = '',
  stagger = 0.1,
  delay = 0,
  y = 24,
  once = true,
}: StaggerProps) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={`stagger ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px' }}
      data-stagger-item-variant={JSON.stringify(item)}
    >
      {children}
    </motion.div>
  );
}

// Exporte l'item variants pour usage direct dans les enfants motion.*
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};
