import './radio-group.radio.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreRadioGroup from './radio-group.js';

it('checks a radio when `value` is set programmatically', async () => {
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

  host.value = 'one';
  await host.updateComplete;

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.checked).to.be.true;
  expect(radios[1]?.checked).to.be.false;
});

it('unchecks the checked radio when a new one is checked programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[0]);
  radios[0].checked = true;

  await host.updateComplete;

  expect(radios[1]?.checked).to.be.false;
  expect(radios[2]?.checked).to.be.false;
});

it('checks a radio on click', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  await click(radios[1]);

  expect(radios[0]?.checked).to.be.false;
  expect(radios[1]?.checked).to.be.true;
});

it('checks radios when arrowing', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label">
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

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[0]?.checked).to.be.false;
  expect(radios[1]?.checked).to.be.true;
  expect(radios[2]?.checked).to.be.false;

  await sendKeys({ press: 'ArrowDown' });

  expect(radios[0]?.checked).to.be.false;
  expect(radios[1]?.checked).to.be.false;
  expect(radios[2]?.checked).to.be.true;

  await sendKeys({ press: 'ArrowUp' });

  expect(radios[0]?.checked).to.be.false;
  expect(radios[1]?.checked).to.be.true;
  expect(radios[2]?.checked).to.be.false;

  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0]?.checked).to.be.true;
  expect(radios[1]?.checked).to.be.false;
  expect(radios[2]?.checked).to.be.false;
});

it('does not check radios when arrowing when the group is disabled', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio
        label="One"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[0]?.checked).to.be.true;
  expect(radios[1]?.checked).to.be.false;
  expect(radios[2]?.checked).to.be.false;

  await sendKeys({ press: 'ArrowDown' });

  expect(radios[0]?.checked).to.be.true;
  expect(radios[1]?.checked).to.be.false;
  expect(radios[2]?.checked).to.be.false;

  await sendKeys({ press: 'ArrowUp' });

  expect(radios[0]?.checked).to.be.true;
  expect(radios[1]?.checked).to.be.false;
  expect(radios[2]?.checked).to.be.false;

  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0]?.checked).to.be.true;
  expect(radios[1]?.checked).to.be.false;
  expect(radios[2]?.checked).to.be.false;

  radios[1]?.focus();
  await sendKeys({ press: ' ' });

  expect(radios[0]?.checked).to.be.true;
  expect(radios[1]?.checked).to.be.false;
  expect(radios[2]?.checked).to.be.false;
});

it('checks a radio on Space', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(radios[0]?.checked).to.be.true;
  expect(radios[1]?.checked).to.be.false;
});

it('updates `value` when a radio is checked programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label">
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

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[0]);
  assert(radios[1]);

  radios[0].checked = false;
  radios[1].checked = true;

  await host.updateComplete;

  expect(host.value).to.equal('two');
});

it('updates `value` when the `value` of a checked radio is set programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
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

  const radio = host.querySelector('glide-core-radio-group-radio');

  assert(radio);
  radio.value = 'three';

  expect(host.value).to.equal('three');
});

it('updates `value` when the `value` of a checked radio is emptied programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
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

  const radio = host.querySelector('glide-core-radio-group-radio');

  assert(radio);
  radio.value = '';

  expect(host.value).to.be.empty.string;
});

it('enables radios when `value` is set programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
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

  host.value = 'one';

  const radio = host.querySelector('glide-core-radio-group-radio');
  expect(radio?.disabled).to.be.false;
});

it('updates the tabbable state of each radio when a radio is checked programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[0]);
  radios[0].checked = true;
  await host.updateComplete;

  expect(radios[0].tabIndex).to.equal(0);
  expect(radios[1]?.tabIndex).to.equal(-1);
});

it('disables radios when the group is disabled programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  host.disabled = true;
  await host.updateComplete;

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.hasAttribute('disabled')).to.be.true;
  expect(radios[0]?.ariaDisabled).to.equal('true');
  expect(radios[1]?.hasAttribute('disabled')).to.be.true;
  expect(radios[1]?.ariaDisabled).to.equal('true');
});

