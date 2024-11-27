/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreInlineAlert from './inline-alert.js';

GlideCoreInlineAlert.shadowRootOptions.mode = 'open';

it('removes itself on removable button click', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.click();

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});

it('removes itself on Space', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  await sendKeys({ press: ' ' });

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});

it('removes itself on Enter', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  await sendKeys({ press: 'Enter' });

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});
