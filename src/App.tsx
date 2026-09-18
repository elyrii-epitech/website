import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  ChevronRight,
  Download,
  HeartPulse,
  Instagram,
  LockKeyhole,
  Menu,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Trophy,
  Waves,
  X,
} from 'lucide-react';
import InteractiveChat from './components/InteractiveChat';
import InteractiveJournal from './components/InteractiveJournal';
import InteractiveMeditation from './components/InteractiveMeditation';
import InteractiveQuests from './components/InteractiveQuests';
import LivingBackground from './components/LivingBackground';
import MagneticButton from './components/MagneticButton';
import MascotModel from './components/MascotModel';
import ParallaxLayer from './components/ParallaxLayer';
import Reveal from './components/Reveal';
import ScrollProgress from './components/ScrollProgress';
import SpotlightCard from './components/SpotlightCard';
import Stagger, { staggerItem } from './components/Stagger';
import { assetUrl } from './lib/asset';

const promiseCards = [
  { value: 'Parle', label: 'quand tu as besoin de poser ce que tu ressens' },
  { value: 'Écris', label: 'pour comprendre tes journées sans te juger' },
  { value: 'Respire', label: 'avec des exercices courts quand ça monte' },
];

const benefits = [
  {
    icon: MessageCircle,
    title: 'Un espace pour parler',
    copy: 'Quand tu n’as pas les mots, Elyrii t’aide à commencer la conversation avec douceur.',
  },
  {
    icon: BookOpenText,
    title: 'Un journal qui t’accompagne',
    copy: 'Tu notes ton humeur, tes pensées et les petits moments qui comptent, sans pression.',
  },
  {
    icon: Trophy,
    title: 'Des défis simples',
    copy: 'Des actions courtes pour reprendre de l’élan: écrire, respirer, sortir, contacter quelqu’un.',
  },
  {
    icon: HeartPulse,
    title: 'Un rituel de calme',
    copy: 'Une minute de respiration guidée pour ralentir, revenir au présent et continuer ta journée.',
  },
];

const steps = [
  {
    title: 'Dis ce que tu ressens',
    tag: 'Expression libre',
    copy: 'Choisis ton humeur ou commence une discussion. Elyrii t’aide à mettre de l’ordre dans ce qui est flou, à ton propre rythme.',
  },
  {
    title: 'Transforme en petit geste',
    tag: 'Action réaliste',
    copy: 'L’app te propose une action réaliste et déculpabilisante, adaptée à ton état, pas une injonction impossible à tenir.',
  },
  {
    title: 'Garde une trace',
    tag: 'Progression sereine',
    copy: 'Tu vois ce qui t’aide vraiment, jour après jour, avec une progression douce sans aucune pression de streak.',
  },
];

