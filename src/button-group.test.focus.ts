/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButtonGroupButton from './button-group.button.js';
import GlideCoreButtonGroup from './button-group.js';

GlideCoreButtonGroup.shadowRootOptions.mode = 'open';
GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('moves focus', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
        disabled
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Three"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Four"
        selected
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = component.querySelectorAll('glide-core-button-group-button');
  buttons[3]?.focus();

  await sendKeys({ press: 'ArrowRight' });
  expect(buttons[0]).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(buttons[3]).to.have.focus;

  await sendKeys({ press: 'ArrowLeft' });
  expect(buttons[2]).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(buttons[3]).to.have.focus;
});
