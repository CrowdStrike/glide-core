import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreRadioGroup from './radio-group.js';
import './radio-group.radio.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreRadioGroup {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-radio-group')).to.equal(
    GlideCoreRadioGroup,
  );
});

it('is accessible', async () => {
  const host = await fixture(html`
    <glide-core-radio-group
      label="Label"
      name="name"
      value="one"
      tooltip="Tooltip"
    >
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>

      <div slot="description">Description</div>
    </glide-core-radio-group>
  `);

  await expect(host).to.be.accessible();
});

it('can be required', async () => {
  const host = await fixture(html`
    <glide-core-radio-group label="Label" required>
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.ariaRequired).to.equal('true');
  expect(radios[1]?.ariaRequired).to.equal('true');
});

it('can be disabled', async () => {
  const host = await fixture(html`
    <glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.disabled).to.be.true;
  expect(radios[0]?.ariaDisabled).to.equal('true');
  expect(radios[1]?.disabled).to.be.true;
  expect(radios[1]?.ariaDisabled).to.equal('true');
});

it('sets `value` when a radio is checked', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  expect(host.value).to.equal('two');
});

it('makes the first enabled radio tabbable', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="One"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.tabIndex).to.equal(-1);
  expect(radios[1]?.tabIndex).to.equal(0);
});

it('makes radios untabbable when disabled', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.tabIndex).to.equal(-1);
  expect(radios[1]?.tabIndex).to.equal(-1);
  expect(radios[2]?.tabIndex).to.equal(-1);
});

it('checks radios when `value` is set initially', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" value="two">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.checked).to.be.false;
  expect(radios[1]?.checked).to.be.true;
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

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-radio-group label="Label"></glide-core-radio-group>`,
    );
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-radio-group label="Label">
        <div>Option 1</div>
      </glide-core-radio-group>
    `);
  });
});
