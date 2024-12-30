/* eslint-disable @typescript-eslint/no-unused-expressions */

import './radio-group.js';
import './radio-group.radio.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreRadio from './radio-group.radio.js';
import GlideCoreRadioGroup from './radio-group.js';
import click from './library/click.js';

GlideCoreRadio.shadowRootOptions.mode = 'open';
GlideCoreRadioGroup.shadowRootOptions.mode = 'open';

it('focuses the checked Radio after it is clicked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radio = component.querySelector('glide-core-radio');

  await click(radio);

  expect(radio).to.have.focus;
});

it('focuses the first non-disabled Radio when `focus()` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio label="One" value="one" disabled></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  component.focus();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-radio[value="two"]'),
  );
});

it('focuses the first Radio after submit when the group is `required` and the Radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio label="One" value="one"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const radio = component.querySelector('glide-core-radio');

  expect(radio).to.have.focus;
});

it('focuses the first Radio after `reportValidity()` is called when the group is `required` and the Radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio label="One" value="one"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  component.reportValidity();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-radio'),
  );
});

it('focuses the first Radio after `requestSubmit()` is called when the group is `required` and the Radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio label="One" value="one"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-radio'),
  );
});

it('does not focus a Radio after `checkValidity()` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio label="One" value="one"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  component.checkValidity();

  expect(document.activeElement).to.not.equal(
    component.querySelector('glide-core-radio'),
  );
});

it('focuses the first checked Radio when `focus()` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" checked></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  component.focus();

  const radio = component.querySelector('glide-core-radio[value="two"]');
  expect(radio).to.have.focus;
});

it('focuses the checked Radio using `value` on the group when `focus()` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" value="three">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  await elementUpdated(component);

  component.focus();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-radio[value="three"]'),
  );
});

it('focuses the first tabbable Radio when none are checked when `focus()` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio label="One" value="one" disabled></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  component.focus();

  const radio = component.querySelector('glide-core-radio[value="two"]');
  expect(radio).to.have.focus;
});

it('moves focus to the next Radio when the right arrow key is pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[1]).to.have.focus;
});

it('moves focus to the next Radio when the down arrow key is pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  expect(radios[1]).to.have.focus;
});

it('moves focus to the next enabled Radio when the right arrow key is pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two" disabled></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[2]).to.have.focus;
});

it('moves focus to the next enabled Radio when the down key is pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two" disabled></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  expect(radios[2]).to.have.focus;
});

it('moves focus to the previous Radio when the left arrow key is pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three" checked></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[1]).to.have.focus;
});

it('moves focus to the previous Radio when the up arrow key is pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three" checked></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  expect(radios[1]).to.have.focus;
});

it('moves focus to the previous enabled Radio when the left arrow key is pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" disabled></glide-core-radio>
      <glide-core-radio label="Three" value="three" checked></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0]).to.have.focus;
});

it('moves focus to the previous enabled Radio when the up arrow key is pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" disabled></glide-core-radio>
      <glide-core-radio label="Three" value="three" checked></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  expect(radios[0]).to.have.focus;
});

it('moves focus to the last Radio when the left arrow key is pressed on the first Radio', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[2]).to.have.focus;
});

it('moves focus to the last Radio when the up arrow key is pressed on the first Radio', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  expect(radios[2]).to.have.focus;
});

it('moves focus to the first Radio when the right arrow key is pressed on the last Radio', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three" checked></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[0]).to.have.focus;
});

it('moves focus to the first Radio when the down arrow key is pressed on the last Radio', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three" checked></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  expect(radios[0]).to.have.focus;
});

it('moves focus to the last enabled Radio when the left arrow key is pressed on first Radio', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
      <glide-core-radio label="Four" value="four" disabled></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[2]).to.have.focus;
});

it('moves focus to the highest-index enabled Radio when the up arrow key is pressed on first Radio', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
      <glide-core-radio label="Four" value="four" disabled></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  expect(radios[2]).to.have.focus;
});

it('moves focus to the first enabled Radio when the right arrow key is pressed on last Radio', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" disabled></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
      <glide-core-radio label="Four" value="four" checked></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[1]).to.have.focus;
});

it('moves focus to the lowest-index enabled Radio when the down arrow key is pressed on last Radio', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one" disabled></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
      <glide-core-radio label="Three" value="three"></glide-core-radio>
      <glide-core-radio label="Four" value="four" checked></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  expect(radios[1]).to.have.focus;
});

it('does not move focus if there is only one Radio when pressing arrow keys', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radio = component.querySelector('glide-core-radio');
  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowLeft' });
  expect(radio).to.have.focus;

  await sendKeys({ press: 'ArrowRight' });
  expect(radio).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(radio).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(radio).to.have.focus;
});
