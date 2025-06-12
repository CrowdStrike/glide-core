import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Option from './option.js';

@customElement('glide-core-subclassed')
class Subclassed extends Option {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-option')).to.equal(Option);
});

it('sets `ariaDisabled` when enabled', async () => {
  const host = await fixture(
    html`<glide-core-option label="Label"></glide-core-option>`,
  );

  expect(host.ariaDisabled).to.equal('false');
});

it('sets `ariaDisabled` when disabled', async () => {
  const host = await fixture(
    html`<glide-core-option label="Label" disabled></glide-core-option>`,
  );

  expect(host.ariaDisabled).to.equal('true');
});

it('sets `ariaSelected` when `role="option"` and selected', async () => {
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  const host = await fixture(html`
    <glide-core-option label="Label" role="option" selected></glide-core-option>
  `);

  expect(host.ariaSelected).to.equal('true');
});

it('sets `ariaSelected` when `role="option"` and unselected', async () => {
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  const host = await fixture(html`
    <glide-core-option label="Label" role="option"></glide-core-option>
  `);

  expect(host.ariaSelected).to.equal('false');
});

it('sets `ariaSelected` when `role="option"`, disabled, and selected', async () => {
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  const host = await fixture(html`
    <glide-core-option
      label="Label"
      role="option"
      disabled
      selected
    ></glide-core-option>
  `);

  expect(host.ariaSelected).to.equal('false');
});

it('does not set `ariaSelected` when `role="menuitem"` and selected', async () => {
  const host = await fixture(html`
    <glide-core-option label="Label" selected></glide-core-option>
  `);

  expect(host.ariaSelected).to.be.null;
});

it('is a link when `href` is present', async () => {
  const host = await fixture(html`
    <glide-core-option label="Label" href="/"></glide-core-option>
  `);

  const container = host.shadowRoot?.querySelector('[data-test="container"]');
  expect(container instanceof HTMLAnchorElement).to.be.true;
});

it('is not a link when `href` is not present', async () => {
  const host = await fixture(html`
    <glide-core-option label="Label"></glide-core-option>
  `);

  const container = host.shadowRoot?.querySelector('[data-test="container"]');
  expect(container instanceof HTMLAnchorElement).to.be.false;
});

it('is not a link when `role="option"` and `href` is present', async () => {
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  const host = await fixture(html`
    <glide-core-option label="Label" href="/" role="option"></glide-core-option>
  `);

  const container = host.shadowRoot?.querySelector('[data-test="container"]');
  expect(container instanceof HTMLAnchorElement).to.be.false;
});

it('has a description', async () => {
  const host = await fixture(
    html`<glide-core-option
      label="Label"
      description="Description"
    ></glide-core-option>`,
  );

  const description = host.shadowRoot?.querySelector(
    '[data-test="description"]',
  );

  expect(description?.checkVisibility()).to.be.true;
});

it('has a checkmark icon when `role="option"` and selected', async () => {
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  const host = await fixture(
    html`<glide-core-option
      label="Label"
      role="option"
      selected
    ></glide-core-option>`,
  );

  const iconContainer = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(iconContainer?.checkVisibility()).to.be.true;
});

it('does not have a checkmark icon when `role="option"` and unselected', async () => {
  const host = await fixture(
    html`<glide-core-option label="Label" role="option"></glide-core-option>`,
  );

  const iconContainer = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(iconContainer?.checkVisibility()).to.not.be.ok;
});

it('does not have a checkmark icon when `role="option"`, disabled, and selected', async () => {
  const host = await fixture(
    html`<glide-core-option
      label="Label"
      role="option"
      disabled
      selected
    ></glide-core-option>`,
  );

  const iconContainer = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(iconContainer?.checkVisibility()).to.not.be.ok;
});

it('does not have a checkmark icon when `role="menuitem"` and selected', async () => {
  const host = await fixture(
    html`<glide-core-option label="Label" selected></glide-core-option>`,
  );

  const iconContainer = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(iconContainer?.checkVisibility()).to.not.be.ok;
});

it('falls back when it has no slotted content', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label"></glide-core-option>`,
  );

  const contentSlot = host.shadowRoot?.querySelector(
    '[data-test="content-slot"]',
  );

  expect(contentSlot?.checkVisibility()).to.be.true;
});

it('does not fall back when it has slotted content', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label">
      <div slot="content">Label</div>
    </glide-core-option>`,
  );

  const contentSlot = host.shadowRoot?.querySelector(
    '[data-test="content-slot"]',
  );

  expect(contentSlot?.checkVisibility()).to.not.be.ok;
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
