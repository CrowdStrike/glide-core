import './checkbox.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import CheckboxGroup from './checkbox-group.js';
import expectWindowError from './library/expect-window-error.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class Subclassed extends CheckboxGroup {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-checkbox-group')).to.equal(
    CheckboxGroup,
  );
});

it('is accessible', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" tooltip="Tooltip">
      <glide-core-checkbox label="Label"></glide-core-checkbox>
      <div slot="description">Description</div>
    </glide-core-checkbox-group>`,
  );

  await expect(host).to.be.accessible();
});

it('enables checkboxes when `value` is set initially', async () => {
  const host = await fixture(
    html`<glide-core-checkbox-group label="Label" .value=${['value']}>
      <glide-core-checkbox
        label="Label"
        value="value"
        disabled
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  const checkbox = host.querySelector('glide-core-checkbox');
  expect(checkbox?.disabled).to.be.false;
});

it('does not include in its `value` disabled checkboxes that are checked', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox
        label="One"
        value="one"
        checked
        disabled
      ></glide-core-checkbox>

      <glide-core-checkbox
        label="Two"
        value="two"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  const checkboxes = host.querySelectorAll('glide-core-checkbox');

  expect(host.value).to.deep.equal(['two']);
  expect(checkboxes[0]?.checked).to.be.true;
  expect(checkboxes[1]?.checked).to.be.true;
});

it('sets `privateVariant` on Checkboxes added after initial render', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
      <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  const checkbox = document.createElement('glide-core-checkbox');
  checkbox.label = 'Three';
  checkbox.value = 'three';

  host.append(checkbox);

  await host.updateComplete;

  const checkboxes = host.querySelectorAll('glide-core-checkbox');

  expect(checkboxes.length).to.equal(3);
  expect(checkboxes[2]?.privateVariant).to.equal('minimal');
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-checkbox-group>
        <glide-core-checkbox label="Label"></glide-core-checkbox>
      </glide-core-checkbox-group>`,
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

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-checkbox-group
        label="Label"
      ></glide-core-checkbox-group>`,
    );
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-checkbox-group label="Label">
        <button>Button</button>
      </glide-core-checkbox-group>`,
    );
  });
});
