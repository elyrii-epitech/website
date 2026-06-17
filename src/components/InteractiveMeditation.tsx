import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, RefreshCw, Timer, Wind } from 'lucide-react';

type BreatheState = 'idle' | 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

const sequence: Array<{ state: BreatheState; duration: number }> = [
  { state: 'inhale', duration: 4 },
  { state: 'hold-in', duration: 2 },
  { state: 'exhale', duration: 4 },
  { state: 'hold-out', duration: 2 },
];

export default function InteractiveMeditation() {
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [stepIndex, setStepIndex] = useState(0);

  const breatheState = isActive ? sequence[stepIndex].state : 'idle';

  useEffect(() => {
    if (!isActive) return undefined;
    if (secondsLeft <= 0) {
      setIsActive(false);
      setStepIndex(0);
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isActive, secondsLeft]);

  useEffect(() => {
    if (!isActive) return undefined;

    const currentStep = sequence[stepIndex];
    const timeout = window.setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % sequence.length);
    }, currentStep.duration * 1000);

    return () => window.clearTimeout(timeout);
  }, [isActive, stepIndex]);

  const status = useMemo(() => {
    switch (breatheState) {
      case 'inhale':
        return 'Inspire lentement';
      case 'hold-in':
        return 'Garde l’air';
      case 'exhale':
        return 'Expire doucement';
      case 'hold-out':
        return 'Reste immobile';
      default:
        return 'Prêt pour une minute';
    }
  }, [breatheState]);

  const circleScale = breatheState === 'inhale' || breatheState === 'hold-in' ? 1.46 : breatheState === 'idle' ? 1.08 : 0.96;
  const circleColor = breatheState === 'exhale' ? 'var(--accent)' : breatheState === 'hold-in' || breatheState === 'hold-out' ? 'var(--clay)' : 'var(--lavender)';

  const handleStart = () => {
    if (secondsLeft <= 0) setSecondsLeft(60);
    setIsActive((active) => !active);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(60);
    setStepIndex(0);
  };

  return (
    <div className="glass-panel" id="meditation-simulator">
      <div className="panel-topline">
        <span className="panel-kicker">
          <Wind size={18} />
          Respiration
        </span>
        <span className="panel-kicker">
          <Timer size={16} />
          {secondsLeft}s
        </span>
      </div>

      <h3>Cohérence cardiaque guidée</h3>
      <p>Un cycle court pour retrouver une cadence respiratoire lisible avant de reprendre la conversation ou le journal.</p>

      <div className="breathing-circle-outer">
        <motion.div
          animate={{ scale: circleScale, backgroundColor: circleColor }}
          transition={{
            duration: breatheState === 'inhale' || breatheState === 'exhale' ? 4 : 0.7,
            ease: 'easeInOut',
          }}
          className="breathing-circle-inner"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={breatheState}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {breatheState === 'inhale' && 'INSPIRE'}
              {breatheState === 'exhale' && 'EXPIRE'}
              {(breatheState === 'hold-in' || breatheState === 'hold-out') && 'PAUSE'}
              {breatheState === 'idle' && 'CALME'}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {isActive && (
          <motion.div
            initial={{ scale: 0.72, opacity: 0.55 }}
            animate={{ scale: 1.65, opacity: 0 }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 145,
              height: 145,
              borderRadius: '50%',
              border: '1px solid rgba(185, 212, 194, 0.55)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <div className="meditation-status">{status}</div>

      <div className="meditation-controls">
        <button className={`meditation-control ${!isActive ? 'meditation-control--primary' : ''}`} onClick={handleStart}>
          {isActive ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          {isActive ? 'Suspendre' : 'Démarrer'}
        </button>
        <button className="meditation-control" onClick={handleReset} aria-label="Réinitialiser la séance">
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
}
