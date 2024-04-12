import './accordion.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import Accordion from './accordion.js';

Accordion.shadowRootOptions.mode = 'open';

it('dispatches a "toggle" event when the Accordion opens', async () => {
  let hasToggleBeenCalled = false;

  const component = await fixture<Accordion>(
    html`<cs-accordion label="label"></cs-accordion>`,
  );
  component.addEventListener('toggle', () => (hasToggleBeenCalled = true));

  const summary = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="summary"]',
  );
  expect(summary).to.be.ok;

  summary?.click();

  await oneEvent(component, 'toggle');

  expect(hasToggleBeenCalled).to.be.true;
});

it('dispatches a "toggle" event when the Accordion closes', async () => {
  let hasToggleBeenCalled = false;

  const component = await fixture<Accordion>(
    html`<cs-accordion label="label" open></cs-accordion>`,
  );
  component.addEventListener('toggle', () => (hasToggleBeenCalled = true));

  const summary = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="summary"]',
  );
  expect(summary).to.be.ok;

  summary?.click();

  await oneEvent(component, 'toggle');

  expect(hasToggleBeenCalled).to.be.true;
});
