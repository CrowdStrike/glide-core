/* eslint-disable @typescript-eslint/no-unused-expressions */

import './accordion.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreAccordion from './accordion.js';

GlideCoreAccordion.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-accordion')).to.equal(
    GlideCoreAccordion,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label">
      Inner content
    </glide-core-accordion>`,
  );

  await expect(component).to.be.accessible();
});

it('is closed by default', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label">
      Inner content
    </glide-core-accordion>`,
  );

  const accordion =
    component.shadowRoot?.querySelector<HTMLDetailsElement>('details');

  expect(accordion).to.be.ok;
  expect(accordion?.hasAttribute('open')).to.be.false;
});

it('defaults to "open" when provided with the attribute', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label" open>
      Inner content
    </glide-core-accordion>`,
  );

  const accordion =
    component.shadowRoot?.querySelector<HTMLDetailsElement>('details');

  expect(accordion).to.be.ok;
  expect(accordion?.hasAttribute('open')).to.be.true;
});

it('renders the provided "label"', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Accordion Title">
      Inner content
    </glide-core-accordion>`,
  );

  const label = component.shadowRoot?.querySelector<HTMLSpanElement>(
    '[data-test="label"]',
  );

  expect(label).to.be.ok;
  expect(label?.textContent?.trim()).to.equal('Accordion Title');
});

it('renders the provided default slotted content', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label"
      ><p data-body>Inner content</p></glide-core-accordion
    >`,
  );

  const body = component.querySelector<HTMLParagraphElement>('[data-body]');

  expect(body).to.be.ok;
});

it('renders with a prefix slot and applies the appropriate classes', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label">
      Inner content
      <span slot="prefix" data-prefix>prefix</span>
    </glide-core-accordion>`,
  );

  expect(document.querySelector('[data-prefix]')).to.be.ok;

  expect([
    ...component.shadowRoot!.querySelector('[data-test="label"]')!.classList,
  ]).to.deep.equal(['heading-box', 'heading-box-with-prefix']);

  expect([
    ...component.shadowRoot!.querySelector('[data-test="content"]')!.classList,
  ]).to.deep.equal(['content', 'content-with-prefix']);
});

it('does not apply prefix classes when no prefix slot is provided', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label">
      Inner content
    </glide-core-accordion>`,
  );

  expect([
    ...component.shadowRoot!.querySelector('[data-test="label"]')!.classList,
  ]).to.deep.equal(['heading-box']);

  expect([
    ...component.shadowRoot!.querySelector('[data-test="content"]')!.classList,
  ]).to.deep.equal(['content']);
});

it('renders with a suffix slot and applies the appropriate class', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label">
      Inner content
      <span slot="suffix" data-suffix>suffix</span>
    </glide-core-accordion>`,
  );

  expect(component.querySelector('[data-suffix]')).to.be.ok;

  expect([
    ...component.shadowRoot!.querySelector('[data-test="suffix"]')!.classList,
  ]).to.deep.equal(['suffix-slot-box', 'suffix-slot-box-with-content']);
});

it('does not apply the suffix class when no suffix slot is provided', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label">
      Inner content
    </glide-core-accordion>`,
  );

  expect([
    ...component.shadowRoot!.querySelector('[data-test="suffix"]')!.classList,
  ]).to.deep.equal(['suffix-slot-box']);
});

it('renders without prefix and suffix classes after both are removed', async () => {
  const component = await fixture<GlideCoreAccordion>(html`
    <glide-core-accordion label="label">
      Inner content
      <span slot="prefix">prefix</span>
      <span slot="suffix">suffix</span>
    </glide-core-accordion>
  `);

  component.querySelector('[slot="prefix"]')?.remove();
  component.querySelector('[slot="suffix"]')?.remove();
  await elementUpdated(component);

  // prefix
  expect([
    ...component.shadowRoot!.querySelector('[data-test="label"]')!.classList,
  ]).to.deep.equal(['heading-box']);

  expect([
    ...component.shadowRoot!.querySelector('[data-test="content"]')!.classList,
  ]).to.deep.equal(['content']);

  // suffix
  expect([
    ...component.shadowRoot!.querySelector('[data-test="suffix"]')!.classList,
  ]).to.deep.equal(['suffix-slot-box']);
});
