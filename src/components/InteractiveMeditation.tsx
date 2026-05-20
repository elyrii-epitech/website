import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Play, Pause, Timer, RefreshCw } from 'lucide-react';

type BreatheState = 'idle' | 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

export default function InteractiveMeditation() {
  const [isActive, setIsActive] = useState(false);
  const [breatheState, setBreatheState] = useState<BreatheState>('idle');
  const [secondsLeft, setSecondsLeft] = useState(60);

  // Core Breathing State Cycle (4s Inhale, 2s Hold, 4s Exhale, 2s Hold)
  useEffect(() => {
    if (!isActive) {
      setBreatheState('idle');
      return;
    }

    if (secondsLeft <= 0) {
      setIsActive(false);
      setBreatheState('idle');
      return;
    }

    // Timer countdown
    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    // Breathing sequence machine
    let sequenceTimer: any;
    
    const runSequence = (step: number) => {
      if (!isActive) return;
      
      if (step === 0) {
        setBreatheState('inhale');
        sequenceTimer = setTimeout(() => runSequence(1), 4000);
      } else if (step === 1) {
        setBreatheState('hold-in');
        sequenceTimer = setTimeout(() => runSequence(2), 2000);
      } else if (step === 2) {
        setBreatheState('exhale');
        sequenceTimer = setTimeout(() => runSequence(3), 4000);
      } else {
        setBreatheState('hold-out');
        sequenceTimer = setTimeout(() => runSequence(0), 2000);
      }
    };

    runSequence(0);

    return () => {
      clearInterval(timer);
      clearTimeout(sequenceTimer);
    };
  }, [isActive, secondsLeft]);

  const handleStart = () => {
    if (secondsLeft <= 0) setSecondsLeft(60);
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(60);
    setBreatheState('idle');
  };

  // Label text matching breathing cycle
  const getBreatheLabel = () => {
    switch (breatheState) {
      case 'inhale': return 'Inspirez lentement... 🌬️';
      case 'hold-in': return 'Bloquez... 🧘';
      case 'exhale': return 'Expirez doucement... 💨';
      case 'hold-out': return 'Bloquez... 🧘';
      default: return 'Prêt à vous détendre ?';
    }
  };

  // Framer Motion scaling settings based on respiratory status
  const getCircleScale = () => {
    if (breatheState === 'inhale' || breatheState === 'hold-in') return 1.45;
    if (breatheState === 'exhale' || breatheState === 'hold-out') return 1.0;
    return 1.1;
  };

  const getCircleColor = () => {
    if (breatheState === 'inhale') return 'rgba(157, 127, 254, 0.45)';
    if (breatheState === 'exhale') return 'rgba(0, 206, 209, 0.45)';
    if (breatheState === 'hold-in' || breatheState === 'hold-out') return 'rgba(255, 181, 168, 0.45)';
    return 'rgba(157, 127, 254, 0.25)';
  };

  return (
    <div className="glass-panel glowing-primary" id="meditation-simulator" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Wind style={{ color: 'var(--accent-turquoise)' }} size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>COHÉRENCE CARDIAQUE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Timer size={16} />
          <span id="meditation-timer">{secondsLeft}s</span>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: 6 }}>Bulle de Respiration Guidée</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 20, maxWidth: 360 }}>
        Suis le rythme d'expansion de la bulle pour relâcher instantanément ton anxiété et ralentir ton rythme cardiaque.
      </p>

      {/* Guided Circle Container */}
      <div className="breathing-circle-outer" style={{ position: 'relative' }}>
        <motion.div
          animate={{
            scale: getCircleScale(),
            backgroundColor: getCircleColor()
          }}
          transition={{
            duration: breatheState === 'inhale' || breatheState === 'exhale' ? 4 : 2,
            ease: 'easeInOut'
          }}
          className="breathing-circle-inner"
          id="meditation-breathing-bubble"
          style={{ width: 120, height: 120 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={breatheState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: '0.85rem', textAlign: 'center', fontWeight: 700, padding: 8 }}
            >
              {breatheState === 'inhale' && 'INSPIRE'}
              {breatheState === 'exhale' && 'EXPIRE'}
              {(breatheState === 'hold-in' || breatheState === 'hold-out') && 'BLOQUE'}
              {breatheState === 'idle' && 'RESPIRER'}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Ambient Ring Wave */}
        {isActive && (
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '2px solid var(--accent-turquoise)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}
      </div>

      {/* Instruction text */}
      <div style={{ height: 30, display: 'flex', alignItems: 'center', margin: '12px 0 20px 0' }}>
        <span 
          id="meditation-status-label"
          style={{ fontSize: '1rem', fontWeight: 600, color: breatheState !== 'idle' ? 'white' : 'var(--text-secondary)' }}
        >
          {getBreatheLabel()}
        </span>
      </div>

      {/* Play Control Bar */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          id="meditation-play-btn"
          onClick={handleStart}
          className="btn btn-primary"
          style={{
            padding: '10px 24px',
            fontSize: '0.9rem',
            borderRadius: 'var(--radius-s)',
            background: isActive 
              ? 'rgba(255,255,255,0.05)' 
              : 'linear-gradient(135deg, var(--accent-turquoise) 0%, #00adb0 100%)',
            boxShadow: isActive ? 'none' : '0 4px 15px rgba(0, 206, 209, 0.3)',
            color: isActive ? '#fff' : '#08050c'
          }}
        >
          {isActive ? (
            <>
              <Pause size={16} style={{ marginRight: 6, fill: 'currentColor' }} /> Suspendre
            </>
          ) : (
            <>
              <Play size={16} style={{ marginRight: 6, fill: 'currentColor' }} /> Démarrer la séance
            </>
          )}
        </button>

        <button
          id="meditation-reset-btn"
          onClick={handleReset}
          className="btn btn-secondary"
          style={{ padding: '10px 16px', borderRadius: 'var(--radius-s)' }}
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
}
