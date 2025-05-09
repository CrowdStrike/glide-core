import { assert, expect, fixture, html, waitUntil } from '@open-wc/testing';
import { emulateMedia, sendKeys } from '@web/test-runner-commands';
import Accordion from './accordion.js';
import { click } from './library/mouse.js';

it('opens when `click()` is called', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<Accordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  host.click();

  expect(host.open).to.be.true;
});

it('opens on click when not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<Accordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  await click(host);

  expect(host.open).to.be.true;
});

it('opens on click when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const host = await fixture<Accordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="summary"]'));

  let animation: Animation | undefined;

  // Accordion animates opening when clicked. We wait for the animation
  // to complete before running assertions.
  await waitUntil(() => {
    animation = host.shadowRoot
      ?.querySelector('[data-test="default-slot"]')
      ?.getAnimations()
      ?.at(0);

    return animation;
  });

  assert(animation);
  await animation.finished;

  expect(host.open).to.be.true;
});

it('opens on Space', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<Accordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.true;
});

it('opens on Enter', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<Accordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.true;
});

it('closes on click when not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<Accordion>(
    html`<glide-core-accordion label="Label" open>
      Content
    </glide-core-accordion>`,
  );

  await click(host);

  expect(host.open).to.be.false;
});

it('closes on click when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const host = await fixture<Accordion>(
    html`<glide-core-accordion label="Label" open>
      Content
    </glide-core-accordion>`,
  );

  click(host);

  let animation: Animation | undefined;
  let isAnimationFinished = false;

  await waitUntil(() => {
    animation = host.shadowRoot
      ?.querySelector('[data-test="default-slot"]')
      ?.getAnimations()
      ?.at(0);

    return animation;
  });

  animation?.addEventListener('finish', () => {
    isAnimationFinished = true;
  });

  await waitUntil(() => isAnimationFinished);

  expect(host.open).to.be.false;
});
