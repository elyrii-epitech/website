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

test('Mascot look-at does not accumulate on a frozen end-of-clip pose', () => {
  const component = source('src/components/MascotModel.tsx');

  assert.match(component, /mixerHeadQuat/, 'look-at must snapshot the mixer head pose each frame');
  assert.match(component, /headLookApplied/, 'the mixer pose must be restored before the next mixer update');
  assert.match(
    component,
    /headNode\.quaternion\.copy\(mixerHeadQuat\)\.premultiply\(lookQuat\)/,
    'look offset must be applied in parent space from the mixer pose, not stacked on last frame',
  );
  assert.doesNotMatch(
    component,
    /headNode\.quaternion\.multiply\(lookQuat\)/,
    'in-place multiply on the live head quaternion spins the head when the mixer skips a frozen pose',
  );
  assert.match(
    component,
    /idleAction\.reset\(\);\s*target\.crossFadeTo\(idleAction/,
    'idle must be reset before crossFadeTo so the return fade is not cancelled',
  );
  const tickBody = /const tick = \(\) => \{[\s\S]*?\n      \};/.exec(component)?.[0] ?? '';
  const updateAt = tickBody.indexOf('mixer?.update(delta)');
  const sampleAt = tickBody.indexOf('mixerHeadQuat.copy(headNode.quaternion)');
  assert.notEqual(updateAt, -1, 'tick must update the mixer');
  assert.notEqual(sampleAt, -1, 'tick must snapshot CTRL_head after the mixer runs');
  assert.ok(
    updateAt < sampleAt,
    'mixerHeadQuat must be re-sampled after mixer.update so look-at follows animated head motion instead of the clip bind pose',
  );
});
