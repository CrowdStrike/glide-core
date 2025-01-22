/* eslint-disable @typescript-eslint/no-unused-expressions */

import './radio-group.radio.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreRadioGroup from './radio-group.js';

GlideCoreRadioGroup.shadowRootOptions.mode = 'open';

it('sets `checked` on Radios when the `value` is changed programmatically', async () => {
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

it('checks and unchecks Radios via click', async () => {
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

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2].hasAttribute('checked')).to.be.true;
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

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[1].hasAttribute('checked')).to.be.true;
  expect(radios[2]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowDown' });

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2].hasAttribute('checked')).to.be.true;

  await sendKeys({ press: 'ArrowUp' });

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[1].hasAttribute('checked')).to.be.true;
  expect(radios[2]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');

  radios[2].focus();

  await sendKeys({ press: ' ' });

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2].hasAttribute('checked')).to.be.true;
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

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowDown' });

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowUp' });

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');

  radios[1].focus();
  await sendKeys({ press: ' ' });

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');
});

it('uses the spacebar to check a Radio from the group when none are selected', async () => {
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

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');
});

it('updates `value` when the `checked` attribute of Radios are changed programmatically', async () => {
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

it('updates `value` when the `value` of a checked Radio is changed programmatically', async () => {
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

it('updates `value` when the `value` of a checked Radio is emptied programmatically', async () => {
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

it('enables a disabled Radio when `value` is set programmatically', async () => {
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
