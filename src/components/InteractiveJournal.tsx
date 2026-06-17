import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, PenTool, Sparkles } from 'lucide-react';

interface MoodConfig {
  label: string;
  color: string;
  insight: string;
  prompt: string;
  placeholderText: string;
}

const MOODS: Record<string, MoodConfig> = {
  sad: {
    label: 'Très dur',
    color: 'var(--danger)',
    insight: 'Aujourd’hui peut rester petit. Une seule phrase suffit pour sortir la tension de ta tête.',
    prompt: 'Aujourd’hui a été lourd. Je peux noter ce qui m’a blessé sans devoir le résoudre tout de suite.',
    placeholderText: 'Quel moment a demandé le plus d’effort ?',
  },
  down: {
    label: 'Difficile',
    color: 'var(--clay)',
    insight: 'Ce qui pèse mérite d’être nommé. Elyrii peut ensuite proposer une action douce.',
    prompt: 'Ce n’était pas simple, mais j’ai tenu. Je veux comprendre ce qui a consommé mon énergie.',
    placeholderText: 'Qu’est-ce qui a tiré ton moral vers le bas ?',
  },
  neutral: {
    label: 'Neutre',
    color: 'var(--lavender)',
    insight: 'Une journée neutre donne de bonnes données: rythme, sommeil, interactions, environnement.',
    prompt: 'Journée calme. J’ai avancé sans intensité particulière, et je veux garder une trace simple.',
    placeholderText: 'Raconte le déroulé de ta journée.',
  },
  good: {
    label: 'Bien',
    color: 'var(--accent)',
    insight: 'Repérer ce qui aide permet de le reproduire sans forcer.',
    prompt: 'J’ai ressenti un mieux aujourd’hui. Je veux noter le geste, la personne ou le moment qui a aidé.',
    placeholderText: 'Quel détail t’a fait du bien ?',
  },
  strong: {
    label: 'Stable',
    color: 'var(--honey)',
    insight: 'La stabilité compte aussi. Elle montre les conditions qui soutiennent ton équilibre.',
    prompt: 'Je me suis senti stable. Je veux garder en mémoire ce qui a rendu cette journée plus solide.',
    placeholderText: 'Qu’est-ce qui a rendu la journée plus stable ?',
  },
};

export default function InteractiveJournal() {
  const [selectedMoodKey, setSelectedMoodKey] = useState('neutral');
  const [journalText, setJournalText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const currentMood = MOODS[selectedMoodKey];

  const handleMoodSelect = (key: string) => {
    setSelectedMoodKey(key);
    setJournalText('');
    setIsSaved(false);
  };

  const handleAutoFill = () => {
    setJournalText(currentMood.prompt);
    setIsSaved(false);
  };

  const handleSave = () => {
    if (!journalText.trim()) return;
    setIsSaved(true);
    window.setTimeout(() => setIsSaved(false), 2400);
  };

  return (
    <div className="glass-panel" id="journal-simulator">
      <div className="panel-topline">
        <span className="panel-kicker">
          <Calendar size={18} />
          Journal
        </span>
        <span className="mini-label">Aujourd’hui, 22:00</span>
      </div>

      <h3>Comment s’est passée ta journée ?</h3>
      <p>Choisis une humeur, puis garde une trace exploitable par le coach et les tendances.</p>

      <div className="mood-selector" id="mood-selector-container">
        {Object.entries(MOODS).map(([key, config]) => (
          <button
            key={key}
            className={`mood-btn ${selectedMoodKey === key ? 'active' : ''}`}
            onClick={() => handleMoodSelect(key)}
            style={{ color: config.color }}
          >
            <span className="mood-glyph" aria-hidden="true" />
            <span className="mood-label">{config.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMoodKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="insight-card"
          style={{ borderLeftColor: currentMood.color }}
        >
          <Sparkles size={18} style={{ color: currentMood.color, flex: '0 0 auto' }} />
          <span>{currentMood.insight}</span>
        </motion.div>
      </AnimatePresence>

      <div className="journal-actions">
        <span className="panel-kicker">
          <PenTool size={15} />
          Écriture libre
        </span>
        <button className="journal-suggest" onClick={handleAutoFill}>
          <Sparkles size={14} />
          Proposer une amorce
        </button>
      </div>

      <textarea
        className="journal-textarea"
        rows={4}
        value={journalText}
        onChange={(event) => {
          setJournalText(event.target.value);
          setIsSaved(false);
        }}
        placeholder={currentMood.placeholderText}
      />

      <div className="journal-actions">
        <span className="mini-label">{journalText.trim().length || 0} caractères</span>
        <button className="save-button" onClick={handleSave} disabled={!journalText.trim()}>
          {isSaved ? 'Pensée enregistrée' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}
