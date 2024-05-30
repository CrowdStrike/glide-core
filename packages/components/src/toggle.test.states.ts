import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsToggle from './toggle.js';

CsToggle.shadowRootOptions.mode = 'open';

it('is checked after being clicked', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label"></cs-toggle>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(true);
  expect(component.hasAttribute('checked')).to.be.false;
});

it('is unchecked after being clicked', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label" checked></cs-toggle>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(false);
  expect(component.hasAttribute('checked')).to.be.true;
});

it('is still checked after being clicked when checked but disabled', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label" checked disabled></cs-toggle>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.checked).to.equal(true);
  expect(component.hasAttribute('checked')).to.be.true;
});

it('is still unchecked after being clicked when unchecked and disabled', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label" disabled></cs-toggle>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.equal(false);
});
