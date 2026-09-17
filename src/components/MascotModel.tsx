import { useEffect, useRef } from 'react';
import type { AnimationAction, AnimationMixer, Mesh, Object3D } from 'three';
import { assetUrl } from '../lib/asset';

const MODEL_URL = assetUrl('assets/elyrii_velours_animations.glb');

const ONCE_ANIMATIONS: Record<string, true> = {
  greet: true,
  celebrate: true,
  curious: true,
  cozy: true,
  acknowledge: true,
  reassure: true,
  delight: true,
  nuzzle: true,
  proud: true,
  stretch: true,
  settle: true,
  invite: true,
};

export interface MascotModelProps {
  interactive?: boolean;
  triggerWave?: number;
  onWaveTriggered?: () => void;
  className?: string;
  ariaLabel?: string;
  cameraY?: number;
  cameraDistance?: number;
  currentAnimation?: string;
  theme?: 'nature' | 'cosmic' | 'panda' | 'noel' | 'halloween';
  followCursor?: boolean;
  scaleFactor?: number;
}

export default function MascotModel({
  interactive = true,
  triggerWave = 0,
  onWaveTriggered,
  className = '',
  ariaLabel = 'Mascotte 3D Elyrii',
  cameraY = 0.08,
  cameraDistance = 4.8,
  currentAnimation = 'idle',
  theme = 'nature',
  followCursor = false,
  scaleFactor = 1,
}: MascotModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playClipRef = useRef<((name: string) => void) | null>(null);

  useEffect(() => {
    if (triggerWave > 0) {
      playClipRef.current?.('greet');
    }
  }, [triggerWave]);

  useEffect(() => {
    if (currentAnimation) {
      playClipRef.current?.(currentAnimation);
    }
  }, [currentAnimation]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let disposed = false;
    let cleanupScene: (() => void) | null = null;

    const setupScene = async () => {
      const [THREE, { GLTFLoader }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
      ]);

      if (disposed) return;

      let mixer: AnimationMixer | null = null;
      let model: Object3D | null = null;
      let headNode: Object3D | null = null;
      const actionsMap: Record<string, AnimationAction> = {};
      let activeAction: AnimationAction | null = null;
      let isPlayingOnce = false;

      let targetPointerX = 0;
      let targetPointerY = 0;
      let currentPointerX = 0;
      let currentPointerY = 0;
      const baseRotationY = 0.02;
      const lookEuler = new THREE.Euler(0, 0, 0, 'YXZ');
      const lookQuat = new THREE.Quaternion();

      const onPointerMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        targetPointerX = Math.max(-1, Math.min(1, nx));
        targetPointerY = Math.max(-1, Math.min(1, ny));
      };

      if (followCursor) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
      }
      const scene = new THREE.Scene();
      // Cadrage caméra en pleine vue pour révéler la silhouette complète d'Elyrii (tête, ventre, pattes)
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(0, cameraY, cameraDistance);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.style.pointerEvents = 'none';
      container.appendChild(renderer.domElement);

      // Éclairage studio rassurant inspiré de la santé mentale :
      // Ambiance douce chaude
      scene.add(new THREE.HemisphereLight(0xfff8f0, 0x1d1a24, 2.6));

      // Key light : studio lavande apaisante
      const keyLight = new THREE.DirectionalLight(0xb4a4f8, 2.3);
      keyLight.position.set(3.4, 4.2, 4.0);
      scene.add(keyLight);

      // Rim light : contre-jour pêche chaleureuse pour le velours
      const rimLight = new THREE.DirectionalLight(0xffbfa8, 1.8);
      rimLight.position.set(-3.2, 2.4, -2.5);
      scene.add(rimLight);

      // Bounce light : menthe douce régénératrice
      const bounceLight = new THREE.DirectionalLight(0xa8d5ba, 0.9);
      bounceLight.position.set(-2.0, -1.0, 2.0);
      scene.add(bounceLight);

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        const nextWidth = Math.max(1, Math.floor(width));
        const nextHeight = Math.max(1, Math.floor(height));
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(nextWidth, nextHeight, false);
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const loader = new GLTFLoader();
      loader.load(
        MODEL_URL,
        (gltf) => {
          if (disposed) return;

          model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDimension = Math.max(size.x, size.y, size.z) || 1;

          // Centrage rigoureux et mise à l'échelle pour vision en pied complète sans clipping
          model.position.sub(center);
          model.scale.setScalar((2.05 * scaleFactor) / maxDimension);
          // Posture engagée : tournée chaleureusement vers l'utilisateur
          model.rotation.set(0.02, baseRotationY, 0);
          headNode = model.getObjectByName('CTRL_head') ?? null;

          model.traverse((child) => {
            if ((child as Mesh).isMesh) {
              (child as Mesh).frustumCulled = true;
            }
          });

          scene.add(model);
          // Bibliothèque native de la mascotte : 16 animations émotionnelles canoniques
          mixer = new THREE.AnimationMixer(model);
          const clips = gltf.animations;

          clips.forEach((clip) => {
            if (!mixer) return;
            const action = mixer.clipAction(clip);
            const isOnce = Boolean(ONCE_ANIMATIONS[clip.name.toLowerCase()]);
            if (isOnce) {
              action.setLoop(THREE.LoopOnce, 1);
              action.clampWhenFinished = true;
            }
            actionsMap[clip.name.toLowerCase()] = action;
          });

          const idleAction = actionsMap.idle;
          if (idleAction) {
            idleAction.reset();
            idleAction.fadeIn(0.3);
            idleAction.play();
            activeAction = idleAction;
          }

          const playClip = (rawName: string) => {
            if (!mixer || isPlayingOnce) return;
            const name = rawName.toLowerCase();
            const target = actionsMap[name];
            if (!target || target === activeAction) return;

            const isOnce = Boolean(ONCE_ANIMATIONS[name]);
            target.reset();

            if (activeAction) {
              activeAction.crossFadeTo(target, 0.28, true);
            }
            target.play();

            if (isOnce) {
              isPlayingOnce = true;
              if (name === 'greet') onWaveTriggered?.();

              const onFinished = (event: { action: unknown }) => {
                if (event.action === target) {
                  mixer?.removeEventListener('finished', onFinished);
                  isPlayingOnce = false;
                  if (idleAction) {
                    target.crossFadeTo(idleAction, 0.35, true);
                    idleAction.reset().play();
                    activeAction = idleAction;
                  }
                }
              };
              mixer.addEventListener('finished', onFinished);
            } else {
              activeAction = target;
            }
          };

          playClipRef.current = playClip;
        },
        undefined,
        () => undefined,
      );

      const clock = new THREE.Clock();
      const tick = () => {
        const delta = clock.getDelta();
        mixer?.update(delta);

        if (followCursor && model) {
          // Interpolation douce vers la position du curseur
          currentPointerX += (targetPointerX - currentPointerX) * 0.06;
          currentPointerY += (targetPointerY - currentPointerY) * 0.06;

          // Le corps reste stable et posé : légère orientation subtile sans rotation en rond
          model.rotation.y = baseRotationY + currentPointerX * 0.08;
          model.rotation.x = 0;

          // La tête suit le curseur : haut/bas direct et gauche/droite direct
          if (headNode) {
            lookEuler.set(
              currentPointerY * 0.38,
              currentPointerX * 0.5,
              0
            );
            lookQuat.setFromEuler(lookEuler);
            headNode.quaternion.multiply(lookQuat);
          }
        }
        renderer.render(scene, camera);
      };

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          clock.getDelta(); // reset clock delta to avoid sudden time leaps
          renderer.setAnimationLoop(tick);
        } else {
          renderer.setAnimationLoop(null);
        }
      }, { threshold: 0.02 });

      intersectionObserver.observe(container);

      cleanupScene = () => {
        if (followCursor) {
          window.removeEventListener('pointermove', onPointerMove);
        }
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        renderer.setAnimationLoop(null);
        playClipRef.current = null;
        mixer?.stopAllAction();
        if (model) {
          scene.remove(model);
          model.traverse((child) => {
            if ((child as Mesh).isMesh) {
              const mesh = child as Mesh;
              mesh.geometry?.dispose();
              const material = mesh.material;
              if (Array.isArray(material)) {
                material.forEach((item) => item.dispose());
              } else {
                material?.dispose();
              }
            }
          });
        }

        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    setupScene().catch(() => undefined);

    return () => {
      disposed = true;
      cleanupScene?.();
    };
  }, []);

  const themeClass = theme !== 'nature' ? `mascot-theme--${theme}` : '';

  return (
    <div
      className={`mascot-model ${interactive ? 'mascot-model--interactive' : ''} ${themeClass} ${className}`}
      ref={containerRef}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${ariaLabel} (Clique pour saluer Elyrii)` : ariaLabel}
      onClick={() => {
        if (interactive) {
          playClipRef.current?.('greet');
        }
      }}
      onKeyDown={(event) => {
        if (interactive && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          playClipRef.current?.('greet');
        }
      }}
    />
  );
}
