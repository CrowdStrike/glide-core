import './accordion.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import Accordion from './accordion.js';

Accordion.shadowRootOptions.mode = 'open';

it('dispatches a "toggle" event when the Accordion opens', async () => {
  let hasToggleBeenCalled = false;

  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"></cs-accordion>`,
  );
  element.addEventListener('toggle', () => (hasToggleBeenCalled = true));

  const summary = element.shadowRoot!.querySelector<HTMLElement>(
    '[data-test="summary"]',
  );
  expect(summary).to.be.ok;

  summary?.click();

  await oneEvent(element, 'toggle');

  expect(hasToggleBeenCalled).to.be.true;
});

it('dispatches a "toggle" event when the Accordion closes', async () => {
  let hasToggleBeenCalled = false;

  const element = await fixture<Accordion>(
    html`<cs-accordion label="label" open></cs-accordion>`,
  );
  element.addEventListener('toggle', () => (hasToggleBeenCalled = true));

  const summary = element.shadowRoot!.querySelector<HTMLElement>(
    '[data-test="summary"]',
  );
  expect(summary).to.be.ok;

  summary?.click();

  await oneEvent(element, 'toggle');

  expect(hasToggleBeenCalled).to.be.true;
});
