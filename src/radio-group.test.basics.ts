import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreRadioGroup from './radio-group.js';
import './radio-group.radio.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-radio-group')).to.equal(
    GlideCoreRadioGroup,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
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

  await expect(component).to.be.accessible();
});

it('can be required', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label" required>
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].privateRequired).to.be.true;
  expect(radios[0].getAttribute('aria-required')).to.equal('true');
  expect(radios[1].privateRequired).to.be.true;
  expect(radios[1].getAttribute('aria-required')).to.equal('true');
});

it('can be disabled', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].disabled).to.be.true;
  expect(radios[0].ariaDisabled).to.equal('true');
  expect(radios[1].disabled).to.be.true;
  expect(radios[1].ariaDisabled).to.equal('true');
});

it('sets `value` when a radio is checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
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

  expect(component.value).to.equal('two');
});

it('makes the first enabled radio tabbable', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group>
      <glide-core-radio-group-radio
        label="One"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].tabIndex).to.equal(-1);
  expect(radios[1].tabIndex).to.equal(0);
});

it('makes radios untabbable when disabled', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group disabled>
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].tabIndex).to.equal(-1);
  expect(radios[1].tabIndex).to.equal(-1);
  expect(radios[2].tabIndex).to.equal(-1);
});

it('throws if it does not have a default slot', async () => {
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