const trustItems = [
  {
    icon: LockKeyhole,
    title: 'Tes pensées restent privées',
    copy: 'Elyrii est pensé pour accueillir des moments personnels avec respect et discrétion.',
  },
  {
    icon: ShieldCheck,
    title: 'Pas de bruit inutile',
    copy: 'Pas de fil infini, pas de publicité, pas de mécanique agressive pour te garder captif.',
  },
  {
    icon: BadgeCheck,
    title: 'Une app faite pour durer',
    copy: 'Des rituels courts, beaux et faciles à reprendre, même après une période difficile.',
  },
];
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="site-shell" id="top">
      <LivingBackground />
      <ScrollProgress />

      <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} aria-label="Navigation principale">
        <button className="brand brand--button" type="button" onClick={() => scrollToSection('top')}>
          <img src={assetUrl('assets/logo_app.png')} alt="Elyrii" className="brand__mark" />
          <span>Elyrii</span>
        </button>

        <div className="nav__links">
          <button onClick={() => scrollToSection('why')}>Pourquoi</button>
          <button onClick={() => scrollToSection('features')}>Fonctionnalités</button>
          <button onClick={() => scrollToSection('trust')}>Confiance</button>
        </div>

        <a
          className="nav__join"
          href="https://www.instagram.com/elyrii.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rejoindre Elyrii sur Instagram"
        >
          <Instagram size={15} />
          <span>Instagram</span>
        </a>

        <MagneticButton className="nav__cta" onClick={() => scrollToSection('download')} strength={14}>
          <Download size={16} />
          Télécharger
        </MagneticButton>

        <button
          className="nav__menu"
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-panel">
          <button onClick={() => scrollToSection('why')}>Pourquoi Elyrii</button>
          <button onClick={() => scrollToSection('features')}>Fonctionnalités</button>
          <button onClick={() => scrollToSection('trust')}>Confiance</button>
          <button onClick={() => scrollToSection('download')}>Communauté & Instagram</button>
          <a
            className="mobile-panel__instagram"
            href="https://www.instagram.com/elyrii.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Instagram size={16} />
            <span>@elyrii.app sur Instagram</span>
          </a>
          <button className="mobile-panel__cta" onClick={() => scrollToSection('download')}>Télécharger l’app</button>
        </div>
      )}

      <main>
        <section className="hero hero--saas">
          <div className="hero__copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <Sparkles size={16} />
              Ton compagnon bien-être au quotidien
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            >
              Elyrii
            </motion.h1>

            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
            >
              L'app qui t'aide à parler, écrire, respirer et avancer quand la journée devient lourde.
            </motion.p>

            <motion.p
              className="hero__lead"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
            >
              Un compagnon mobile doux, interactif et toujours disponible pour transformer tes moments difficiles en petits rituels concrets.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.56 }}
            >
              <MagneticButton
                className="button button--primary"
                onClick={() => scrollToSection('download')}
                strength={18}
              >
                Télécharger l'app
                <ArrowRight size={17} />
              </MagneticButton>
              <MagneticButton
                className="button button--quiet"
                onClick={() => scrollToSection('download')}
                strength={14}
              >
                Nous rejoindre
                <ChevronRight size={17} />
              </MagneticButton>
            </motion.div>

            <motion.div
              className="signal-row"
              aria-label="Promesse Elyrii"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.72 } },
              }}
            >
              {promiseCards.map((signal) => (
                <motion.div
                  className="signal spotlight-signal"
                  key={signal.value}
                  variants={staggerItem}
                >
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <ParallaxLayer className="hero__stage" speed={-20}>
            <motion.div
              className="hero__giant-mascot-stage"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <MascotModel
                interactive
                followCursor={true}
                cameraY={0.02}
                cameraDistance={4.8}
                scaleFactor={0.88}
                className="hero__mascot-giant"
                ariaLabel="Mascotte 3D Elyrii"
              />
            </motion.div>
          </ParallaxLayer>
        </section>

        <section className="section section--tight" id="why">
          <Reveal className="section__heading section__heading--split">
            <div>
              <p className="eyebrow">Pourquoi Elyrii</p>
              <h2>Pour les moments où tu ne sais pas par où commencer.</h2>
            </div>
            <p>
              Elyrii ne te demande pas d'aller bien tout de suite. L'app t'aide à faire une seule chose simple: poser ce que tu ressens, puis avancer d'un petit pas.
            </p>
          </Reveal>

          <Stagger className="benefit-grid" stagger={0.12}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.article variants={staggerItem} key={benefit.title}>
                  <SpotlightCard className="benefit-card" tiltStrength={5}>
                    <Icon size={23} />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.copy}</p>
                  </SpotlightCard>
                </motion.article>
              );
            })}
          </Stagger>
        </section>

        <section className="section steps-section">
          <Reveal className="section__heading">
            <p className="eyebrow">Simple à utiliser</p>
            <h2>Un rituel en trois temps.</h2>
            <p>Pas besoin d'un long onboarding. Elyrii se comprend en quelques secondes et revient avec toi chaque jour.</p>
          </Reveal>

          <Stagger className="steps-grid" stagger={0.14}>
            {steps.map((step, index) => (
              <motion.article variants={staggerItem} key={step.title}>
                <SpotlightCard className="step-card" tiltStrength={8} spotlightColor="rgba(169, 154, 240, 0.22)">
                  <div className="step-card__top">
                    <span className="step-card__number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="step-card__tag">{step.tag}</span>
                  </div>
                  <div className="step-card__body">
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </SpotlightCard>
              </motion.article>
            ))}
          </Stagger>
        </section>

        <section className="section interactive-section" id="features">
          <Reveal className="section__heading">
            <p className="eyebrow">Dans l'app</p>
            <h2>Tout ce qu'il faut pour retrouver un peu d'air.</h2>
            <p>Une expérience bienveillante conçue pour déculpabiliser, apaiser et avancer à ton propre rythme.</p>
          </Reveal>

          <Reveal className="showcase showcase--chat">
            <div className="showcase__copy">
              <p className="eyebrow">
                <MessageCircle size={16} />
                Coach & Écoute Empathique
              </p>
              <h3>Parle sans préparer tes phrases.</h3>
              <p>
                Elyrii accueille tes ressentis sans jugement. Un échange bienveillant en deux temps : accueillir ce qui pèse, puis proposer un micro-geste concret adapté à ton énergie du moment.
              </p>
            </div>
            <ParallaxLayer speed={-28}>
              <InteractiveChat />
            </ParallaxLayer>
          </Reveal>

          <Reveal className="showcase showcase--reverse">
            <ParallaxLayer speed={-28}>
              <InteractiveJournal />
            </ParallaxLayer>
            <div className="showcase__copy">
              <p className="eyebrow">
                <BookOpenText size={16} />
                Espace de Réflexion
              </p>
              <h3>Dénoue ce qui pèse, à ton rythme.</h3>
              <p>
                Suis ta météo intérieure sans tabou, laisse-toi guider par des amorces d'écriture bienveillantes inspirées du Coach, et garde une trace sereine de tes journées.
              </p>
            </div>
          </Reveal>

          <Reveal className="showcase">
            <div className="showcase__copy">
              <p className="eyebrow">
                <Trophy size={16} />
                Le Jardin Intérieur
              </p>
              <h3>Le Coach sème, le Jardin fleurit.</h3>
              <p>
                Zéro streak anxiogène ni calcul punitif. Des défis quotidiens sur mesure qui arrosent ton jardin intérieur et célèbrent chaque petite victoire par un éveil botanique.
              </p>
            </div>
            <ParallaxLayer speed={-28}>
              <InteractiveQuests />
            </ParallaxLayer>
          </Reveal>

          <Reveal className="showcase showcase--reverse">
            <ParallaxLayer speed={-28}>
              <InteractiveMeditation />
            </ParallaxLayer>
            <div className="showcase__copy">
              <p className="eyebrow">
                <Waves size={16} />
                Sanctuaire du Souffle
              </p>
              <h3>5 respirations thérapeutiques guidées.</h3>
              <p>
                Équilibre cardiaque (5-5), Sommeil réparateur (4-7-8), Focus immédiat (4-4), Détente abdominale (4-2-6) ou Énergie douce (6-6) : choisis ton intention et respire en harmonie avec Elyrii.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="section trust-section" id="trust">
          <Reveal className="section__heading section__heading--split">
            <div>
              <p className="eyebrow">Confiance</p>
              <h2>Une app douce, pas une machine à notifications.</h2>
            </div>
            <p>
              Elyrii est pensée pour être utile dans les moments sensibles: claire, discrète, sans pression et centrée sur ton rythme.
            </p>
          </Reveal>

          <Stagger className="trust-grid" stagger={0.12}>
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article variants={staggerItem} key={item.title}>
                  <SpotlightCard className="trust-card" tiltStrength={5} spotlightColor="rgba(168, 213, 186, 0.16)">
                    <Icon size={22} />
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </SpotlightCard>
                </motion.article>
              );
            })}
          </Stagger>
        </section>

        <section className="section final-hub-section" id="download">
          <Reveal>
            <div className="final-hub-card">
              <div className="final-hub-copy">
                <p className="eyebrow">
                  <Sparkles size={16} />
                  Ton rituel commence ici
                </p>
                <h2>Retrouve ton calme dès ce soir.</h2>
                <p>
                  Installe Elyrii pour parler, écrire et respirer à ton rythme. Rejoins aussi notre communauté sur Instagram pour échanger directement avec nous en message privé.
                </p>

                <div className="final-hub-actions">
                  <div className="store-row">
                    <MagneticButton className="store-button" ariaLabel="Télécharger Elyrii sur App Store" strength={12}>
                      <Moon size={18} />
                      <span>
                        <small>Télécharger sur</small>
                        App Store
                      </span>
                    </MagneticButton>
                    <MagneticButton className="store-button" ariaLabel="Télécharger Elyrii sur Google Play" strength={12}>
                      <Download size={18} />
                      <span>
                        <small>Télécharger sur</small>
                        Google Play
                      </span>
                    </MagneticButton>
                  </div>

                  <a
                    href="https://www.instagram.com/elyrii.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="final-hub-instagram"
                    aria-label="Rejoindre la communauté Elyrii sur Instagram"
                  >
                    <Instagram size={20} className="final-hub-instagram-icon" />
                    <div className="final-hub-instagram-text">
                      <small>Communauté officielle</small>
                      <strong>Écris-nous en DM sur @elyrii.app</strong>
                    </div>
                    <ArrowRight size={16} className="final-hub-arrow" />
                  </a>
                </div>
              </div>

              <div className="final-hub-mascot">
                <MascotModel
                  cameraDistance={4.9}
                  cameraY={0.06}
                  scaleFactor={0.92}
                  currentAnimation="breathe"
                  ariaLabel="Mascotte 3D Elyrii"
                />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="brand">
          <img src={assetUrl('assets/logo_app.png')} alt="Elyrii" className="brand__mark" />
          <span>Elyrii</span>
        </div>
        <div className="footer__meta">
          <p>Un compagnon mobile pour parler, écrire et respirer.</p>
          <div className="footer__links">
            <a
              href="https://www.instagram.com/elyrii.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__instagram-link"
            >
              <Instagram size={15} />
              <span>@elyrii.app</span>
            </a>
            <span className="footer__sep">·</span>
            <a href={assetUrl('privacy.html')}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
