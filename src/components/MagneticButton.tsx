import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
  type?: 'button' | 'submit';
}

/**
 * MagneticButton
 * Bouton qui attire doucement le curseur (physique magnétique premium).
 * IMPORTANT : utilise useMotionValue / useSpring HORS du render cycle React,
 * conformément aux guidelines de performance (pas de setState au hover).
 */
export default function MagneticButton({
  children,
  onClick,
  className = '',
  strength = 22,
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const handleMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!rectRef.current) {
      const el = ref.current;
      if (!el) return;
      rectRef.current = el.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };

  const handleLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  const innerX = useTransform(springX, (val) => val * 0.45);
  const innerY = useTransform(springY, (val) => val * 0.45);

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span style={{ x: innerX, y: innerY }} className="magnetic-inner">
        {children}
      </motion.span>
    </motion.button>
  );
}
