import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreToggle from './toggle.js';

GlideCoreToggle.shadowRootOptions.mode = 'open';

it('is checked after being clicked', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(true);
  expect(component.hasAttribute('checked')).to.be.false;

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.getAttribute('aria-checked')).to.equal('true');
});

it('is unchecked after being clicked', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label" checked></glide-core-toggle>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(false);
  expect(component.hasAttribute('checked')).to.be.true;

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.getAttribute('aria-checked')).to.equal('false');
});

it('is still checked after being clicked when checked but disabled', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle
      label="Label"
      checked
      disabled
    ></glide-core-toggle>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(true);
  expect(component.hasAttribute('checked')).to.be.true;

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.getAttribute('aria-checked')).to.equal('true');
});

it('is still unchecked after being clicked when unchecked and disabled', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label" disabled></glide-core-toggle>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.equal(false);

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.getAttribute('aria-checked')).to.equal('false');
});
