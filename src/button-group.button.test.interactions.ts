import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroupButton from './button-group.button.js';

it('sets `aria-checked` when selected programmatically', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  component.selected = true;
  await component.updateComplete;

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('aria-checked')).to.equal('true');
});

it('sets `aria-checked` when deselected programmatically', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
      selected
    ></glide-core-button-group-button>`,
  );

  component.selected = false;
  await component.updateComplete;

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('aria-checked')).to.equal('false');
});

it('sets `aria-disabled` when disabled programmatically', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  component.disabled = true;
  await component.updateComplete;

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('aria-disabled')).to.equal('true');
});

it('sets `aria-disabled` when enabled programmatically', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
      disabled
    ></glide-core-button-group-button>`,
  );

  component.disabled = false;
  await component.updateComplete;

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('aria-disabled')).to.equal('false');
});
