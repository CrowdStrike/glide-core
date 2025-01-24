import * as sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';

it('does not dispatch "input" events on input', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);
  component.focus();
  await sendKeys({ type: 'one' });

  expect(spy.callCount).to.equal(0);
});
