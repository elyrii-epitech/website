import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpenText,
  ChevronRight,
  Download,
  HeartPulse,
  Instagram,
  Menu,
  MessageCircle,
  Moon,
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


const plotActors = [
  { name: 'Santé Psy Étudiant', x: 24, y: 28, featured: false },
  { name: 'Togetherall', x: 54, y: 42, featured: false },
  { name: 'ELYRII', x: 70, y: 22, featured: true },
  { name: 'Wysa', x: 64, y: 68, featured: false },
  { name: 'ChatGPT', x: 56, y: 82, featured: false },
] as const;

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
          <button onClick={() => scrollToSection('positioning')}>Positionnement</button>
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
          <button onClick={() => scrollToSection('why')}>Pourquoi</button>
          <button onClick={() => scrollToSection('features')}>Fonctionnalités</button>
          <button onClick={() => scrollToSection('positioning')}>Positionnement</button>
          <button onClick={() => scrollToSection('download')}>Communauté & Téléchargement</button>
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
              <h2>Pour les moments où tu ne sais pas par où commencer</h2>
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

        <section className="section interactive-section" id="features">
          <Reveal className="section__heading">
            <p className="eyebrow">Dans l'app</p>
            <h2>Tout ce qu'il faut pour retrouver un peu d'air</h2>
            <p>Une expérience bienveillante conçue pour déculpabiliser, apaiser et avancer à ton propre rythme.</p>
          </Reveal>

          <Reveal className="showcase showcase--chat">
            <div className="showcase__copy">
              <p className="eyebrow">
                <MessageCircle size={16} />
                Coach & Écoute Empathique
              </p>
              <h3>Parle sans préparer tes phrases</h3>
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
              <h3>Dénoue ce qui pèse, à ton rythme</h3>
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
              <h3>Le Coach sème, le Jardin fleurit</h3>
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
              <h3>5 respirations thérapeutiques guidées</h3>
              <p>
                Équilibre cardiaque (5-5), Sommeil réparateur (4-7-8), Focus immédiat (4-4), Détente abdominale (4-2-6) ou Énergie douce (6-6) : choisis ton intention et respire en harmonie avec Elyrii.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="market-band" id="positioning" aria-labelledby="market-position-title">
          <div className="market-band__inner">
            <div className="market-position">
              <Reveal>
                <p className="eyebrow">
                  <span className="market-band__dash" aria-hidden="true" />
                  Positionnement
                </p>
                <h2 id="market-position-title">Le seul acteur quotidien, étudiant, et connecté au dispositif français</h2>
              </Reveal>
              <Reveal className="market-position__layout">
                <figure className="market-plot">
                  <figcaption id="market-plot-caption" className="visually-hidden">
                    Matrice : axe vertical du généraliste au spécifiquement étudiant, axe horizontal du ponctuel au quotidien. Elyrii est le seul acteur dans le quadrant quotidien et spécifiquement étudiant. Santé Psy Étudiant est ponctuel et étudiant. Togetherall est proche du centre, légèrement quotidien et étudiant. Wysa et ChatGPT sont quotidien et généraliste.
                  </figcaption>
                  <div className="market-plot__grid" aria-labelledby="market-plot-caption">
                    <span className="market-plot__axis market-plot__axis--top">Spécifiquement étudiant</span>
                    <span className="market-plot__axis market-plot__axis--left">Ponctuel</span>
                    <div className="market-plot__frame">
                      <div className="market-plot__cell" />
                      <div className="market-plot__cell market-plot__cell--focus" />
                      <div className="market-plot__cell" />
                      <div className="market-plot__cell" />
                      {plotActors.map((actor) => (
                        <span
                          key={actor.name}
                          className={actor.featured ? 'market-plot__pill market-plot__pill--elyrii' : 'market-plot__pill'}
                          style={{ left: `${actor.x}%`, top: `${actor.y}%` }}
                        >
                          {actor.name}
                        </span>
                      ))}
                    </div>
                    <span className="market-plot__axis market-plot__axis--right">Quotidien</span>
                    <span className="market-plot__axis market-plot__axis--bottom">Généraliste</span>
                  </div>
                </figure>
                <div className="market-position__aside">
                  <div className="market-criterion">
                    <p className="market-criterion__kicker">3e critère</p>
                    <h3>Isolé ↔ Connecté au dispositif national</h3>
                    <p>Elyrii est le seul du bon côté : relais vers le 3114, Santé Psy Étudiant et Nightline.</p>
                  </div>
                  <ul className="market-legend">
                    <li>
                      <span className="market-legend__swatch market-legend__swatch--elyrii" aria-hidden="true" />
                      Quotidien + étudiant + connecté
                    </li>
                    <li>
                      <span className="market-legend__swatch" aria-hidden="true" />
                      Acteurs existants
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section final-hub-section" id="download">
          <Reveal>
            <div className="final-hub-card">
              <div className="final-hub-copy">
                <p className="eyebrow">
                  Ton rituel commence ici
                </p>
                <h2>Retrouve ton calme dès ce soir</h2>
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
