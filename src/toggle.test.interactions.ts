import { expect, fixture, html } from '@open-wc/testing';
import Toggle from './toggle.js';
import { click } from '@/src/library/mouse.js';

it('is checked after being clicked', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.checked).to.be.true;
  expect(host.hasAttribute('checked')).to.be.false;

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.ariaChecked).to.equal('true');
});

it('is unchecked after being clicked', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle label="Label" checked></glide-core-toggle>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.checked).to.be.false;
  expect(host.hasAttribute('checked')).to.be.true;

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.ariaChecked).to.equal('false');
});

it('is still checked after being clicked when checked but disabled', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle
      label="Label"
      checked
      disabled
    ></glide-core-toggle>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.checked).to.be.true;
  expect(host.hasAttribute('checked')).to.be.true;

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.ariaChecked).to.equal('true');
});

it('is still unchecked after being clicked when unchecked and disabled', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle label="Label" disabled></glide-core-toggle>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.hasAttribute('checked')).to.be.false;
  expect(host.checked).to.be.false;

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.ariaChecked).to.equal('false');
});

it('is unchecked after being clicked then forcibly unchecked via a "change" listener', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  host.addEventListener('change', async () => {
    await host.updateComplete;
    host.checked = false;
  });

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.hasAttribute('checked')).to.be.false;
  expect(host.checked).to.be.false;

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.ariaChecked).to.equal('false');
});

it('is unchecked after being clicked then forcibly unchecked via an "input" listener', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  host.addEventListener('input', async () => {
    await host.updateComplete;
    host.checked = false;
  });

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.hasAttribute('checked')).to.be.false;
  expect(host.checked).to.be.false;

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.ariaChecked).to.equal('false');
});

it('remains unchecked when its "click" event is canceled', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  host.addEventListener('click', async (event) => {
    event.preventDefault();
  });

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.hasAttribute('checked')).to.be.false;
  expect(host.checked).to.be.false;

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.ariaChecked).to.equal('false');
});
