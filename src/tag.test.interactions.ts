import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTag from './tag.js';

it('removes itself on click', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.click();

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('does not remove itself on click when disabled', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" disabled removable></glide-core-tag>`,
  );

  component.click();

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-tag') instanceof GlideCoreTag).to.be
    .true;
});

it('removes itself on Space', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('removes itself on Enter', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.focus();
  await sendKeys({ press: 'Enter' });

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-tag')).to.be.null;
});
