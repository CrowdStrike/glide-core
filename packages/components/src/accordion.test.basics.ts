import './accordion.js';
import { expect, fixture, html } from '@open-wc/testing';
import Accordion from './accordion.js';

Accordion.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-accordion')).to.equal(Accordion);
});

it('is closed by default', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"></cs-accordion>`,
  );

  const accordion =
    element.shadowRoot!.querySelector<HTMLDetailsElement>('details');

  expect(accordion).to.be.ok;
  expect(accordion?.hasAttribute('open')).to.be.false;
});

it('defaults to "open" when provided with the attribute', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="label" open></cs-accordion>`,
  );

  const accordion =
    element.shadowRoot!.querySelector<HTMLDetailsElement>('details');

  expect(accordion).to.be.ok;
  expect(accordion?.hasAttribute('open')).to.be.true;
});

it('renders the provided "label"', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="Accordion Title"></cs-accordion>`,
  );

  const label = element.shadowRoot!.querySelector<HTMLSpanElement>(
    '[data-test="label"]',
  );

  expect(label).to.be.ok;
  expect(label?.textContent?.trim()).to.equal('Accordion Title');
});

it('renders the provided default slotted content', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"
      ><p data-body>Inner content</p></cs-accordion
    >`,
  );

  const body = element.querySelector<HTMLParagraphElement>('[data-body]');

  expect(body).to.be.ok;
});

it('renders with a prefix slot and applies the appropriate classes', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"
      ><span slot="prefix" data-prefix>prefix</span></cs-accordion
    >`,
  );

  expect(document.querySelector('[data-prefix]')).to.be.ok;

  expect([
    ...element.shadowRoot!.querySelector('[data-test="label"]')!.classList,
  ]).to.deep.equal(['heading-box', 'heading-box--with-prefix']);

  expect([
    ...element.shadowRoot!.querySelector('[role="region"]')!.classList,
  ]).to.deep.equal(['content', 'content--with-prefix']);
});

it('does not apply prefix classes when no prefix slot is provided', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"></cs-accordion>`,
  );

  expect([
    ...element.shadowRoot!.querySelector('[data-test="label"]')!.classList,
  ]).to.deep.equal(['heading-box']);
  expect([
    ...element.shadowRoot!.querySelector('[role="region"]')!.classList,
  ]).to.deep.equal(['content']);
});

it('renders with a suffix slot and applies the appropriate class', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"
      ><span slot="suffix" data-suffix>suffix</span></cs-accordion
    >`,
  );

  expect(element.querySelector('[data-suffix]')).to.be.ok;

  expect([
    ...element.shadowRoot!.querySelector('[data-test="suffix"]')!.classList,
  ]).to.deep.equal(['suffix-slot-box', 'suffix-slot-box--with-content']);
});

it('does not apply the suffix class when no suffix slot is provided', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"></cs-accordion>`,
  );

  expect([
    ...element.shadowRoot!.querySelector('[data-test="suffix"]')!.classList,
  ]).to.deep.equal(['suffix-slot-box']);
});

it('is accessible', async () => {
  const element = await fixture<Accordion>(
    html`<cs-accordion label="label"></cs-accordion>`,
  );

  await expect(element).to.be.accessible();
});
