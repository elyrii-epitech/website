import { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Award, Check, Play, RefreshCw, Trophy } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  category: 'Bien-être' | 'Journal' | 'Social';
  xp: number;
  completed: boolean;
}

const INITIAL_QUESTS: Quest[] = [
  { id: '1', title: 'Faire une respiration guidée dans la bulle', category: 'Bien-être', xp: 30, completed: false },
  { id: '2', title: 'Noter une pensée utile dans le journal', category: 'Journal', xp: 40, completed: false },
  { id: '3', title: 'Parler d’un sujet important avec Elyrii', category: 'Social', xp: 50, completed: false },
];

export default function InteractiveQuests() {
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [currentXP, setCurrentXP] = useState(10);
  const [level, setLevel] = useState(1);
  const totalXPRequired = 130;

  const triggerConfetti = (large = false) => {
    confetti({
      particleCount: large ? 120 : 56,
      spread: large ? 74 : 48,
      origin: { y: 0.78 },
      colors: ['#b9d4c2', '#e4ad9f', '#a99af0', '#e6c56d'],
      disableForReducedMotion: true,
    });
  };

  const handleCompleteQuest = (id: string, xp: number) => {
    const targetQuest = quests.find((quest) => quest.id === id);
    if (!targetQuest || targetQuest.completed) return;

    const nextXP = currentXP + xp;
    setQuests((prev) => prev.map((quest) => (quest.id === id ? { ...quest, completed: true } : quest)));
    setCurrentXP(nextXP);
    triggerConfetti();

    if (nextXP >= totalXPRequired && level === 1) {
      window.setTimeout(() => {
        setLevel(2);
        triggerConfetti(true);
      }, 500);
    }
  };

  const handleReset = () => {
    setQuests(INITIAL_QUESTS);
    setCurrentXP(10);
    setLevel(1);
  };

  const progressPercentage = Math.min(100, (currentXP / totalXPRequired) * 100);

  return (
    <div className="glass-panel" id="quest-simulator">
      <div className="panel-topline">
        <span className="panel-kicker">
          <Trophy size={18} />
          Défis
        </span>
        <button className="icon-button" onClick={handleReset} aria-label="Réinitialiser les défis">
          <RefreshCw size={15} />
        </button>
      </div>

      <h3>Tes objectifs quotidiens</h3>
      <p>Des actions assez petites pour être commencées même quand l’énergie est basse.</p>

      <div className="quest-list" id="quest-list-container">
        {quests.map((quest) => (
          <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`}>
            <div className="quest-info">
              <div className="quest-status-icon">{quest.completed && <Check size={14} />}</div>
              <div>
                <div className="quest-title">{quest.title}</div>
                <div className="quest-xp">
                  +{quest.xp} XP / {quest.category}
                </div>
              </div>
            </div>

            {quest.completed ? (
              <span className="mini-label">Validé</span>
            ) : (
              <button className="quest-action" onClick={() => handleCompleteQuest(quest.id, quest.xp)}>
                <Play size={13} fill="currentColor" />
                Valider
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="xp-progress-container">
        <div className="xp-meta">
          <span>
            <Award size={16} /> Niveau {level}
          </span>
          <span>{level === 2 ? 'Palier atteint' : `${currentXP} / ${totalXPRequired} XP`}</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${progressPercentage}%` }} />
        </div>

        {level === 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="level-message">
            Niveau 2 débloqué. La progression est enregistrée.
          </motion.div>
        )}
      </div>
    </div>
  );
}
