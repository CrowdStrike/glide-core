import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreDropdownOption from './dropdown.option.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreDropdownOption {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-dropdown-option')).to.equal(
    GlideCoreDropdownOption,
  );
});

it('is selectable', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  const checkedIconContainer = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(checkedIconContainer?.checkVisibility()).to.be.true;
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-dropdown-option></glide-core-dropdown-option>`,
    );
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
