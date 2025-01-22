/* eslint-disable @typescript-eslint/no-unused-expressions */

import { assert, expect, fixture, html } from '@open-wc/testing';
import GlideCoreRadioGroup from './radio-group.js';
import GlideCoreRadioGroupRadio from './radio-group.radio.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

GlideCoreRadioGroup.shadowRootOptions.mode = 'open';
GlideCoreRadioGroupRadio.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-radio-group')).to.equal(
    GlideCoreRadioGroup,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group
      label="label"
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

      <glide-core-radio-group-radio
        label="Three"
        value="three"
      ></glide-core-radio-group-radio>

      <div slot="description">Description</div>
    </glide-core-radio-group>
  `);

  await expect(component).to.be.accessible();
});

it('renders the appropriate attributes on Radio children via the `checked` attribute', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label">
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

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].getAttribute('tabindex')).to.equal('-1');
  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[0].getAttribute('role')).to.equal('radio');
  expect(radios[0].getAttribute('aria-checked')).to.equal('false');
  expect(radios[0].getAttribute('aria-disabled')).to.equal('false');
  expect(radios[0].getAttribute('aria-invalid')).to.equal('false');
  expect(radios[0].getAttribute('aria-required')).to.equal('false');

  expect(radios[1].getAttribute('tabindex')).to.equal('0');
  expect(radios[1].hasAttribute('checked')).to.be.true;
  expect(radios[1].getAttribute('role')).to.equal('radio');
  expect(radios[1].getAttribute('aria-checked')).to.equal('true');
  expect(radios[1].getAttribute('aria-disabled')).to.equal('false');
  expect(radios[1].getAttribute('aria-invalid')).to.equal('false');
  expect(radios[1].getAttribute('aria-required')).to.equal('false');
});

it('does not render a required symbol when a `label` is provided and `required` is not set', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name" value="one">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const requiredSymbol = component.shadowRoot?.querySelector(
    '[data-test="label-required"]',
  );

  expect(requiredSymbol).to.be.null;
});

it('sets attributes and properties on Radios when `required` is set on the group', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name" value="one" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].privateRequired).to.be.true;
  expect(radios[0].getAttribute('aria-required')).to.equal('true');
  expect(radios[1].privateRequired).to.be.true;
  expect(radios[1].getAttribute('aria-required')).to.equal('true');
});

it('does not set required attributes and properties on Radios when `required` is not set on the group', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name" value="one">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].privateRequired).to.be.false;
  expect(radios[0].getAttribute('aria-required')).to.equal('false');
  expect(radios[1].privateRequired).to.be.false;
  expect(radios[1].getAttribute('aria-required')).to.equal('false');
});

it('sets attributes and properties on Radios when `disabled` is set on the group', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name" disabled>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].hasAttribute('disabled')).to.be.true;
  expect(radios[0].getAttribute('aria-disabled')).to.equal('true');
  expect(radios[0].shadowRoot?.querySelector('.disabled')).to.be.not.null;
  expect(radios[1].hasAttribute('disabled')).to.be.true;
  expect(radios[1].getAttribute('aria-disabled')).to.equal('true');
  expect(radios[1].shadowRoot?.querySelector('.disabled')).to.be.not.null;
});

it('does not set disabled attributes on Radios when `disabled` is not set on the group', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name" value="one">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radio = component.querySelector('glide-core-radio-group-radio');

  assert(radio);

  expect(radio).to.not.have.attribute('disabled');
  expect(radio.getAttribute('aria-disabled')).to.equal('false');
  expect(radio.shadowRoot?.querySelector('.disabled')).to.be.null;
});

it('renders Radios as disabled when `disabled` is programmatically set and removed on the group', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name" value="one">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radio = document.querySelector('glide-core-radio-group-radio');

  assert(radio);

  expect(radio).to.not.have.attribute('disabled');
  expect(radio.getAttribute('aria-disabled')).to.equal('false');
  expect(radio.shadowRoot?.querySelector('.disabled')).to.be.null;

  component.disabled = true;
  await component.updateComplete;

  expect(radio.hasAttribute('disabled')).to.be.true;
  expect(radio.getAttribute('aria-disabled')).to.equal('true');
  expect(radio.shadowRoot?.querySelector('.disabled')).to.be.not.null;

  component.disabled = false;
  await component.updateComplete;

  expect(radio).to.not.have.attribute('disabled');
  expect(radio.getAttribute('aria-disabled')).to.equal('false');
  expect(radio.shadowRoot?.querySelector('.disabled')).to.be.null;
});

it('sets the Radio Group to an empty value when no Radio is `checked`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  expect(component.value).to.equal('');
  expect(radios.length).to.equal(2);

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[0].getAttribute('aria-checked')).to.equal('false');
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[1].getAttribute('aria-checked')).to.equal('false');
});

it('sets the group `value` when a Radio is set as `checked`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name">
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

  expect(component.value).to.equal('two');
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-radio-group
        label="label"
        name="name"
      ></glide-core-radio-group>`,
    );
  });
});

it('throws if its default slot is the incorrect type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-radio-group label="label" name="name">
        <div>Option 1</div>
      </glide-core-radio-group>
    `);
  });
});

it('sets the first Radio to be tabbable when none are checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0].getAttribute('tabindex')).to.equal('0');
  expect(radios[1].getAttribute('tabindex')).to.equal('-1');
  expect(radios[2].getAttribute('tabindex')).to.equal('-1');
});

it('sets the first non-disabled Radio as tabbable when none are checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0].getAttribute('tabindex')).to.equal('-1');
  expect(radios[1].getAttribute('tabindex')).to.equal('0');
  expect(radios[2].getAttribute('tabindex')).to.equal('-1');
});

it('makes all Radios untabbable when the group is `disabled`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name" disabled>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0].getAttribute('tabindex')).to.equal('-1');
  expect(radios[1].getAttribute('tabindex')).to.equal('-1');
  expect(radios[2].getAttribute('tabindex')).to.equal('-1');
});

it('sets individually disabled Radios as untabbable', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        disabled
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios.length).to.equal(2);
  expect(radios[0].getAttribute('tabindex')).to.equal('-1');
  expect(radios[1].getAttribute('tabindex')).to.equal('-1');
});

it('updates the tabbable state of each Radio based on programmatic updates to `checked`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0].getAttribute('tabindex')).to.equal('-1');
  expect(radios[1].getAttribute('tabindex')).to.equal('-1');
  expect(radios[2].getAttribute('tabindex')).to.equal('0');

  radios[2].checked = false;
  radios[0].checked = true;
  radios[1].checked = false;

  await component.updateComplete;

  expect(radios[0].getAttribute('tabindex')).to.equal('0');
  expect(radios[1].getAttribute('tabindex')).to.equal('-1');
  expect(radios[2].getAttribute('tabindex')).to.equal('-1');
});

it('updates the tabbable state of each Radio based on programmatic updates to `value`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name" value="three">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0].getAttribute('tabindex')).to.equal('-1');
  expect(radios[1].getAttribute('tabindex')).to.equal('-1');
  expect(radios[2].getAttribute('tabindex')).to.equal('0');

  component.value = 'two';

  await component.updateComplete;

  expect(radios[0].getAttribute('tabindex')).to.equal('-1');
  expect(radios[1].getAttribute('tabindex')).to.equal('0');
  expect(radios[2].getAttribute('tabindex')).to.equal('-1');
});
