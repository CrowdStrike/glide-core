/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';

it('dispatches one "change" event when an option is selected via click', async () => {
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
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "change" event when an option is selected via Enter', async () => {
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

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "change" event when an option is selected via Space', async () => {
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

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "input" event when an option is selected via click', async () => {
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
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "input" event when an option is selected via Enter', async () => {
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

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.calledOnce).to.be.true;
});

it('dispatches one "input" event when an option is selected via Space', async () => {
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

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.calledOnce).to.be.true;
});

it('does not dispatch a "change" event when `value` is changed programmatically', async () => {
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
  expect(spy.called).to.be.false;
});

it('continues to dispatch "change" events upon selection after `value` is changed programmatically', async () => {
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

  component.value = ['two'];

  setTimeout(() => {
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "input" event when `value` is changed programmatically', async () => {
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
  expect(spy.called).to.be.false;
});

it('does not dispatch a "change" event when an already selected option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  await aTimeout(0);
  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "input" event when an already selected option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  await aTimeout(0);
  expect(spy.notCalled).to.be.true;
});

it('continues to dispatch "input" events upon selection after `value` is changed programmatically', async () => {
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

  component.value = ['two'];

  setTimeout(() => {
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
});
