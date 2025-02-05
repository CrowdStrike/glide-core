import * as sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';

it('does not dispatch "input" events on input', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  expect(spy.callCount).to.equal(0);
});
