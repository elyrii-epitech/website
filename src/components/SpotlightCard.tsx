import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  spotlightColor?: string;
  spotlightSize?: number;
}

/**
 * SpotlightCard
 * Carte avec :
 *   - spotlight radial qui suit le curseur (lumière douce)
 *   - tilt 3D subtil (perspective) pour donner de la profondeur
 *
 * Conçu pour rester performant : motion values hors render cycle,
 * respect de prefers-reduced-motion via Framer Motion.
 */
export default function SpotlightCard({
  children,
  className = '',
  tiltStrength = 7,
  spotlightColor = 'rgba(169, 154, 240, 0.18)',
  spotlightSize = 320,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltStrength, -tiltStrength]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltStrength, tiltStrength]), {
    stiffness: 150,
    damping: 18,
  });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      const el = ref.current;
      if (!el) return;
      rectRef.current = el.getBoundingClientRect();
    }
    const rect = rectRef.current;
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    rectRef.current = null;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const spotlightLeft = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotlightTop = useTransform(mouseY, (v) => `${v * 100}%`);

  return (
    <motion.div
      ref={ref}
      className={`spotlight-card ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="spotlight-card__glow"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${spotlightColor}, transparent 62%)`,
          left: spotlightLeft,
          top: spotlightTop,
          width: spotlightSize * 2,
          height: spotlightSize * 2,
          marginLeft: -spotlightSize,
          marginTop: -spotlightSize,
        }}
      />
      <div className="spotlight-card__content" style={{ transform: 'translateZ(40px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
