/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreCheckbox from './checkbox.js';

GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('is checked after being clicked', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(true);
  expect(component.hasAttribute('checked')).to.be.false;
});

it('is unchecked after being clicked', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" checked></glide-core-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(false);
  expect(component.hasAttribute('checked')).to.be.true;
});

it('is checked and not indeterminate after being clicked when unchecked and indeterminate', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      indeterminate
    ></glide-core-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.false;
  expect(component.checked).to.equal(true);
  expect(component.indeterminate).to.equal(false);
  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.hasAttribute('indeterminate')).to.be.true;
});

it('is unchecked and not indeterminate after being clicked when checked and indeterminate', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      indeterminate
    ></glide-core-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.false;
  expect(component.checked).to.equal(false);
  expect(component.indeterminate).to.equal(false);
  expect(component.hasAttribute('checked')).to.be.true;
  expect(component.hasAttribute('indeterminate')).to.be.true;
});

it('is still checked after being clicked when checked but disabled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      disabled
    ></glide-core-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(true);
  expect(component.hasAttribute('checked')).to.be.true;
});

it('is still unchecked after being clicked when unchecked and disabled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" disabled></glide-core-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.equal(false);
});

it('is unchecked after being clicked then forcibly unchecked via a "input" listener', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.addEventListener('input', async () => {
    await component.updateComplete;
    component.checked = false;
  });

  component.click();
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.equal(false);
});

it('is unchecked after being clicked then forcibly unchecked via an "change" listener', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.addEventListener('change', async () => {
    await component.updateComplete;
    component.checked = false;
  });

  component.click();
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.equal(false);
});

it('is still indeterminate after being clicked when unchecked and disabled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      indeterminate
    ></glide-core-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.true;
  expect(component.indeterminate).to.equal(true);
  expect(component.hasAttribute('indeterminate')).to.be.true;
});

it('has a tooltip when minimal and with a long label', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      style="display: block; max-width: 100px;"
      label=${'.'.repeat(100)}
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

  component.click();
  expect(component.checked).to.be.false;
});
