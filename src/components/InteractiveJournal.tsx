import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, PenTool, Sparkles } from 'lucide-react';

interface MoodConfig {
  emoji: string;
  label: string;
  themeClass: string;
  color: string;
  insight: string;
  prompt: string;
  placeholderText: string;
}

const MOODS: { [key: string]: MoodConfig } = {
  sad: {
    emoji: "😭",
    label: "Très dur",
    themeClass: "active-peach",
    color: "var(--accent-peach)",
    insight: "C'est tout à fait normal d'avoir des jours sombres. Ne sois pas trop dur avec toi-même aujourd'hui.",
    prompt: "Aujourd'hui, j'ai le droit de me reposer et de ressentir ma tristesse. Demain est un autre jour...",
    placeholderText: "Quel a été le moment le plus lourd aujourd'hui ? Écris pour te libérer..."
  },
  down: {
    emoji: "🙁",
    label: "Difficile",
    themeClass: "active-peach",
    color: "var(--accent-peach)",
    insight: "Les petits nuages finissent toujours par passer. Quelque chose a-t-il pesé sur ton moral ?",
    prompt: "Ce n'était pas la meilleure journée, mais j'ai fait de mon mieux et c'est déjà une grande victoire.",
    placeholderText: "Qu'est-ce qui t'a contrarié aujourd'hui ?"
  },
  neutral: {
    emoji: "😐",
    label: "Neutre",
    themeClass: "active",
    color: "var(--primary)",
    insight: "Une journée calme est une excellente occasion de prendre soin de soi et de se recentrer.",
    prompt: "Une journée ordinaire, reposante, où j'ai pu avancer à mon propre rythme sans pression.",
    placeholderText: "Raconte brièvement le déroulement de ta journée..."
  },
  good: {
    emoji: "🙂",
    label: "Bien",
    themeClass: "active-mint",
    color: "var(--accent-mint)",
    insight: "Super ! Prends le temps de savourer cette sensation positive et d'ancrer ce bien-être.",
    prompt: "Une chouette journée ! J'ai apprécié les petits moments de calme et le contact avec mes proches.",
    placeholderText: "Quel a été ton petit plaisir aujourd'hui ?"
  },
  awesome: {
    emoji: "😄",
    label: "Super !",
    themeClass: "active-mint",
    color: "var(--accent-mint)",
    insight: "Incroyable ! Ta joie est contagieuse. Note ce qui a rendu ce moment si magique pour t'en souvenir !",
    prompt: "Une journée magique remplie d'énergie positive et de réussites ! Je me sens inspiré !",
    placeholderText: "Partage cette superbe énergie ! Qu'est-ce qui t'a rendu si heureux ?"
  }
};

export default function InteractiveJournal() {
  const [selectedMoodKey, setSelectedMoodKey] = useState<string>('neutral');
  const [journalText, setJournalText] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const currentMood = MOODS[selectedMoodKey];

  const handleMoodSelect = (key: string) => {
    setSelectedMoodKey(key);
    setJournalText('');
    setIsSaved(false);
  };

  const handleAutoFill = () => {
    setJournalText(MOODS[selectedMoodKey].prompt);
  };

  const handleSave = () => {
    if (!journalText.trim()) return;
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="glass-panel glowing-primary" id="journal-simulator" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Calendar style={{ color: currentMood.color }} size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>JOURNAL DE BORD</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aujourd'hui, 22:00</span>
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: 12 }}>Comment s'est passée ta journée ?</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
        Enregistre ton humeur pour obtenir des conseils personnalisés par notre IA et adapter tes quêtes.
      </p>

      {/* Mood Select Buttons */}
      <div className="mood-selector" id="mood-selector-container">
        {Object.entries(MOODS).map(([key, config]) => (
          <button
            key={key}
            id={`mood-btn-${key}`}
            className={`mood-btn ${selectedMoodKey === key ? `active ${config.themeClass}` : ''}`}
            onClick={() => handleMoodSelect(key)}
          >
            <span className="mood-emoji">{config.emoji}</span>
            <span className="mood-label">{config.label}</span>
          </button>
        ))}
      </div>

      {/* Empathetic Insight Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMoodKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderLeft: `3px solid ${currentMood.color}`,
            borderRadius: '4px 8px 8px 4px',
            padding: '16px',
            marginBottom: 24,
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12
          }}
        >
          <Sparkles size={18} style={{ color: currentMood.color, flexShrink: 0, marginTop: 2 }} />
          <span>{currentMood.insight}</span>
        </motion.div>
      </AnimatePresence>

      {/* Journal Entry Input Box */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <PenTool size={14} /> ÉCRITURE LIBRE
          </span>
          <button
            id="journal-suggest-btn"
            onClick={handleAutoFill}
            style={{ fontSize: '0.75rem', color: currentMood.color, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            💡 Inspirer mon écriture
          </button>
        </div>
        
        <textarea
          id="journal-textarea"
          rows={3}
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder={currentMood.placeholderText}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-s)',
            padding: '12px 16px',
            color: '#fff',
            fontSize: '0.9rem',
            outline: 'none',
            resize: 'none',
            transition: 'var(--transition-fast)'
          }}
          onFocus={(e) => e.target.style.borderColor = currentMood.color}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
          <button
            id="journal-save-btn"
            onClick={handleSave}
            disabled={!journalText.trim()}
            className="btn"
            style={{
              padding: '10px 20px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-s)',
              background: journalText.trim() 
                ? (selectedMoodKey === 'sad' || selectedMoodKey === 'down' 
                  ? 'linear-gradient(135deg, var(--accent-peach) 0%, #f79c8d 100%)' 
                  : selectedMoodKey === 'neutral' 
                    ? 'linear-gradient(135deg, var(--primary) 0%, #7e5cf5 100%)' 
                    : 'linear-gradient(135deg, var(--accent-mint) 0%, #8ac5a0 100%)')
                : 'rgba(255,255,255,0.05)',
              color: selectedMoodKey === 'sad' || selectedMoodKey === 'down' || selectedMoodKey === 'good' || selectedMoodKey === 'awesome' ? '#08050c' : '#fff',
              opacity: journalText.trim() ? 1 : 0.5,
              cursor: journalText.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            {isSaved ? '✓ Enregistré !' : 'Enregistrer ma pensée'}
          </button>
        </div>
      </div>
    </div>
  );
}
