import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import { assetUrl } from '../lib/asset';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

const PRESET_CONVERSATIONS = {
  lonely: {
    user: 'Je me sens seul ce soir.',
    replies: [
      'Je suis là. On peut ralentir ensemble et poser ce qui pèse, une phrase à la fois.',
      'Je te propose une action simple: envoyer un message court à une personne de confiance, ou lancer une respiration de 60 secondes.',
    ],
  },
  success: {
    user: 'J’ai réussi mon examen aujourd’hui.',
    replies: [
      'C’est une vraie étape. Tu peux prendre le temps de noter ce qui t’a aidé à tenir jusqu’au bout.',
      'Je viens de préparer une petite quête de célébration: sauvegarder cette victoire dans ton journal.',
    ],
  },
  anxious: {
    user: 'Je stresse pour ma présentation de demain.',
    replies: [
      'Ce stress dit que le sujet compte pour toi. On va le rendre plus maniable.',
      'Commence par trois respirations lentes, puis écris la première phrase que tu veux dire demain.',
    ],
  },
};

export default function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Bonsoir. Je suis Elyrii. Tu peux commencer par une pensée brute, je m’occupe du rythme.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePrompt, setActivePrompt] = useState<keyof typeof PRESET_CONVERSATIONS | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blinkInterval = window.setInterval(() => {
      setIsBlinking(true);
      window.setTimeout(() => setIsBlinking(false), 180);
    }, 4200);

    return () => window.clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  const handleSelectPrompt = async (key: keyof typeof PRESET_CONVERSATIONS) => {
    if (isTyping || activePrompt) return;

    const conversation = PRESET_CONVERSATIONS[key];
    setActivePrompt(key);
    setMessages((prev) => [...prev, { id: `${Date.now()}-user`, sender: 'user', text: conversation.user }]);
    setIsTyping(true);

    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setMessages((prev) => [...prev, { id: `${Date.now()}-ai-1`, sender: 'ai', text: conversation.replies[0] }]);

    await new Promise((resolve) => window.setTimeout(resolve, 1100));
    setMessages((prev) => [...prev, { id: `${Date.now()}-ai-2`, sender: 'ai', text: conversation.replies[1] }]);
    setIsTyping(false);
    setActivePrompt(null);
  };

  return (
    <div className="phone-mockup" id="chat-simulator-phone">
      <div className="phone-screen">
        <div className="phone-header">
          <div className="mascot-avatar-container">
            <img
              src={isBlinking ? assetUrl('assets/mascotte_eyes_closed.png') : assetUrl('assets/mascotte.png')}
              alt="Mascotte Elyrii"
            />
          </div>
          <div>
            <h4>Elyrii</h4>
            <div className="phone-status">
              <span className="status-dot" />
              En ligne, réponse contextualisée
            </div>
          </div>
        </div>

        <div className="phone-messages" ref={messagesContainerRef}>
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.24 }}
                className={`bubble ${msg.sender === 'ai' ? 'bubble-ai' : 'bubble-user'}`}
              >
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="bubble bubble-ai" aria-label="Elyrii écrit">
              <div className="typing-dots">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        <div className="phone-input-bar">
          <div className="quick-replies">
            <button type="button" className="quick-reply-btn" onClick={() => handleSelectPrompt('lonely')} disabled={isTyping}>
              Seul ce soir
            </button>
            <button type="button" className="quick-reply-btn" onClick={() => handleSelectPrompt('success')} disabled={isTyping}>
              Examen réussi
            </button>
            <button type="button" className="quick-reply-btn" onClick={() => handleSelectPrompt('anxious')} disabled={isTyping}>
              Stress de demain
            </button>
          </div>

          <div className="chat-input-shell">
            <Smile size={16} aria-hidden="true" />
            <input type="text" placeholder="Écrire à Elyrii..." disabled />
            <button type="button" disabled aria-label="Envoyer le message">
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
