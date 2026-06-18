import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress
 * Barre de progression cinématographique fixe en haut.
 * Douce, lavande -> menthe, jamais agressive.
 * Respecte prefers-reduced-motion via le mode "transform" uniquement.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
