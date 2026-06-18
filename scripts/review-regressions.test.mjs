import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const oneLine = (value) => value.replace(/\s+/g, ' ').trim();

test('SpotlightCard positions its glow without undefined CSS variables', () => {
  const component = source('src/components/SpotlightCard.tsx');

  assert.doesNotMatch(component, /var\(--m[xy]\)/, 'spotlight gradient must not depend on unset --mx/--my variables');
  assert.match(component, /left:\s*spotlightLeft/, 'the glow should keep using the computed horizontal pointer position');
  assert.match(component, /top:\s*spotlightTop/, 'the glow should keep using the computed vertical pointer position');
});

test('ParallaxLayer disables scroll-linked y transforms for reduced-motion users', () => {
  const component = oneLine(source('src/components/ParallaxLayer.tsx'));

  assert.match(component, /useReducedMotion/, 'the component should read prefers-reduced-motion through Framer Motion');
  assert.match(component, /const prefersReducedMotion = useReducedMotion\(\);/);
  assert.match(component, /const y = prefersReducedMotion \? 0 : parallaxY;/);
});

test('LivingBackground only runs the cursor halo loop on useful pointer activity', () => {
  const component = source('src/components/LivingBackground.tsx');
  const onMoveBody = /const onMove = \(event: PointerEvent\) => \{(?<body>[\s\S]*?)^\s*\};/m.exec(component)?.groups?.body ?? '';

  assert.match(component, /PREFERS_FINE_POINTER_QUERY/, 'coarse or no-hover pointers should skip cursor halo work');
  assert.match(component, /HALO_IDLE_TIMEOUT_MS/, 'the halo loop should have an idle stop condition');
  assert.doesNotMatch(
    component,
    /window\.addEventListener\('pointermove', onMove, \{ passive: true \}\);\s*frame\s*=\s*window\.requestAnimationFrame\(tick\);/,
    'the halo loop must not start on mount',
  );
  assert.match(onMoveBody, /ensureHaloFrame\(\)/, 'pointer movement should start the halo loop');
  assert.match(onMoveBody, /scheduleHaloIdleStop\(\)/, 'pointer movement should arm the idle stop');
});
