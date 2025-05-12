import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import RadioGroup from './radio-group.js';
import './radio-group.radio.js';
import { click } from './library/mouse.js';

it('focuses an enabled radio on click', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radio = host.querySelector('glide-core-radio-group-radio');

  await click(radio);

  expect(radio).to.have.focus;
});

it('does not focus a disabled radio on click', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="Label"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radio = host.querySelector('glide-core-radio-group-radio');
  await click(radio);

  expect(radio?.shadowRoot?.activeElement).to.be.null;
});

it('focuses the first enabled radio when `focus()` is called', async () => {
  const host = await fixture<RadioGroup>(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="Label"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  await sendKeys({ press: 'Tab' });

  expect(document.activeElement).to.equal(
    host.querySelector('glide-core-radio-group-radio:nth-of-type(2)'),
  );
});

it('focuses the first radio after submit when it is `required` and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture(
    html`<glide-core-radio-group label="Label" required>
      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const radio = host.querySelector('glide-core-radio-group-radio');

  expect(radio).to.have.focus;
});

it('focuses the first radio after `reportValidity()` is called when it is `required` and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<RadioGroup>(
    html`<glide-core-radio-group label="Label" required>
      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  host.reportValidity();

  expect(document.activeElement).to.equal(
    host.querySelector('glide-core-radio-group-radio'),
  );
});

it('focuses the first radio after `requestSubmit()` is called when the group is `required` and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture(
    html`<glide-core-radio-group label="Label" required>
      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    host.querySelector('glide-core-radio-group-radio'),
  );
});

it('does not focus a radio after `checkValidity()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<RadioGroup>(
    html`<glide-core-radio-group label="Label" required>
      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  host.checkValidity();

  expect(document.activeElement).to.not.equal(
    host.querySelector('glide-core-radio-group-radio'),
  );
});

it('focuses the first enabled radio when none are checked and `focus()` is called', async () => {
  const host = await fixture<RadioGroup>(
    html`<glide-core-radio-group label="Label" required>
      <glide-core-radio-group-radio
        label="Label"
        disabled
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  await sendKeys({ press: 'Tab' });

  const radio = host.querySelector(
    'glide-core-radio-group-radio:nth-of-type(2)',
  );

  expect(radio).to.have.focus;
});

it('moves focus when arrowing', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio
        label="Label"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        disabled
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');
  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowRight' });
  expect(document.activeElement).to.equal(radios[1]);

  await sendKeys({ press: 'ArrowDown' });
  expect(document.activeElement).to.equal(radios[0]);

  await sendKeys({ press: 'ArrowUp' });
  expect(document.activeElement).to.equal(radios[1]);

  await sendKeys({ press: 'ArrowLeft' });
  expect(document.activeElement).to.equal(radios[0]);
});
