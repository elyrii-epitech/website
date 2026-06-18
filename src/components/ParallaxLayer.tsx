import { type ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from 'framer-motion';

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /** Vitesse relative. Négatif = remonte plus vite, positif = descend. */
  speed?: number;
  style?: MotionStyle;
}

/**
 * ParallaxLayer
 * Déplace doucement son contenu en fonction du scroll de la page.
 * Utilisé pour donner de la profondeur (mascotte, décors, headings).
 */
export default function ParallaxLayer({
  children,
  className = '',
  speed = -60,
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = prefersReducedMotion ? 0 : parallaxY;

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
