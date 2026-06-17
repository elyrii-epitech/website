import { useEffect, useRef } from 'react';
import { assetUrl } from '../lib/asset';

const MODEL_URL = assetUrl('assets/elyrii_mascot_idle.glb');

export default function MascotModel() {
  const containerRef = useRef<HTMLDivElement>(null);

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

      let mixer: import('three').AnimationMixer | null = null;
      let model: import('three').Object3D | null = null;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 1.25, 5.2);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.style.pointerEvents = 'none';
      container.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xfaf7f1, 0x27211d, 2.4));

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
      keyLight.position.set(3.2, 4.6, 4.2);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xb9d4c2, 1.2);
      fillLight.position.set(-3, 1.8, 2.4);
      scene.add(fillLight);

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

          model.position.sub(center);
          model.scale.setScalar(2.45 / maxDimension);
          model.rotation.set(0, -0.28, 0);

          model.traverse((child) => {
            if ((child as import('three').Mesh).isMesh) {
              (child as import('three').Mesh).frustumCulled = true;
            }
          });

          scene.add(model);

          const idleClip = gltf.animations.find((clip) => clip.name.toLowerCase() === 'idle') ?? gltf.animations[0];
          if (idleClip) {
            mixer = new THREE.AnimationMixer(model);
            const action = mixer.clipAction(idleClip);
            action.reset();
            action.fadeIn(0.25);
            action.play();
          }
        },
        undefined,
        () => undefined,
      );

      const clock = new THREE.Clock();
      renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();
        mixer?.update(delta);
        renderer.render(scene, camera);
      });

      cleanupScene = () => {
        resizeObserver.disconnect();
        renderer.setAnimationLoop(null);
        mixer?.stopAllAction();

        if (model) {
          scene.remove(model);
          model.traverse((child) => {
            if ((child as import('three').Mesh).isMesh) {
              const mesh = child as import('three').Mesh;
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

  return <div className="mascot-model" ref={containerRef} aria-hidden="true" />;
}
