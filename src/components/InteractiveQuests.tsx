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

export default function InteractiveQuests() {
  const [quests, setQuests] = useState<Quest[]>([
    { id: '1', title: "Faire 5 respirations guidées dans la bulle", category: "Bien-être", xp: 30, completed: false },
    { id: '2', title: "Rédiger une pensée positive du jour dans ton journal", category: "Journal", xp: 40, completed: false },
    { id: '3', title: "Parler de ta passion créative avec Elyrii", category: "Social", xp: 50, completed: false }
  ]);

  const [currentXP, setCurrentXP] = useState(10);
  const [level, setLevel] = useState(1);
  const totalXPRequired = 130;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#9d7ffe', '#ffb5a8', '#a8d5ba'] // Lavender, Peach, Mint
    });
  };

  const handleCompleteQuest = (id: string, xp: number) => {
    const targetQuest = quests.find(q => q.id === id);
    if (!targetQuest || targetQuest.completed) return;

    // 1. Mark completed
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: true } : q));

    // 2. Add XP
    const newXP = currentXP + xp;
    setCurrentXP(newXP);

    // 3. Fire Confetti
    triggerConfetti();

    // 4. Check Level Up
    if (newXP >= totalXPRequired) {
      setTimeout(() => {
        setLevel(2);
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#9d7ffe', '#ffb5a8', '#a8d5ba', '#00ced1']
        });
      }, 800);
    }
  };

  const handleReset = () => {
    setQuests(prev => prev.map(q => ({ ...q, completed: false })));
    setCurrentXP(10);
    setLevel(1);
  };

  const progressPercentage = Math.min(100, (currentXP / totalXPRequired) * 100);

  return (
    <div className="glass-panel glowing-primary" id="quest-simulator" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Trophy style={{ color: 'var(--accent-peach)' }} size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>DÉFIS & GAMIFICATION</span>
        </div>
        <button 
          id="quest-reset-btn"
          onClick={handleReset} 
          style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}
        >
          <RefreshCw size={12} /> Réinitialiser
        </button>
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: 12 }}>Tes objectifs quotidiens</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
        En accomplissant ces défis simples, tu gagnes de l'expérience, augmentes ton niveau et débloques des récompenses.
      </p>

      {/* Quest Items list */}
      <div id="quest-list-container" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {quests.map((quest) => (
          <div 
            key={quest.id} 
            className={`quest-item ${quest.completed ? 'completed' : ''}`}
            id={`quest-item-${quest.id}`}
          >
            <div className="quest-info">
              <div className="quest-status-icon">
                {quest.completed && <Check size={14} />}
              </div>
              <div>
                <div className="quest-title" style={{ color: quest.completed ? 'var(--text-muted)' : '#fff' }}>
                  {quest.title}
                </div>
                <div className="quest-xp">
                  +{quest.xp} XP • <span style={{ color: 'var(--text-muted)' }}>{quest.category}</span>
                </div>
              </div>
            </div>
            
            {!quest.completed ? (
              <button
                id={`quest-complete-btn-${quest.id}`}
                onClick={() => handleCompleteQuest(quest.id, quest.xp)}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: 'var(--radius-s)' }}
              >
                <Play size={12} style={{ marginRight: 4, fill: 'currentColor' }} /> Valider
              </button>
            ) : (
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-mint)', fontWeight: 600 }}>Complété</span>
            )}
          </div>
        ))}
      </div>

      {/* XP Level Bar Progress container */}
      <div className="xp-progress-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Award size={16} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Niveau {level}</span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {level === 2 ? 'Niveau Max Atteint ! 🎉' : `${currentXP} / ${totalXPRequired} XP`}
          </span>
        </div>

        <div className="xp-bar">
          <div 
            className="xp-fill" 
            style={{ width: `${progressPercentage}%` }}
            id="quest-xp-progress-bar"
          ></div>
        </div>

        {level === 2 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginTop: 16,
              background: 'rgba(168, 213, 186, 0.1)',
              border: '1px solid rgba(168, 213, 186, 0.2)',
              borderRadius: 'var(--radius-s)',
              padding: '10px 14px',
              fontSize: '0.8rem',
              color: 'var(--accent-mint)',
              textAlign: 'center',
              fontWeight: 600
            }}
          >
            🎉 Félicitations ! Tu es passé au Niveau 2 ! Tu es sur la bonne voie.
          </motion.div>
        )}
      </div>
    </div>
  );
}
