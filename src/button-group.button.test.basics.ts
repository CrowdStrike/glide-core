import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreButtonGroupButton from './button-group.button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreButtonGroupButton {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-button-group-button')).to.equal(
    GlideCoreButtonGroupButton,
  );
});

it('is accessible', async () => {
  const host = await fixture(
    html`<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`,
  );

  await expect(host).to.be.accessible();
});

it('sets `aria-checked` when selected', async () => {
  const host = await fixture(
    html`<glide-core-button-group-button
      label="Label"
      selected
    ></glide-core-button-group-button>`,
  );

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(radio?.ariaChecked).to.equal('true');
});

it('sets `aria-checked` when not selected', async () => {
  const host = await fixture(
    html`<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`,
  );

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(radio?.ariaChecked).to.equal('false');
});

it('sets `aria-disabled` when disabled', async () => {
  const host = await fixture(
    html`<glide-core-button-group-button
      label="Label"
      disabled
    ></glide-core-button-group-button>`,
  );

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(radio?.ariaDisabled).to.equal('true');
});

it('sets `aria-disabled` when not disabled', async () => {
  const host = await fixture(
    html`<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`,
  );

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(radio?.ariaDisabled).to.equal('false');
});

it('is tabbable when selected', async () => {
  const host = await fixture(
    html`<glide-core-button-group-button
      label="Label"
      selected
    ></glide-core-button-group-button>`,
  );

  const radio = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="radio"]',
  );

  expect(radio?.tabIndex).to.equal(0);
});

it('is not tabbable when not selected', async () => {
  const host = await fixture(
    html`<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`,
  );

  const radio = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="radio"]',
  );

  expect(radio?.tabIndex).to.equal(-1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when `icon-only` and no "icon" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-button-group-button
        privateVariant="icon-only"
      ></glide-core-button-group-button>`,
    );
  });
});
