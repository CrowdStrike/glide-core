import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('dispatches one "change" event when Select All is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
      ?.click();
  });

  await aTimeout(0);
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "input" event when Select All is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
      ?.click();
  });

  await aTimeout(0);
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "change" event when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    component.value = ['one', 'two'];
  });

  await aTimeout(0);
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "input" event when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    component.value = ['one', 'two'];
  });

  await aTimeout(0);
  expect(spy.calledOnce).to.be.true;
});

it('dispatches a "change" event when an option is selected after Select All is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
      ?.click();
  });

  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  await aTimeout(0);
  expect(spy.called).to.be.true;
});

it('dispatches an "input" event when an option is selected after Select All is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
      ?.click();
  });

  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  await aTimeout(0);
  expect(spy.called).to.be.true;
});
