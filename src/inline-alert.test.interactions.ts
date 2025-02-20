import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreInlineAlert from './inline-alert.js';

it('removes itself on removable button click', async () => {
  const host = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable>
      Label
    </glide-core-inline-alert>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="removal-button"]'));

  const animationDuration = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});

it('removes itself on removable button Space', async () => {
  const host = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable>
      Label
    </glide-core-inline-alert>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const animationDuration = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});

it('removes itself on removable button Enter', async () => {
  const host = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable>
      Label
    </glide-core-inline-alert>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  const animationDuration = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  )?.dataset.animationDuration;

  await aTimeout(Number(animationDuration));

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});
