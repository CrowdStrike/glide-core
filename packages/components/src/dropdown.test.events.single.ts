import './dropdown.option.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';

it('dispatches one "change" event when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
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
    component.value = ['one'];
  });

  await aTimeout(0);
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "input" event when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
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
    component.value = ['one'];
  });

  await aTimeout(0);
  expect(spy.calledOnce).to.be.true;
});
