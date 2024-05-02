import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsCheckbox from './checkbox.js';

CsCheckbox.shadowRootOptions.mode = 'open';

it('is checked after being clicked', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(true);
  expect(component.hasAttribute('checked')).to.be.false;
});

it('is unchecked after being clicked', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox checked></cs-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(false);
  expect(component.hasAttribute('checked')).to.be.true;
});

it('is checked and not indeterminate after being clicked when unchecked and indeterminate', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox indeterminate></cs-checkbox>`,
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
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox checked indeterminate></cs-checkbox>`,
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
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox checked disabled></cs-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(true);
  expect(component.hasAttribute('checked')).to.be.true;
});

it('is still unchecked after being clicked when unchecked and disabled', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox disabled></cs-checkbox>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.equal(false);
});

it('is still indeterminate after being clicked when unchecked and disabled', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox disabled indeterminate></cs-checkbox>`,
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
