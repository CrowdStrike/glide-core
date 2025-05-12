import { expect, fixture, html } from '@open-wc/testing';
import { click } from './library/mouse.js';
import Checkbox from './checkbox.js';

it('is checked on click', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  expect(host.checked).to.be.true;
  expect(host.hasAttribute('checked')).to.be.false;
});

it('is unchecked on click', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" checked></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  expect(host.checked).to.be.false;
  expect(host.hasAttribute('checked')).to.be.true;
});

it('is checked and not indeterminate on click when unchecked and indeterminate', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      indeterminate
    ></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.false;
  expect(host.checked).to.be.true;
  expect(host.indeterminate).to.be.false;
  expect(host.hasAttribute('checked')).to.be.false;
  expect(host.hasAttribute('indeterminate')).to.be.true;
});

it('is unchecked and not indeterminate on click when checked and indeterminate', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      indeterminate
    ></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.false;
  expect(host.checked).to.be.false;
  expect(host.indeterminate).to.be.false;
  expect(host.hasAttribute('checked')).to.be.true;
  expect(host.hasAttribute('indeterminate')).to.be.true;
});

it('is still checked on click when checked but disabled', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      disabled
    ></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  expect(host.checked).to.be.true;
  expect(host.hasAttribute('checked')).to.be.true;
});

it('is still unchecked on click when unchecked and disabled', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" disabled></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  expect(host.hasAttribute('checked')).to.be.false;
  expect(host.checked).to.be.false;
});

it('is unchecked on click then forcibly unchecked via a "input" listener', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  host.addEventListener('input', async () => {
    await host.updateComplete;
    host.checked = false;
  });

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  expect(host.hasAttribute('checked')).to.be.false;
  expect(host.checked).to.be.false;
});

it('is unchecked on click then forcibly unchecked via an "change" listener', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  host.addEventListener('change', async () => {
    await host.updateComplete;
    host.checked = false;
  });

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  expect(host.hasAttribute('checked')).to.be.false;
  expect(host.checked).to.be.false;
});

it('is still indeterminate on click when unchecked and disabled', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      indeterminate
    ></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.indeterminate).to.be.true;
  expect(host.indeterminate).to.be.true;
  expect(host.hasAttribute('indeterminate')).to.be.true;
});

it('remains unchecked when its "click" event is canceled', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  host.addEventListener('click', (event) => {
    event.preventDefault();
  });

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));
  expect(host.checked).to.be.false;
});