it('enables radios when the group is enabled programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  host.disabled = false;
  await host.updateComplete;

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.hasAttribute('disabled')).to.be.false;
  expect(radios[0]?.ariaDisabled).to.equal('false');
  expect(radios[1]?.hasAttribute('disabled')).to.be.false;
  expect(radios[1]?.ariaDisabled).to.equal('false');
});

it('makes the first enabled radio tabbable when the group is enabled programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  host.disabled = false;
  await host.updateComplete;

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.tabIndex).to.equal(0);
  expect(radios[1]?.tabIndex).to.equal(-1);
  expect(radios[2]?.tabIndex).to.equal(-1);
});

it('makes the last checked radio tabbable when the group is enabled programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  host.disabled = false;
  await host.updateComplete;

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.tabIndex).to.equal(-1);
  expect(radios[1]?.tabIndex).to.equal(-1);
  expect(radios[2]?.tabIndex).to.equal(0);
});

it('does not check a radio on click when it is disabled', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio
        label="One"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');
  await click(radios[1]);

  expect(radios[0]?.hasAttribute('checked')).to.be.true;
  expect(radios[1]?.hasAttribute('checked')).to.be.false;
});

it('does not check a disabled radio when clicked', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="One"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        disabled
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');
  await click(radios[1]);

  expect(radios[0]?.hasAttribute('checked')).to.be.true;
  expect(radios[1]?.hasAttribute('checked')).to.be.false;
});

it('makes the selected radio tabbable when `value` is set programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" value="one">
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

  host.value = 'two';
  await host.updateComplete;

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.tabIndex).to.equal(-1);
  expect(radios[1]?.tabIndex).to.equal(0);
});

it('makes the next enabled radio tabbable when the current one is disabled programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[0]);
  radios[0].disabled = true;

  expect(radios[0]?.tabIndex).to.equal(-1);
  expect(radios[1]?.tabIndex).to.equal(0);
  expect(radios[2]?.tabIndex).to.equal(-1);
});

it('makes the first enabled radio tabbable when the current one is disabled programmatically', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="Label"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[3]);
  radios[3].disabled = true;

  expect(radios[0]?.tabIndex).to.equal(-1);
  expect(radios[1]?.tabIndex).to.equal(0);
  expect(radios[2]?.tabIndex).to.equal(-1);
});

it('makes a radio tabbable when it is enabled programmatically and no other radio is tabbable', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="Label"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
        disabled
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[1]);
  radios[1].disabled = false;

  expect(radios[0]?.tabIndex).to.equal(-1);
  expect(radios[1].tabIndex).to.equal(0);
  expect(radios[2]?.tabIndex).to.equal(-1);
});

it('updates its `value` when a checked radio is programmatically enabled', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
        disabled
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[1]);
  radios[1].disabled = false;

  expect(host.value).to.equal('two');
});

it('updates its `value` when a checked radio is programmatically disabled', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[1]);
  radios[1].disabled = true;

  expect(host.value).to.equal('one');
});

it('updates its `value` when the group is programmatically enabled', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label" disabled>
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  host.disabled = false;
  await host.updateComplete;

  expect(host.value).to.equal('two');
});

it('updates its `value` when the group is programmatically disabled', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
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

  host.disabled = true;
  await host.updateComplete;

  expect(host.value).to.be.empty.string;
});

it('retains its `value` when the `value` of a checked radio that is not the last enabled one is changed', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
        checked
        disabled
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[0]);
  radios[0].value = 'test';

  expect(host.value).to.equal('two');
});

it('updates its `value` when the last checked and enabled radio is unchecked', async () => {
  const host = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
        checked
        disabled
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>
  `);

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  assert(radios[1]);
  radios[1].checked = false;

  expect(host.value).to.equal('two');
});
