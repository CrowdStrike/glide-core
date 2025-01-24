import './radio-group.radio.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreRadioGroup from './radio-group.js';

it('sets `checked` on radios when the `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Radio Group">
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
    </glide-core-radio-group>
  `);

  component.value = 'one';

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.false;
});

it('checks and unchecks its radios on click', async () => {
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

  await click(radios[2]);

  expect(radios[0].checked).to.be.false;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.true;
});

it('changes the `checked` attribute when pressing arrow and space keys', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[0].checked).to.be.false;
  expect(radios[1].checked).to.be.true;
  expect(radios[2].checked).to.be.false;

  await sendKeys({ press: 'ArrowDown' });

  expect(radios[0].checked).to.be.false;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.true;

  await sendKeys({ press: 'ArrowUp' });

  expect(radios[0].checked).to.be.false;
  expect(radios[1].checked).to.be.true;
  expect(radios[2].checked).to.be.false;

  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.false;

  radios[2].focus();

  await sendKeys({ press: ' ' });

  expect(radios[0].checked).to.be.false;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.true;
});

it('does not change the `checked` attribute when pressing arrow and space keys when the group is `disabled`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name" disabled>
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.false;

  await sendKeys({ press: 'ArrowDown' });

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.false;

  await sendKeys({ press: 'ArrowUp' });

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.false;

  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.false;

  radios[1].focus();
  await sendKeys({ press: ' ' });

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.false;
});

it('selectes a radio on Space', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(radios[2].checked).to.be.false;
});

it('updates `value` when the `checked` attribute of radios are changed programmatically', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  radios[0].checked = false;
  radios[1].checked = true;

  await component.updateComplete;

  expect(component.value).to.equal('two');
});

it('updates `value` when the `value` of a checked radio is changed programmatically', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Radio Group">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radio = component.querySelector('glide-core-radio-group-radio');

  assert(radio);

  radio.value = 'three';

  await component.updateComplete;

  expect(component.value).to.equal('three');
});

it('updates `value` when the `value` of a checked radio is emptied programmatically', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Radio Group">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radio = component.querySelector('glide-core-radio-group-radio');
  assert(radio);

  radio.value = '';
  await component.updateComplete;

  expect(component.value).to.equal('');
});

it('enables the disabled radio when `value` is set programmatically', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Radio Group">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  component.value = 'one';

  const radio = component.querySelector('glide-core-radio-group-radio');

  expect(radio?.disabled).to.be.false;
});

it('updates the tabbable state of each Radio based on programmatic updates to `checked`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group>
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

  expect(radios[0].tabIndex).to.equal(-1);
  expect(radios[1].tabIndex).to.equal(-1);
  expect(radios[2].tabIndex).to.equal(0);

  radios[2].checked = false;
  radios[0].checked = true;
  radios[1].checked = false;

  await component.updateComplete;

  expect(radios[0].tabIndex).to.equal(0);
  expect(radios[1].tabIndex).to.equal(-1);
  expect(radios[2].tabIndex).to.equal(-1);
});

it('updates the tabbable state of each Radio based on programmatic updates to `value`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group value="three">
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

  expect(radios[0].tabIndex).to.equal(-1);
  expect(radios[1].tabIndex).to.equal(-1);
  expect(radios[2].tabIndex).to.equal(0);

  component.value = 'two';

  await component.updateComplete;

  expect(radios[0].tabIndex).to.equal(-1);
  expect(radios[1].tabIndex).to.equal(0);
  expect(radios[2].tabIndex).to.equal(-1);
});

// TODO: wtf
it('renders radios as disabled when disabled is programmatically set and removed on the group', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label" value="one">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radio = document.querySelector('glide-core-radio-group-radio');

  assert(radio);

  expect(radio.disabled).to.be.false;
  expect(radio.ariaDisabled).to.equal('false');
  expect(radio.shadowRoot?.querySelector('.disabled')).to.be.null;

  component.disabled = true;
  await component.updateComplete;

  expect(radio.hasAttribute('disabled')).to.be.true;
  expect(radio.ariaDisabled).to.equal('true');
  expect(radio.shadowRoot?.querySelector('.disabled')).to.be.not.null;

  component.disabled = false;
  await component.updateComplete;

  expect(radio.disabled).to.be.false;
  expect(radio.ariaDisabled).to.equal('false');
  expect(radio.shadowRoot?.querySelector('.disabled')).to.be.null;
});
