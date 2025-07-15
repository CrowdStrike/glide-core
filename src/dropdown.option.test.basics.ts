import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import DropdownOption from './dropdown.option.js';

@customElement('glide-core-subclassed')
class Subclassed extends DropdownOption {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-dropdown-option')).to.equal(
    DropdownOption,
  );
});

it('sets `aria-selected` when selected', async () => {
  const host = await fixture<DropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  expect(host.ariaSelected).to.equal('true');
});

it('sets `aria-selected` when unselected', async () => {
  const host = await fixture<DropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  expect(host.ariaSelected).to.equal('false');
});

it('sets `aria-selected` when disabled', async () => {
  const host = await fixture<DropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
      disabled
    ></glide-core-dropdown-option>`,
  );

  expect(host.ariaSelected).to.equal('false');
});

it('throws when `label` is undefined', async () => {
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
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
