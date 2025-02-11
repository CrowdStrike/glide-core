import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './button-group.button.js';
import { click } from './library/mouse.js';
import GlideCoreButtonGroup from './button-group.js';

it('selects a button on click', async () => {
  const host = await fixture<GlideCoreButtonGroup>(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = host.querySelectorAll('glide-core-button-group-button');

  await click(buttons[1]);
  await host.updateComplete;

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.true;
});

it('selects a button on `click()`', async () => {
  const host = await fixture<GlideCoreButtonGroup>(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = host.querySelectorAll('glide-core-button-group-button');

  buttons[1].click();
  await host.updateComplete;

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.true;
});

it('selects buttons when arrowing', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
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

  const buttons = host.querySelectorAll('glide-core-button-group-button');
  await sendKeys({ press: 'Tab' });

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
  const host = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = host.querySelectorAll('glide-core-button-group-button');

  buttons[1]?.focus();
  await sendKeys({ press: ' ' });

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.true;
});

it('does not select a disabled button', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
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

  const buttons = host.querySelectorAll('glide-core-button-group-button');

  await click(buttons[1]);

  expect(buttons[0].selected).to.be.true;
  expect(buttons[1].selected).to.be.false;
});
