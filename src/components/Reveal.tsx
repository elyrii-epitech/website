import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

/**
 * Reveal
 * Wrapper qui révèle son contenu au scroll (whileInView).
 * Easing organique (cubic-bezier type "eau qui coule").
 * Utilise transform/opacity uniquement -> GPU friendly.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
  as = 'div',
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
    >
      {children}
    </MotionTag>
  );
}
