import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Heart, 
  Smile, 
  Compass, 
  Download, 
  Menu, 
  X,
  Bookmark,
  Activity,
  Trophy,
  Wind,
  Timer
} from 'lucide-react';

import InteractiveChat from './components/InteractiveChat';
import InteractiveJournal from './components/InteractiveJournal';
import InteractiveQuests from './components/InteractiveQuests';
import InteractiveMeditation from './components/InteractiveMeditation';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor page scroll to add background to Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* Background Neon Orbs */}
      <div className="glow-orb orb-primary"></div>
      <div className="glow-orb orb-secondary"></div>
      <div className="glow-orb orb-mint"></div>

      {/* Navigation Header */}
      <nav className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container flex-between" style={{ height: '100%' }}>
          <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/assets/icon.png" alt="Elyrii Logo" className="logo-img" />
            <span className="logo-text">Elyrii</span>
          </div>

          <ul className="nav-links">
            <li><a href="#chat" onClick={(e) => { e.preventDefault(); scrollToSection('chat'); }}>Compagnon</a></li>
            <li><a href="#journal" onClick={(e) => { e.preventDefault(); scrollToSection('journal'); }}>Journal</a></li>
            <li><a href="#quests" onClick={(e) => { e.preventDefault(); scrollToSection('quests'); }}>Défis</a></li>
            <li><a href="#meditation" onClick={(e) => { e.preventDefault(); scrollToSection('meditation'); }}>Relaxation</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button 
              id="nav-cta-btn"
              className="btn btn-primary" 
              style={{ padding: '10px 20px', fontSize: '0.85rem', borderRadius: 'var(--radius-s)' }}
              onClick={() => scrollToSection('download')}
            >
              <Download size={14} /> Installer l'App
            </button>
            
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 80,
          left: 0,
          width: '100%',
          background: 'rgba(8, 5, 12, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-light)',
          zIndex: 99,
          padding: '24px 16px'
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <li><a href="#chat" onClick={(e) => { e.preventDefault(); scrollToSection('chat'); }} style={{ fontSize: '1.1rem', display: 'block', padding: '8px 0' }}>Compagnon IA</a></li>
            <li><a href="#journal" onClick={(e) => { e.preventDefault(); scrollToSection('journal'); }} style={{ fontSize: '1.1rem', display: 'block', padding: '8px 0' }}>Journal d'humeur</a></li>
            <li><a href="#quests" onClick={(e) => { e.preventDefault(); scrollToSection('quests'); }} style={{ fontSize: '1.1rem', display: 'block', padding: '8px 0' }}>Défis quotidiens</a></li>
            <li><a href="#meditation" onClick={(e) => { e.preventDefault(); scrollToSection('meditation'); }} style={{ fontSize: '1.1rem', display: 'block', padding: '8px 0' }}>Cohérence cardiaque</a></li>
          </ul>
        </div>
      )}

      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <header className="section-padding" style={{ paddingTop: 160, paddingBottom: 120 }}>
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <div className="badge badge-primary">
              <Sparkles size={14} />
              Compagnon de Croissance IA
            </div>
            
            <h1 id="hero-title" style={{ marginBottom: 20 }}>
              Ne traverse plus tes journées seul.
            </h1>
            
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: 32, color: 'var(--text-secondary)' }}>
              Une intelligence artificielle bienveillante et confidentielle combinée à des quêtes quotidiennes motivantes pour briser l'isolement, cultiver tes rituels de bien-être et surmonter l'anxiété.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(168, 213, 186, 0.1)', border: '1px solid var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--accent-mint)', fontSize: '0.75rem', fontWeight: 'bold' }}>✓</span>
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>Écoute active & empathie 24h/24 via Mistral-7B</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(168, 213, 186, 0.1)', border: '1px solid var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--accent-mint)', fontSize: '0.75rem', fontWeight: 'bold' }}>✓</span>
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>Analyse d'humeur & journal de bord sécurisé</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(168, 213, 186, 0.1)', border: '1px solid var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--accent-mint)', fontSize: '0.75rem', fontWeight: 'bold' }}>✓</span>
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>Confidentialité absolue : chiffrement local AES</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button 
                id="hero-cta-chat"
                className="btn btn-primary" 
                onClick={() => scrollToSection('chat')}
              >
                Discuter avec Elyrii <ArrowRight size={16} />
              </button>
              <button 
                id="hero-cta-download"
                className="btn btn-secondary" 
                onClick={() => scrollToSection('download')}
              >
                Télécharger l'App <Smartphone size={16} />
              </button>
            </div>
          </div>

          <div id="chat" style={{ display: 'flex', justifyContent: 'center' }}>
            <InteractiveChat />
          </div>
        </div>
      </header>

      {/* ==========================================
          FEATURES TECHNICAL DEEP DIVE SECTION
          ========================================== */}
      <section className="section-padding" style={{ background: '#0a0711', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px auto' }}>
            <div className="badge badge-peach">
              <ShieldCheck size={14} /> Architecture Soucieuse & Éco-système
            </div>
            <h2 id="features-title">Conçu pour ta santé mentale. Chiffré pour ta sécurité.</h2>
            <p>Découvre les piliers technologiques d'une application de pointe, pensée pour te guider au quotidien dans le respect le plus total de ta vie privée.</p>
          </div>

          <div className="grid-3" id="features-cards-grid">
            <div className="glass-panel glowing-primary">
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-s)', background: 'rgba(157, 127, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: '1px solid var(--primary)' }}>
                <Smile size={24} style={{ color: 'var(--primary)' }} />
              </div>
              <h3>Mascotte interactive</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Ton compagnon évolue, réagit physiquement et s'adapte à ton humeur. Plus tu complètes tes défis, plus il est heureux de fêter ta croissance avec toi !
              </p>
            </div>

            <div className="glass-panel glowing-primary">
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-s)', background: 'rgba(255, 181, 168, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: '1px solid var(--accent-peach)' }}>
                <Zap size={24} style={{ color: 'var(--accent-peach)' }} />
              </div>
              <h3>Gamification saine</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Pas de scroll infini ou de publicités toxiques. Notre système de quêtes encourage des actions concrètes dans le monde réel : prendre l'air, dessiner, s'hydrater, ou appeler un ami.
              </p>
            </div>

            <div className="glass-panel glowing-primary">
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-s)', background: 'rgba(168, 213, 186, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: '1px solid var(--accent-mint)' }}>
                <ShieldCheck size={24} style={{ color: 'var(--accent-mint)' }} />
              </div>
              <h3>Chiffrement fort AES</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Toutes tes conversations et pensées intimes sont isolées et cryptées localement. Tes clés d'identification JWT sont sécurisées et restent strictly confidentielles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          INTERACTIVE MODULES SHOWCASE (JOURNAL & MOOD)
          ========================================== */}
      <section className="section-padding" id="journal">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <div className="badge badge-mint">
              <Bookmark size={14} /> Journalisation
            </div>
            <h2>Analyse tes tendances émotionnelles</h2>
            <p style={{ marginBottom: 24 }}>
              Exprimer ce que l'on ressent est la première étape pour aller mieux. En consignant tes sentiments, le Mistral-7B analyse les nuances de ton humeur pour te suggérer des techniques adaptées.
            </p>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(168, 213, 186, 0.1)', border: '1px solid var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Activity size={18} style={{ color: 'var(--accent-mint)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>Suivi de l'évolution</h4>
                <p style={{ fontSize: '0.9rem' }}>Visualise ton graphique d'humeur hebdomadaire pour repérer les déclencheurs et mieux comprendre tes variations de moral.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(168, 213, 186, 0.1)', border: '1px solid var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={18} style={{ color: 'var(--accent-mint)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>Inspiration intuitive</h4>
                <p style={{ fontSize: '0.9rem' }}>Bloqué devant la page blanche ? Notre guide intelligent te propose des amorces d'écriture personnalisées en fonction de ta météo intérieure.</p>
              </div>
            </div>
          </div>

          <InteractiveJournal />
        </div>
      </section>

      {/* ==========================================
          INTERACTIVE MODULES SHOWCASE (QUESTS & CONFETTI)
          ========================================== */}
      <section className="section-padding" id="quests" style={{ background: '#0a0711', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div style={{ order: window.innerWidth > 1024 ? 1 : 0 }}>
            <InteractiveQuests />
          </div>

          <div style={{ order: window.innerWidth > 1024 ? 0 : 1 }}>
            <div className="badge badge-peach">
              <Trophy size={14} /> Rituels quotidiens
            </div>
            <h2>Progresse à ton rythme, sans pression</h2>
            <p style={{ marginBottom: 24 }}>
              Elyrii transforme le rétablissement de ta santé mentale en une aventure engageante. Relève des défis d'auto-soin, accumule des points d'expérience (XP) et débloque des succès célébrant chaque pas en avant.
            </p>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255, 181, 168, 0.1)', border: '1px solid var(--accent-peach)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Heart size={18} style={{ color: 'var(--accent-peach)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>Micro-habits bénéfiques</h4>
                <p style={{ fontSize: '0.9rem' }}>Les grands changements naissent de petits gestes répétés. Nos quêtes sont pensées pour être réalisables même dans les jours les plus difficiles.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255, 181, 168, 0.1)', border: '1px solid var(--accent-peach)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Smile size={18} style={{ color: 'var(--accent-peach)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>Renforcement positif</h4>
                <p style={{ fontSize: '0.9rem' }}>Chaque validation déclenche des vagues d'encouragements. Débloque des badges à collectionner dans ta galerie et suis ta progression au fil des niveaux.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          INTERACTIVE MODULES SHOWCASE (BREATHING)
          ========================================== */}
      <section className="section-padding" id="meditation">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <div className="badge badge-primary">
              <Compass size={14} /> Cohérence cardiaque
            </div>
            <h2>Relâche les tensions instantanément</h2>
            <p style={{ marginBottom: 24 }}>
              L'anxiété se traduit souvent par un souffle rapide et court. Notre bulle de cohérence cardiaque régule ta respiration en calquant ton diaphragme sur le flux d'expansion visuel, ramenant ton esprit au calme.
            </p>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(157, 127, 254, 0.1)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Wind size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>Contrôle physiologique</h4>
                <p style={{ fontSize: '0.9rem' }}>4 secondes d'inspiration pour capter l'énergie, 2 secondes de rétention pour se stabiliser, et 4 secondes d'expiration pour tout relâcher.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(157, 127, 254, 0.1)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Timer size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>Séance express de 60s</h4>
                <p style={{ fontSize: '0.9rem' }}>Pas besoin d'avoir des heures devant soi. Une seule minute de recentrage suffit à calmer ton système nerveux sympathique et à retrouver ta sérénité.</p>
              </div>
            </div>
          </div>

          <InteractiveMeditation />
        </div>
      </section>

      {/* ==========================================
          MASCOT STAGING HERO LAYOUT
          ========================================== */}
      <section className="section-padding" style={{ background: '#0a0711', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="glass-panel glowing-primary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 40px', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient vector highlights for mascot */}
            <div style={{ position: 'absolute', width: 240, height: 240, background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.15, top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }} />

            <div className="badge badge-primary" style={{ zIndex: 1 }}>Rencontre ta nouvelle mascotte</div>
            <h2 id="mascot-section-title" style={{ textAlign: 'center', zIndex: 1, marginBottom: 12 }}>Un compagnon qui grandit avec toi</h2>
            <p style={{ textAlign: 'center', zIndex: 1, maxWidth: 580, marginBottom: 40 }}>
              Toujours présent dans le coin inférieur de ton écran, ton compagnon réagit à tes écrits et anime ses états pour exprimer ses émotions.
            </p>

            <div className="grid-3" id="mascot-states-gallery" style={{ zIndex: 1, width: '100%', gap: 30 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-m)', padding: '24px 16px' }}>
                <div style={{ width: 100, height: 100, marginBottom: 20 }}>
                  <img src="/assets/mascotte.png" alt="Mascotte Yeux Ouverts" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>État d'écoute (Actif)</h4>
                <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Observe, réagit aux mots-clés et t'encourage avec un regard doux.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-m)', padding: '24px 16px' }}>
                <div style={{ width: 100, height: 100, marginBottom: 20 }}>
                  <img src="/assets/mascotte_eyes_closed.png" alt="Mascotte Yeux Fermés" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Méditation (Paisible)</h4>
                <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Ferme les yeux en synchro avec ton souffle pour t'inviter au relâchement total.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-m)', padding: '24px 16px' }}>
                <div style={{ width: 100, height: 100, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/assets/mascotte.png" alt="Mascotte Heureuse" style={{ width: '90%', height: '90%', objectFit: 'contain', filter: 'drop-shadow(0 0 12px var(--primary-glow))' }} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Célébration (Joie)</h4>
                <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Fête les quêtes réussies sous des pluies de confettis virtuels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          DOWNLOAD STORE CONVERSION SECTION
          ========================================== */}
      <section className="section-padding" id="download">
        <div className="container">
          <div className="download-cta-section" id="download-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '60px 24px' }}>
            <h2 style={{ fontSize: '2.4rem', marginBottom: 16 }}>Prêt à te faire accompagner ?</h2>
            <p style={{ marginBottom: 32, fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: 580, lineHeight: 1.6 }}>
              Rejoins des milliers de jeunes qui utilisent Elyrii pour briser leur isolement, prendre soin de leur santé mentale et progresser pas à pas dans leur quotidien. Télécharge l'application gratuite dès maintenant.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }} id="store-buttons-container">
              <a href="#" className="btn btn-primary" style={{ background: '#000', border: '1px solid var(--border-light)', boxShadow: 'none' }}>
                <Smartphone size={16} style={{ marginRight: 6 }} /> App Store
              </a>
              <a href="#" className="btn btn-primary" style={{ background: '#000', border: '1px solid var(--border-light)', boxShadow: 'none' }}>
                <Smartphone size={16} style={{ marginRight: 6 }} /> Google Play
              </a>
            </div>

            <div style={{ display: 'flex', gap: 24, fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div>⭐ 4.9/5 sur les stores</div>
              <div>👥 Chiffrement de bout en bout</div>
              <div>📱 Gratuit & sans publicités</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER SECTION
          ========================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ gridColumn: window.innerWidth > 1024 ? 'span 2' : 'span 1' }}>
              <div className="logo-container" style={{ marginBottom: 16 }}>
                <img src="/assets/icon.png" alt="Elyrii" className="logo-img" />
                <span className="logo-text">Elyrii</span>
              </div>
              <p style={{ fontSize: '0.9rem', maxWidth: 360, marginBottom: 20 }}>
                Un espace bienveillant et sécurisé conçu par des étudiants master EPITECH pour aider la jeunesse à surmonter l'anxiété et l'isolement social.
              </p>
            </div>

            <div className="footer-col">
              <h4>Fonctionnalités</h4>
              <ul>
                <li><a href="#chat" onClick={(e) => { e.preventDefault(); scrollToSection('chat'); }}>Compagnon IA</a></li>
                <li><a href="#journal" onClick={(e) => { e.preventDefault(); scrollToSection('journal'); }}>Journal d'humeur</a></li>
                <li><a href="#quests" onClick={(e) => { e.preventDefault(); scrollToSection('quests'); }}>Défis quotidiens</a></li>
                <li><a href="#meditation" onClick={(e) => { e.preventDefault(); scrollToSection('meditation'); }}>Relaxation guidée</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Légal & Éthique</h4>
              <ul>
                <li><a href="#">Confidentialité</a></li>
                <li><a href="#">Conditions</a></li>
                <li><a href="#">Conformité RGPD</a></li>
                <li><a href="#">Charte Éthique IA</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Elyrii. Tous droits réservés. Projet Epitech PGE Master - EIP.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
