import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, RefreshCw, Timer, Wind } from 'lucide-react';

type BreatheState = 'idle' | 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

interface BreathingIntent {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  benefit: string;
  sequence: Array<{ state: BreatheState; duration: number }>;
}

const INTENTS: BreathingIntent[] = [
  {
    id: 'coherence',
    title: 'Équilibre',
    subtitle: 'Cohérence 5-5',
    emoji: '⚖️',
    benefit: 'Régule le rythme cardiaque et apaise le système nerveux',
    sequence: [
      { state: 'inhale', duration: 5 },
      { state: 'exhale', duration: 5 },
    ],
  },
  {
    id: 'sleep',
    title: 'Sommeil',
    subtitle: 'Méthode 4-7-8',
    emoji: '🌙',
    benefit: 'Apaisement profond du corps, idéal avant de dormir',
    sequence: [
      { state: 'inhale', duration: 4 },
      { state: 'hold-in', duration: 7 },
      { state: 'exhale', duration: 8 },
    ],
  },
  {
    id: 'focus',
    title: 'Focus',
    subtitle: 'Respiration 4-4',
    emoji: '🎯',
    benefit: 'Clarté mentale immédiate et concentration accrue',
    sequence: [
      { state: 'inhale', duration: 4 },
      { state: 'hold-in', duration: 4 },
      { state: 'exhale', duration: 4 },
      { state: 'hold-out', duration: 4 },
    ],
  },
  {
    id: 'relax',
    title: 'Détente',
    subtitle: 'Ventrale 4-2-6',
    emoji: '🌿',
    benefit: 'Relâche les tensions abdominales et le diaphragme',
    sequence: [
      { state: 'inhale', duration: 4 },
      { state: 'hold-in', duration: 2 },
      { state: 'exhale', duration: 6 },
    ],
  },
  {
    id: 'energy',
    title: 'Énergie',
    subtitle: 'Ujjayi 6-6',
    emoji: '🌊',
    benefit: 'Ancrage doux du yoga et réchauffement intérieur',
    sequence: [
      { state: 'inhale', duration: 6 },
      { state: 'exhale', duration: 6 },
    ],
  },
];

export default function InteractiveMeditation() {
  const [selectedIntentId, setSelectedIntentId] = useState('coherence');
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [stepIndex, setStepIndex] = useState(0);

  const currentIntent = INTENTS.find((item) => item.id === selectedIntentId) ?? INTENTS[0];
  const activeSequence = currentIntent.sequence;
  const currentStep = activeSequence[stepIndex % activeSequence.length];
  const breatheState = isActive ? currentStep.state : 'idle';
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

    const stepDuration = currentStep.duration;
    const timer = window.setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % activeSequence.length);
    }, stepDuration * 1000);

    return () => window.clearTimeout(timer);
  }, [isActive, stepIndex, currentStep, activeSequence.length]);
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
  const circleColor = breatheState === 'exhale' ? 'var(--accent)' : breatheState === 'hold-in' || breatheState === 'hold-out' ? 'var(--peach)' : 'var(--lavender)';

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
    <div className="glass-panel meditation-simulator-panel" id="meditation-simulator">
      <div className="panel-topline">
        <span className="panel-kicker">
          <Wind size={16} />
          Sanctuaire du Souffle
        </span>
        <span className="panel-kicker panel-kicker--time">
          <Timer size={15} />
          {secondsLeft}s
        </span>
      </div>

      <div className="meditation-intent-header">
        <div className="meditation-intent-badge">
          <span className="meditation-intent-badge__emoji">{currentIntent.emoji}</span>
          <span className="meditation-intent-badge__name">{currentIntent.title}</span>
          <span className="meditation-intent-badge__sub">{currentIntent.subtitle}</span>
        </div>
        <p className="meditation-intent-desc">{currentIntent.benefit}</p>
      </div>

      {/* Sélecteur des 5 intentions — wrap fluide sans barre de défilement */}
      <div className="breathing-intents-row" role="tablist" aria-label="Intentions de respiration">
        {INTENTS.map((intent) => {
          const isSelected = intent.id === currentIntent.id;
          return (
            <button
              key={intent.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`breathing-intent-pill ${isSelected ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedIntentId(intent.id);
                setStepIndex(0);
              }}
            >
              <span>{intent.emoji}</span>
              <span>{intent.title}</span>
            </button>
          );
        })}
      </div>

      <div className="breathing-circle-outer">
        <motion.div
          animate={{ scale: circleScale, backgroundColor: circleColor }}
          transition={{
            duration: breatheState === 'inhale' || breatheState === 'exhale' ? currentStep.duration : 0.7,
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
