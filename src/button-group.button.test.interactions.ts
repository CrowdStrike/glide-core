import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroupButton from './button-group.button.js';

it('sets `aria-checked` when selected programmatically', async () => {
  const host = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`,
  );

  host.selected = true;
  await host.updateComplete;

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(radio?.ariaChecked).to.equal('true');
});

it('sets `aria-checked` when deselected programmatically', async () => {
  const host = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Label"
      selected
    ></glide-core-button-group-button>`,
  );

  host.selected = false;
  await host.updateComplete;

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(radio?.ariaChecked).to.equal('false');
});

it('sets `aria-disabled` when disabled programmatically', async () => {
  const host = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`,
  );

  host.disabled = true;
  await host.updateComplete;

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(radio?.ariaDisabled).to.equal('true');
});

it('sets `aria-disabled` when enabled programmatically', async () => {
  const host = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Label"
      disabled
    ></glide-core-button-group-button>`,
  );

  host.disabled = false;
  await host.updateComplete;

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(radio?.ariaDisabled).to.equal('false');
});
