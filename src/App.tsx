import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  ChevronRight,
  Download,
  Flame,
  HeartPulse,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
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

const sliderItems = [
  {
    mood: 'Tendu',
    kicker: 'Rituel proposé',
    title: 'Écrire trois lignes sur ce qui a pesé aujourd’hui.',
    primaryMetric: '7 jours',
    primaryLabel: 'de continuité',
    secondaryMetric: '4 min',
    secondaryLabel: 'pour souffler',
  },
  {
    mood: 'Fatigué',
    kicker: 'Pause courte',
    title: 'Lancer une respiration guidée avant de reprendre le fil.',
    primaryMetric: '60 sec',
    primaryLabel: 'pour ralentir',
    secondaryMetric: '1 geste',
    secondaryLabel: 'à faire maintenant',
  },
  {
    mood: 'Stable',
    kicker: 'Petit progrès',
    title: 'Valider une action douce et garder la trace de ce qui aide.',
    primaryMetric: '+40 XP',
    primaryLabel: 'sans pression',
    secondaryMetric: '3 notes',
    secondaryLabel: 'dans le journal',
  },
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
    copy: 'Choisis ton humeur ou commence une discussion. Elyrii t’aide à mettre de l’ordre dans ce qui est flou.',
  },
  {
    title: 'Transforme en petit geste',
    copy: 'L’app te propose une action réaliste, pas une injonction impossible à tenir.',
  },
  {
    title: 'Garde une trace',
    copy: 'Tu vois ce qui t’aide vraiment, jour après jour, avec une progression douce.',
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const activeSliderItem = sliderItems[activeSlide];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPreviewVisible(entry.isIntersecting),
      { threshold: 0.28 },
    );
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPreviewVisible) return undefined;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderItems.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [isPreviewVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <LivingBackground />
      <ScrollProgress />

      <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} aria-label="Navigation principale">
        <a className="brand" href="#top" onClick={() => setMobileMenuOpen(false)}>
          <img src={assetUrl('assets/icon.png')} alt="Elyrii" className="brand__mark" />
          <span>Elyrii</span>
        </a>

        <div className="nav__links">
          <button onClick={() => scrollToSection('why')}>Pourquoi</button>
          <button onClick={() => scrollToSection('features')}>Fonctionnalités</button>
          <button onClick={() => scrollToSection('trust')}>Confiance</button>
        </div>

        <button className="nav__join" onClick={() => scrollToSection('join')}>
          <UsersRound size={16} />
          Nous rejoindre
        </button>

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
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-panel">
          <button onClick={() => scrollToSection('why')}>Pourquoi Elyrii</button>
          <button onClick={() => scrollToSection('features')}>Fonctionnalités</button>
          <button onClick={() => scrollToSection('trust')}>Confiance</button>
          <button onClick={() => scrollToSection('join')}>Nous rejoindre</button>
          <button className="mobile-panel__cta" onClick={() => scrollToSection('download')}>Télécharger l’app</button>
        </div>
      )}

      <main id="top">
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
                onClick={() => scrollToSection('join')}
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

          <ParallaxLayer className="hero__stage" speed={-40}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <div className="phone-showcase" id="preview" ref={previewRef}>
              <div className="phone-showcase__top">
                <div>
                  <span className="mini-label">Ce soir</span>
                  <h2>Bonsoir</h2>
                </div>
                <div className="phone-presence phone-presence--glb" aria-hidden="true">
                  <MascotModel />
                </div>
              </div>

              <div className="mood-strip" aria-label="Sélecteur d’humeur">
                {['Calme', 'Tendu', 'Fatigué', 'Stable'].map((mood) => (
                  <span className={mood === activeSliderItem.mood ? 'is-active' : ''} key={mood}>
                    {mood}
                  </span>
                ))}
              </div>

              <div className="ritual-slider" aria-label="Aperçu des rituels Elyrii">
                <div className="ritual-slider__track" style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}>
                  {sliderItems.map((item, index) => (
                    <article className={`daily-card ritual-slide ${index === activeSlide ? 'is-active' : ''}`} key={item.title}>
                      <div>
                        <span className="mini-label">{item.kicker}</span>
                        <p>{item.title}</p>
                      </div>
                      <ChevronRight size={20} />
                    </article>
                  ))}
                </div>
              </div>

              <div className="slider-dots" aria-label="Contrôles du slider">
                {sliderItems.map((item, index) => (
                  <button
                    key={item.title}
                    className={index === activeSlide ? 'is-active' : ''}
                    type="button"
                    aria-label={`Afficher ${item.kicker}`}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>

              <div className="screen-grid">
                <div key={`primary-${activeSlide}`}>
                  <Flame size={18} />
                  <strong>{activeSliderItem.primaryMetric}</strong>
                  <span>{activeSliderItem.primaryLabel}</span>
                </div>
                <div key={`secondary-${activeSlide}`}>
                  <HeartPulse size={18} />
                  <strong>{activeSliderItem.secondaryMetric}</strong>
                  <span>{activeSliderItem.secondaryLabel}</span>
                </div>
              </div>
            </div>
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
                <SpotlightCard className="step-card" tiltStrength={6} spotlightColor="rgba(255, 181, 168, 0.16)">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </SpotlightCard>
              </motion.article>
            ))}
          </Stagger>
        </section>

        <section className="section interactive-section" id="features">
          <Reveal className="section__heading">
            <p className="eyebrow">Dans l'app</p>
            <h2>Tout ce qu'il faut pour retrouver un peu d'air.</h2>
            <p>Les fonctionnalités principales sont montrées comme elles doivent être ressenties: simples, utiles, rassurantes.</p>
          </Reveal>

          <Reveal className="showcase showcase--chat">
            <div className="showcase__copy">
              <p className="eyebrow">
                <MessageCircle size={16} />
                Discussion
              </p>
              <h3>Parle sans préparer tes phrases.</h3>
              <p>Elyrii accueille tes messages, t'aide à clarifier ce qui se passe et te propose un prochain geste doux.</p>
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
                Journal
              </p>
              <h3>Garde une trace de ce qui compte.</h3>
              <p>Tu notes ton humeur, tu écris quelques lignes, et tu construis une mémoire plus claire de tes journées.</p>
            </div>
          </Reveal>

          <Reveal className="showcase">
            <div className="showcase__copy">
              <p className="eyebrow">
                <Trophy size={16} />
                Défis
              </p>
              <h3>Transforme le mieux-être en petites actions.</h3>
              <p>Des défis courts t'aident à reprendre une dynamique sans pression ni comparaison.</p>
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
                Respiration
              </p>
              <h3>Reviens au calme en une minute.</h3>
              <p>Une bulle de respiration te guide quand le stress monte et que tu as besoin de ralentir.</p>
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

        <section className="section join-section" id="join">
          <Reveal>
            <div className="join-panel">
              <div className="join-panel__copy">
                <p className="eyebrow">
                  <UsersRound size={16} />
                  Nous rejoindre
                </p>
                <h2>Construis la suite d'Elyrii avec nous.</h2>
                <p>
                  Tu peux rejoindre la liste beta, proposer un partenariat ou contacter l'équipe. Les accès arrivent progressivement.
                </p>
              </div>

              <Stagger className="join-actions" aria-label="Contacts Elyrii" stagger={0.1}>
                <motion.button type="button" className="join-action" variants={staggerItem}>
                  <Mail size={18} />
                  <span>
                    <small>Contact</small>
                    hello@elyrii.app
                  </span>
                </motion.button>
                <motion.button type="button" className="join-action" variants={staggerItem}>
                  <UsersRound size={18} />
                  <span>
                    <small>Beta privée</small>
                    Rejoindre la liste
                  </span>
                </motion.button>
                <motion.button type="button" className="join-action join-action--accent" variants={staggerItem}>
                  <Send size={18} />
                  <span>
                    <small>Partenariats</small>
                    partner@elyrii.app
                  </span>
                </motion.button>
              </Stagger>
            </div>
          </Reveal>
        </section>

        <section className="download" id="download">
          <Reveal className="download__content">
            <p className="eyebrow">
              <BadgeCheck size={16} />
              Télécharger Elyrii
            </p>
            <h2>Commence par un petit rituel ce soir.</h2>
            <p>
              Installe Elyrii et garde un compagnon calme dans ta poche pour parler, écrire, respirer et avancer à ton rythme.
            </p>
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
          </Reveal>
          <ParallaxLayer className="download-mascot-model" speed={30}>
            <MascotModel />
          </ParallaxLayer>
        </section>
      </main>

      <footer className="footer">
        <div className="brand">
          <img src={assetUrl('assets/icon.png')} alt="Elyrii" className="brand__mark" />
          <span>Elyrii</span>
        </div>
        <p>Un compagnon mobile pour parler, écrire, respirer et avancer à ton rythme.</p>
      </footer>
    </div>
  );
}
