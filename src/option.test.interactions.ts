import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import Option from './option.js';
import type Tooltip from './tooltip.js';

it('sets `ariaDisabled` when enabled programmatically', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label" disabled></glide-core-option>`,
  );

  host.disabled = false;

  expect(host.ariaDisabled).to.equal('false');
});

it('sets `ariaDisabled` when disabled programmatically', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label"></glide-core-option>`,
  );

  host.disabled = true;

  expect(host.ariaDisabled).to.equal('true');
});

it('sets `ariaSelected` when `role="option"` and selected programmatically', async () => {
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  const host = await fixture<Option>(html`
    <glide-core-option label="Label" role="option"></glide-core-option>
  `);

  host.selected = true;
  await host.updateComplete;

  expect(host.ariaSelected).to.equal('true');
});

it('sets `ariaSelected` when `role="option"`, disabled, and selected programmatically', async () => {
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  const host = await fixture<Option>(html`
    <glide-core-option label="Label" role="option" disabled></glide-core-option>
  `);

  host.selected = true;
  await host.updateComplete;

  expect(host.ariaSelected).to.equal('false');
});

it('sets `ariaSelected` when `role="option"` and deselected programmatically', async () => {
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  const host = await fixture<Option>(html`
    <glide-core-option label="Label" role="option" selected></glide-core-option>
  `);

  host.selected = false;
  await host.updateComplete;

  expect(host.ariaSelected).to.equal('false');
});

it('does not set `ariaSelected` when `role="menuitem"` and selected programmatically', async () => {
  const host = await fixture<Option>(html`
    <glide-core-option label="Label"></glide-core-option>
  `);

  host.selected = true;
  await host.updateComplete;

  expect(host.ariaSelected).to.be.null;
});

it('is a link when `href` is set programmatically', async () => {
  const host = await fixture<Option>(html`
    <glide-core-option label="Label"></glide-core-option>
  `);

  host.href = '/';
  await host.updateComplete;

  const container = host.shadowRoot?.querySelector('[data-test="container"]');
  expect(container instanceof HTMLAnchorElement).to.be.true;
});

it('is not a link when `href` is unset programmatically', async () => {
  const host = await fixture<Option>(html`
    <glide-core-option label="Label" href="/"></glide-core-option>
  `);

  host.href = undefined;
  await host.updateComplete;

  const container = host.shadowRoot?.querySelector('[data-test="container"]');
  expect(container instanceof HTMLAnchorElement).to.be.false;
});

it('enables its tooltip when overflowing and made visible', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option
      label=${'x'.repeat(500)}
      style="display: none"
    ></glide-core-option>`,
  );

  host.style.display = '';
  await aTimeout(0); // Wait for the Intersection Observer

  const tooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.disabled).to.be.false;
});

it('enables its tooltip when its label is changed programmatically and overflows', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label"></glide-core-option>`,
  );

  host.label = 'x'.repeat(500);
  await host.updateComplete;

  const tooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="tooltip"]',
  );

  await aTimeout(0); // Wait for the timeout in the setter
  expect(tooltip?.disabled).to.be.false;
});

it('disables its tooltip when its label is changed programmatically and no longer overflows', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label=${'x'.repeat(500)}></glide-core-option>`,
  );

  host.label = 'Label';
  await host.updateComplete;

  const tooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="tooltip"]',
  );

  await aTimeout(0); // Wait for the timeout in the setter
  expect(tooltip?.disabled).to.be.true;
});

it('enables its tooltip when its description is changed programmatically and overflows', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option
      label="Label"
      description="Description"
    ></glide-core-option>`,
  );

  host.description = 'x'.repeat(500);
  await host.updateComplete;

  const tooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="tooltip"]',
  );

  await aTimeout(0); // Wait for the timeout in the setter
  expect(tooltip?.disabled).to.be.false;
});

it('disables its tooltip when its description is changed programmatically and no longer overflows', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option
      label="Label"
      description=${'x'.repeat(500)}
    ></glide-core-option>`,
  );

  host.description = 'Description';
  await host.updateComplete;

  const tooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="tooltip"]',
  );

  await aTimeout(0); // Wait for the timeout in the setter
  expect(tooltip?.disabled).to.be.true;
});
