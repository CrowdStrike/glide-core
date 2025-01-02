/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { click } from './library/mouse.js';
import GlideCoreCheckbox from './checkbox.js';

GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('is checked on click', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  expect(component.checked).to.be.true;
  expect(component.hasAttribute('checked')).to.be.false;
});

it('is unchecked on click', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" checked></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  expect(component.checked).to.be.false;
  expect(component.hasAttribute('checked')).to.be.true;
});

it('is checked and not indeterminate on click when unchecked and indeterminate', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      indeterminate
    ></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.false;
  expect(component.checked).to.be.true;
  expect(component.indeterminate).to.be.false;
  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.hasAttribute('indeterminate')).to.be.true;
});

it('is unchecked and not indeterminate on click when checked and indeterminate', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      indeterminate
    ></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.false;
  expect(component.checked).to.be.false;
  expect(component.indeterminate).to.be.false;
  expect(component.hasAttribute('checked')).to.be.true;
  expect(component.hasAttribute('indeterminate')).to.be.true;
});

it('is still checked on click when checked but disabled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      disabled
    ></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  expect(component.checked).to.be.true;
  expect(component.hasAttribute('checked')).to.be.true;
});

it('is still unchecked on click when unchecked and disabled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" disabled></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.be.false;
});

it('is unchecked on click then forcibly unchecked via a "input" listener', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.addEventListener('input', async () => {
    await component.updateComplete;
    component.checked = false;
  });

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.be.false;
});

it('is unchecked on click then forcibly unchecked via an "change" listener', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.addEventListener('change', async () => {
    await component.updateComplete;
    component.checked = false;
  });

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.be.false;
});

it('is still indeterminate on click when unchecked and disabled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      indeterminate
    ></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.true;
  expect(component.indeterminate).to.be.true;
  expect(component.hasAttribute('indeterminate')).to.be.true;
});

it('has a tooltip when minimal and with a long label', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      style="display: block; max-width: 100px;"
      label=${'x'.repeat(100)}
      private-variant="minimal"
      private-show-label-tooltip
    ></glide-core-checkbox>`,
  );

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.true;
});

it('has no tooltip when minimal and with a short label', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      private-variant="minimal"
      private-show-label-tooltip
    ></glide-core-checkbox>`,
  );

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.false;
});

it('remains unchecked when its "click" event is canceled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.addEventListener('click', (event) => {
    event.preventDefault();
  });

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));
  expect(component.checked).to.be.false;
});
