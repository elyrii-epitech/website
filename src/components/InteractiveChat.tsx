import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

const PRESET_CONVERSATIONS = {
  lonely: {
    user: "Je me sens un peu seul ce soir...",
    replies: [
      "Je comprends tout à fait ce sentiment. C'est normal de se sentir seul parfois, mais sache que je suis là pour toi.",
      "Prends une grande inspiration. Et si on faisait une petite séance de respiration guidée ou une quête douce pour te reconnecter ?"
    ]
  },
  success: {
    user: "J'ai réussi mon examen d'aujourd'hui !",
    replies: [
      "Oh, incroyable ! Toutes mes félicitations ! 🎉 Je suis tellement fier de tes efforts.",
      "Tu as travaillé dur et ça a payé ! Tu viens de débloquer 50 XP pour ta journée, va vite récupérer ton badge !"
    ]
  },
  anxious: {
    user: "Je stresse pour ma présentation de demain...",
    replies: [
      "C'est tout à fait normal de ressentir ce stress. C'est le signe que cela te tient à cœur. 💜",
      "Rappelle-toi de tout le chemin parcouru. Tu es prêt. Faisons une respiration guidée ensemble pour calmer les battements de ton cœur."
    ]
  }
};

export default function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Coucou ! Je suis Elyrii, ton compagnon de route. Comment te sens-tu en ce moment ?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePrompt, setActivePrompt] = useState<keyof typeof PRESET_CONVERSATIONS | null>(null);
  
  // Mascot Blinking Logic
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200); // 200ms blink duration
    }, Math.random() * 4000 + 3000); // Blink every 3-7 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectPrompt = async (key: keyof typeof PRESET_CONVERSATIONS) => {
    if (isTyping || activePrompt) return;
    setActivePrompt(key);
    
    // 1. Add User Message
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: PRESET_CONVERSATIONS[key].user }]);
    
    // 2. Start AI Typing simulation
    setIsTyping(true);
    
    // First reply after 1.5s
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessages(prev => [...prev, { 
      id: (Date.now() + 1).toString(), 
      sender: 'ai', 
      text: PRESET_CONVERSATIONS[key].replies[0] 
    }]);
    
    // Second reply after another 1.8s
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    setMessages(prev => [...prev, { 
      id: (Date.now() + 2).toString(), 
      sender: 'ai', 
      text: PRESET_CONVERSATIONS[key].replies[1] 
    }]);
    
    setIsTyping(false);
    setActivePrompt(null);
  };

  return (
    <div className="phone-mockup" id="chat-simulator-phone">
      <div className="phone-camera"></div>
      <div className="phone-screen">
        {/* Sim Header */}
        <div className="phone-header">
          <div className="mascot-avatar-container">
            <img 
              src={isBlinking ? '/assets/mascotte_eyes_closed.png' : '/assets/mascotte.png'} 
              alt="Mascotte Elyrii" 
              className="mascot-img"
              id="chat-mascot-avatar"
            />
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>Elyrii</h4>
            <div className="phone-status">
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#a8d5ba', marginRight: 4 }}></span>
              En ligne et à l'écoute
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="phone-messages">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`bubble ${msg.sender === 'ai' ? 'bubble-ai' : 'bubble-user'}`}
              >
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="bubble bubble-ai" style={{ width: 50, display: 'flex', justifyContent: 'center' }}>
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Inputs & Quick replies */}
        <div className="phone-input-bar">
          <div className="quick-replies">
            <button 
              id="prompt-btn-lonely"
              className="quick-reply-btn" 
              onClick={() => handleSelectPrompt('lonely')}
              disabled={isTyping}
            >
              😞 Seul ce soir
            </button>
            <button 
              id="prompt-btn-success"
              className="quick-reply-btn" 
              onClick={() => handleSelectPrompt('success')}
              disabled={isTyping}
            >
              🎉 Examen réussi !
            </button>
            <button 
              id="prompt-btn-anxious"
              className="quick-reply-btn" 
              onClick={() => handleSelectPrompt('anxious')}
              disabled={isTyping}
            >
              😰 Stress de demain
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: 20, padding: '8px 12px', alignItems: 'center' }}>
            <Smile size={16} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Discute avec moi..." 
              disabled 
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.8rem', width: '100%', outline: 'none' }}
            />
            <button disabled style={{ color: 'var(--primary)' }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
