/* eslint-disable @typescript-eslint/no-unused-expressions */

import './accordion.js';
import { emulateMedia } from '@web/test-runner-commands';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreAccordion from './accordion.js';
import click from './library/click.js';

GlideCoreAccordion.shadowRootOptions.mode = 'open';

it('can be opened via click', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  component.click();

  expect(component.open).to.be.true;
});

it('can be opened via click when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="summary"]'));

  let animation: Animation | undefined;
  let isAnimationFinished = false;

  await waitUntil(() => {
    animation = component.shadowRoot
      ?.querySelector('[data-test="default-slot"]')
      ?.getAnimations()
      ?.at(0);

    return animation;
  });

  animation?.addEventListener('finish', () => {
    isAnimationFinished = true;
  });

  await waitUntil(() => isAnimationFinished);

  expect(component.open).to.be.true;
});

it('can be opened via Space', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  expect(component.open).to.be.true;
});

it('can be opened via Enter', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  component.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.true;
});

it('can be closed via click', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label" open>
      Content
    </glide-core-accordion>`,
  );

  component.click();

  expect(component.open).to.be.false;
});

it('can be closed via click when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label" open>
      Content
    </glide-core-accordion>`,
  );

  component.click();

  let animation: Animation | undefined;
  let isAnimationFinished = false;

  await waitUntil(() => {
    animation = component.shadowRoot
      ?.querySelector('[data-test="default-slot"]')
      ?.getAnimations()
      ?.at(0);

    return animation;
  });

  animation?.addEventListener('finish', () => {
    isAnimationFinished = true;
  });

  await waitUntil(() => isAnimationFinished);

  expect(component.open).to.be.false;
});
