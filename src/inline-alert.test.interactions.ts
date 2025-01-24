import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreInlineAlert from './inline-alert.js';

it('removes itself on removable button click', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  await click(
    component.shadowRoot?.querySelector('[data-test="removal-button"]'),
  );

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});

it('removes itself on removable button Space', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});

it('removes itself on removable button Enter', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  component.focus();
  await sendKeys({ press: 'Enter' });

  const animationDuration = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});
