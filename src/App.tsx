import { useEffect, useRef, useState } from 'react';
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
import MascotModel from './components/MascotModel';
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
      <div className="grain-layer" aria-hidden="true" />
      <div className="ambient-motion" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

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

        <button className="nav__cta" onClick={() => scrollToSection('download')}>
          <Download size={16} />
          Télécharger
        </button>

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
          <div className="hero__copy reveal">
            <p className="eyebrow">
              <Sparkles size={16} />
              Ton compagnon bien-être au quotidien
            </p>
            <h1>Elyrii</h1>
            <p className="hero__tagline">L’app qui t’aide à parler, écrire, respirer et avancer quand la journée devient lourde.</p>
            <p className="hero__lead">
              Un compagnon mobile doux, interactif et toujours disponible pour transformer tes moments difficiles en petits rituels concrets.
            </p>

            <div className="hero__actions">
              <button className="button button--primary" onClick={() => scrollToSection('download')}>
                Télécharger l’app
                <ArrowRight size={17} />
              </button>
              <button className="button button--quiet" onClick={() => scrollToSection('join')}>
                Nous rejoindre
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="signal-row" aria-label="Promesse Elyrii">
              {promiseCards.map((signal) => (
                <div className="signal" key={signal.value}>
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__stage reveal reveal--late" id="preview" ref={previewRef}>
            <div className="phone-showcase">
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

          </div>
        </section>

        <section className="section section--tight" id="why">
          <div className="section__heading section__heading--split">
            <div>
              <p className="eyebrow">Pourquoi Elyrii</p>
              <h2>Pour les moments où tu ne sais pas par où commencer.</h2>
            </div>
            <p>
              Elyrii ne te demande pas d’aller bien tout de suite. L’app t’aide à faire une seule chose simple: poser ce que tu ressens, puis avancer d’un petit pas.
            </p>
          </div>

          <div className="benefit-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article className="benefit-card" key={benefit.title}>
                  <Icon size={23} />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section steps-section">
          <div className="section__heading">
            <p className="eyebrow">Simple à utiliser</p>
            <h2>Un rituel en trois temps.</h2>
            <p>Pas besoin d’un long onboarding. Elyrii se comprend en quelques secondes et revient avec toi chaque jour.</p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <article className="step-card" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section interactive-section" id="features">
          <div className="section__heading">
            <p className="eyebrow">Dans l’app</p>
            <h2>Tout ce qu’il faut pour retrouver un peu d’air.</h2>
            <p>Les fonctionnalités principales sont montrées comme elles doivent être ressenties: simples, utiles, rassurantes.</p>
          </div>

          <div className="showcase showcase--chat">
            <div className="showcase__copy">
              <p className="eyebrow">
                <MessageCircle size={16} />
                Discussion
              </p>
              <h3>Parle sans préparer tes phrases.</h3>
              <p>Elyrii accueille tes messages, t’aide à clarifier ce qui se passe et te propose un prochain geste doux.</p>
            </div>
            <InteractiveChat />
          </div>

          <div className="showcase showcase--reverse">
            <InteractiveJournal />
            <div className="showcase__copy">
              <p className="eyebrow">
                <BookOpenText size={16} />
                Journal
              </p>
              <h3>Garde une trace de ce qui compte.</h3>
              <p>Tu notes ton humeur, tu écris quelques lignes, et tu construis une mémoire plus claire de tes journées.</p>
            </div>
          </div>

          <div className="showcase">
            <div className="showcase__copy">
              <p className="eyebrow">
                <Trophy size={16} />
                Défis
              </p>
              <h3>Transforme le mieux-être en petites actions.</h3>
              <p>Des défis courts t’aident à reprendre une dynamique sans pression ni comparaison.</p>
            </div>
            <InteractiveQuests />
          </div>

          <div className="showcase showcase--reverse">
            <InteractiveMeditation />
            <div className="showcase__copy">
              <p className="eyebrow">
                <Waves size={16} />
                Respiration
              </p>
              <h3>Reviens au calme en une minute.</h3>
              <p>Une bulle de respiration te guide quand le stress monte et que tu as besoin de ralentir.</p>
            </div>
          </div>
        </section>

        <section className="section trust-section" id="trust">
          <div className="section__heading section__heading--split">
            <div>
              <p className="eyebrow">Confiance</p>
              <h2>Une app douce, pas une machine à notifications.</h2>
            </div>
            <p>
              Elyrii est pensée pour être utile dans les moments sensibles: claire, discrète, sans pression et centrée sur ton rythme.
            </p>
          </div>

          <div className="trust-grid">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <article className="trust-card" key={item.title}>
                  <Icon size={22} />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section join-section" id="join">
          <div className="join-panel">
            <div className="join-panel__copy">
              <p className="eyebrow">
                <UsersRound size={16} />
                Nous rejoindre
              </p>
              <h2>Construis la suite d’Elyrii avec nous.</h2>
              <p>
                Tu peux rejoindre la liste beta, proposer un partenariat ou contacter l’équipe. Les accès arrivent progressivement.
              </p>
            </div>

            <div className="join-actions" aria-label="Contacts Elyrii">
              <button type="button" className="join-action">
                <Mail size={18} />
                <span>
                  <small>Contact</small>
                  hello@elyrii.app
                </span>
              </button>
              <button type="button" className="join-action">
                <UsersRound size={18} />
                <span>
                  <small>Beta privée</small>
                  Rejoindre la liste
                </span>
              </button>
              <button type="button" className="join-action join-action--accent">
                <Send size={18} />
                <span>
                  <small>Partenariats</small>
                  partner@elyrii.app
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="download" id="download">
          <div className="download__content">
            <p className="eyebrow">
              <BadgeCheck size={16} />
              Télécharger Elyrii
            </p>
            <h2>Commence par un petit rituel ce soir.</h2>
            <p>
              Installe Elyrii et garde un compagnon calme dans ta poche pour parler, écrire, respirer et avancer à ton rythme.
            </p>
            <div className="store-row">
              <button type="button" className="store-button" aria-label="Télécharger Elyrii sur App Store">
                <Moon size={18} />
                <span>
                  <small>Télécharger sur</small>
                  App Store
                </span>
              </button>
              <button type="button" className="store-button" aria-label="Télécharger Elyrii sur Google Play">
                <Download size={18} />
                <span>
                  <small>Télécharger sur</small>
                  Google Play
                </span>
              </button>
            </div>
          </div>
          <div className="download-mascot-model" aria-hidden="true">
            <MascotModel />
          </div>
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
