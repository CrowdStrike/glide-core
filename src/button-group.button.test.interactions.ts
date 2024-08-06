import './button-group.button.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroupButton from './button-group.button.js';

GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('sets `aria-checked` when selected programmatically', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  component.selected = true;
  await elementUpdated(component);

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio).to.have.attribute('aria-checked', 'true');
});

it('sets `aria-checked` when deselected programmatically', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
      selected
    ></glide-core-button-group-button>`,
  );

  component.selected = false;
  await elementUpdated(component);

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio).to.have.attribute('aria-checked', 'false');
});

it('sets `aria-disabled` when disabled programmatically', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  component.disabled = true;
  await elementUpdated(component);

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio).to.have.attribute('aria-disabled', 'true');
});

it('sets `aria-disabled` when enabled programmatically', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  component.disabled = false;
  await elementUpdated(component);

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio).to.have.attribute('aria-disabled', 'false');
});
