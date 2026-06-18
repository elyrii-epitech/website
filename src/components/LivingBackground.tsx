import { useEffect, useRef, type CSSProperties } from 'react';

/**
 * LivingBackground
 *
 * Calqué sur la direction artistique d'Elyrii (palette Flutter) :
 *   - lavande apaisée #7E6AD8 / #A99AF0
 *   - menthe douce #A8D5BA / #C2E3D2
 *   - pêche chaleureux #FFB5A8 / #FFCCBF
 *   - fond chocolat #1A1818
 *
 * On remplace le grain statique + lignes froides par :
 *   - un fond doux en mesh-gradient chaud
 *   - des blobs organiques qui respirent lentement (cohérence cardiaque ~10s)
 *   - un halo qui suit doucement le curseur (immersion, jamais nerveux)
 *   - un voile de grain très léger uniquement sur le layer fixe
 *
 * Performance : on n'anime QUE transform/opacity, le tout isolé
 * dans un composant client léger, respect de prefers-reduced-motion.
 */
const BLOBS = [
  {
    color: 'rgba(126, 106, 216, 0.42)',
    glow: 'rgba(169, 154, 240, 0.55)',
    size: 620,
    top: '-12%',
    left: '-8%',
    duration: 22,
    delay: 0,
  },
  {
    color: 'rgba(168, 213, 186, 0.38)',
    glow: 'rgba(194, 227, 210, 0.5)',
    size: 540,
    top: '38%',
    left: '62%',
    duration: 28,
    delay: -6,
  },
  {
    color: 'rgba(255, 181, 168, 0.32)',
    glow: 'rgba(255, 204, 191, 0.45)',
    size: 480,
    top: '68%',
    left: '8%',
    duration: 26,
    delay: -12,
  },
  {
    color: 'rgba(123, 195, 147, 0.28)',
    glow: 'rgba(203, 237, 216, 0.4)',
    size: 380,
    top: '6%',
    left: '78%',
    duration: 24,
    delay: -3,
  },
];

const HALO_SIZE = 600;
const HALO_EASE = 0.05;
const HALO_IDLE_TIMEOUT_MS = 1400;
const PREFERS_FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const PREFERS_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export default function LivingBackground() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    const prefersReduced = window.matchMedia(PREFERS_REDUCED_MOTION_QUERY).matches;
    const supportsFinePointer = window.matchMedia(PREFERS_FINE_POINTER_QUERY).matches;
    if (prefersReduced || !supportsFinePointer || !halo) return undefined;

    let frame: number | undefined;
    let idleTimeout: number | undefined;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.4;
    let currentX = targetX;
    let currentY = targetY;
    let hasPointerPosition = false;

    const updateHaloTransform = () => {
      halo.style.transform = `translate3d(${currentX - HALO_SIZE / 2}px, ${currentY - HALO_SIZE / 2}px, 0)`;
    };

    const cancelHaloFrame = () => {
      if (frame === undefined) return;
      window.cancelAnimationFrame(frame);
      frame = undefined;
    };

    const tick = () => {
      // Easing très doux -> suit le curseur comme un halo liquide
      currentX += (targetX - currentX) * HALO_EASE;
      currentY += (targetY - currentY) * HALO_EASE;
      updateHaloTransform();
      frame = window.requestAnimationFrame(tick);
    };

    const ensureHaloFrame = () => {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(tick);
    };

    const scheduleHaloIdleStop = () => {
      if (idleTimeout !== undefined) {
        window.clearTimeout(idleTimeout);
      }
      idleTimeout = window.setTimeout(() => {
        idleTimeout = undefined;
        cancelHaloFrame();
      }, HALO_IDLE_TIMEOUT_MS);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasPointerPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPointerPosition = true;
        updateHaloTransform();
      }
      ensureHaloFrame();
      scheduleHaloIdleStop();
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelHaloFrame();
      if (idleTimeout !== undefined) {
        window.clearTimeout(idleTimeout);
      }
    };
  }, []);

  return (
    <div className="living-bg" aria-hidden="true">
      {/* Mesh-gradient chaud de base */}
      <div className="living-bg__mesh" />

      {/* Halo qui suit le curseur (desktop) */}
      <div className="living-bg__halo" ref={haloRef} />

      {/* Blobs organiques respirants */}
      <div className="living-bg__blobs">
        {BLOBS.map((blob, index) => (
          <span
            key={index}
            className="living-bg__blob"
            style={
              {
                '--blob-size': `${blob.size}px`,
                '--blob-top': blob.top,
                '--blob-left': blob.left,
                '--blob-color': blob.color,
                '--blob-glow': blob.glow,
                '--blob-duration': `${blob.duration}s`,
                animationDelay: `${blob.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Grain très léger par-dessus (atmosphère, pas lourdeur) */}
      <div className="living-bg__grain" />
    </div>
  );
}
