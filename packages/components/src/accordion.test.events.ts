import './accordion';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import Accordion from './accordion.js';

it('dispatches a "cs-toggle" event when the Accordion opens', async () => {
  let hasToggleBeenCalled = false;

  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"></cs-accordion>`,
  );
  element.addEventListener('cs-toggle', () => (hasToggleBeenCalled = true));

  const summary = element.shadowRoot!.querySelector<HTMLElement>(
    '[data-test="summary"]',
  );
  expect(summary).to.be.ok;

  summary?.click();

  await oneEvent(element, 'cs-toggle');

  expect(hasToggleBeenCalled).to.be.true;
});

it('dispatches a "cs-toggle" event when the Accordion closes', async () => {
  let hasToggleBeenCalled = false;

  const element = await fixture<Accordion>(
    html`<cs-accordion label="label" open></cs-accordion>`,
  );
  element.addEventListener('cs-toggle', () => (hasToggleBeenCalled = true));

  const summary = element.shadowRoot!.querySelector<HTMLElement>(
    '[data-test="summary"]',
  );
  expect(summary).to.be.ok;

  summary?.click();

  await oneEvent(element, 'cs-toggle');

  expect(hasToggleBeenCalled).to.be.true;
});
