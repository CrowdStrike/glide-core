import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTag from './tag.js';

it('removes itself on click', async () => {
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  host.click();

  const animationDuration = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('does not remove itself on click when disabled', async () => {
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" disabled removable></glide-core-tag>`,
  );

  host.click();

  const animationDuration = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-tag') instanceof GlideCoreTag).to.be
    .true;
});

it('removes itself on Space', async () => {
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const animationDuration = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('removes itself on Enter', async () => {
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  const animationDuration = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-tag')).to.be.null;
});
