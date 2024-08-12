/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button-group.button.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButtonGroup from './button-group.js';
import GlideCoreButtonGroupButton from './button-group.button.js';

GlideCoreButtonGroup.shadowRootOptions.mode = 'open';
GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('selects a button when clicked', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  buttons[1]?.click();
  await elementUpdated(component);

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.true;
});

it('selects buttons when arrowing', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        disabled
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Three"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Four"
        disabled
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');
  buttons[1]?.focus();

  await sendKeys({ press: 'ArrowRight' });
  expect(buttons[2].selected).to.be.true;

  await sendKeys({ press: 'ArrowDown' });
  expect(buttons[1].selected).to.be.true;

  await sendKeys({ press: 'ArrowLeft' });
  expect(buttons[2].selected).to.be.true;

  await sendKeys({ press: 'ArrowUp' });
  expect(buttons[1].selected).to.be.true;
});

it('selects a button on Space', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');
  buttons[1]?.focus();

  await sendKeys({ press: 'Space' });

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.true;
});

it('does not select a disabled button', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
        disabled
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');
  buttons[1]?.click();

  expect(buttons[0].selected).to.be.true;
  expect(buttons[1].selected).to.be.false;
});
