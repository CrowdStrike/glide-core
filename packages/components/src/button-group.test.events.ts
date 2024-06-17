import './button-group.button.js';
import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButtonGroup from './button-group.js';
import GlideCoreButtonGroupButton from './button-group.button.js';

GlideCoreButtonGroup.shadowRootOptions.mode = 'open';
GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('emits a change event when arrow keys are pressed', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2" selected
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });

  // This pattern is adopted from https://open-wc.org/docs/testing/helpers/#testing-events
  // Without the setTimeout the test fails. An `await` is used since `sendKeys` returns a
  // promise, however the test seems to work without it. Keeping `await` here until this can
  // be investigated further.
  setTimeout(async () => await sendKeys({ press: 'ArrowLeft' }));
  const changeEventLeft = await oneEvent(buttonElements[0], 'change');

  expect(changeEventLeft instanceof Event).to.be.true;
  expect(changeEventLeft.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowRight' }));
  const changeEventRight = await oneEvent(buttonElements[1], 'change');

  expect(changeEventRight instanceof Event).to.be.true;
  expect(changeEventRight.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowUp' }));
  const changeEventUp = await oneEvent(buttonElements[0], 'change');

  expect(changeEventUp instanceof Event).to.be.true;
  expect(changeEventUp.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowDown' }));
  const changeEventDown = await oneEvent(buttonElements[1], 'change');

  expect(changeEventDown instanceof Event).to.be.true;
  expect(changeEventDown.bubbles).to.be.true;
});

it('emits an input event when arrow keys are pressed', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2" selected
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });

  setTimeout(async () => await sendKeys({ press: 'ArrowLeft' }));
  const inputEventLeft = await oneEvent(buttonElements[0], 'input');

  expect(inputEventLeft instanceof Event).to.be.true;
  expect(inputEventLeft.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowRight' }));
  const inputEventRight = await oneEvent(buttonElements[1], 'input');

  expect(inputEventRight instanceof Event).to.be.true;
  expect(inputEventRight.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowUp' }));
  const inputEventUp = await oneEvent(buttonElements[0], 'input');

  expect(inputEventUp instanceof Event).to.be.true;
  expect(inputEventUp.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowDown' }));
  const inputEventDown = await oneEvent(buttonElements[1], 'input');

  expect(inputEventDown instanceof Event).to.be.true;
  expect(inputEventDown.bubbles).to.be.true;
});

it('moves focus to previous button when left or up arrow keys are pressed', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3" selected
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(buttonElements[1]).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(buttonElements[0]).to.have.focus;
});

it('moves focus to last button when left or up arrow keys are pressed on the first button', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1" selected
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(buttonElements[2]).to.have.focus;

  buttonElements[0].focus();
  await sendKeys({ press: ' ' });

  await sendKeys({ press: 'ArrowUp' });
  expect(buttonElements[2]).to.have.focus;
});

it('moves focus to next button when right or down arrow keys are pressed', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1" selected
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(buttonElements[1]).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(buttonElements[2]).to.have.focus;
});

it('moves focus to first button when right or down arrow keys are pressed on the last button', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3" selected
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(buttonElements[0]).to.have.focus;

  buttonElements[2].focus();
  await sendKeys({ press: ' ' });
  expect(buttonElements[2]).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(buttonElements[0]).to.have.focus;
});

it('moves focus to previous enabled button when pressing left or up arrow keys', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2" disabled
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3" selected
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(buttonElements[0]).to.have.focus;

  buttonElements[2].focus();
  await sendKeys({ press: ' ' });
  expect(buttonElements[2]).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(buttonElements[0]).to.have.focus;
});

it('moves focus to next enabled button when pressing right or down arrow keys', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1" selected
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2" disabled
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(buttonElements[2]).to.have.focus;

  buttonElements[0].focus();
  await sendKeys({ press: ' ' });
  expect(buttonElements[0]).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(buttonElements[2]).to.have.focus;
});

it('does not move focus if there is only one button when pressing arrow keys', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElement = document.querySelector(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowLeft' });
  expect(buttonElement).to.have.focus;

  await sendKeys({ press: 'ArrowRight' });
  expect(buttonElement).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(buttonElement).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(buttonElement).to.have.focus;
});

it('changes the "selected" attribute when clicking', async () => {
  const element = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1" selected
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  const liElement = buttonElements[2].shadowRoot!.querySelector('li');
  expect(liElement).to.exist;
  liElement?.click();
  await elementUpdated(element);

  expect(buttonElements[2]).to.have.focus;
  expect(buttonElements[2]).to.have.attribute('selected');
  expect(buttonElements[0]).to.not.have.attribute('selected');
});

it('does not change focus nor the "selected" attribute when clicking a disabled button', async () => {
  const element = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1" selected
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2" disabled
        >Button 2</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });
  const liElement = buttonElements[0].shadowRoot!.querySelector('li');
  expect(liElement).to.exist;
  liElement?.click();
  await elementUpdated(element);

  expect(buttonElements[0]).to.have.focus;
  expect(buttonElements[0]).to.have.attribute('selected');
  expect(buttonElements[1]).to.not.have.attribute('selected');
});

it('changes the "selected" attribute when pressing arrow and space keys', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1" selected
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(buttonElements[1]).to.have.focus;
  expect(buttonElements[1]).to.have.attribute('selected');
  expect(buttonElements[0]).to.not.have.attribute('selected');

  await sendKeys({ press: 'ArrowDown' });

  expect(buttonElements[2]).to.have.focus;
  expect(buttonElements[2]).to.have.attribute('selected');
  expect(buttonElements[1]).to.not.have.attribute('selected');

  await sendKeys({ press: 'ArrowUp' });

  expect(buttonElements[1]).to.have.focus;
  expect(buttonElements[1]).to.have.attribute('selected');
  expect(buttonElements[2]).to.not.have.attribute('selected');

  await sendKeys({ press: 'ArrowLeft' });

  expect(buttonElements[0]).to.have.focus;
  expect(buttonElements[0]).to.have.attribute('selected');
  expect(buttonElements[1]).to.not.have.attribute('selected');

  buttonElements[2].focus();
  await sendKeys({ press: ' ' });
  expect(buttonElements[2]).to.have.focus;
  expect(buttonElements[2]).to.have.attribute('selected');
  expect(buttonElements[0]).to.not.have.attribute('selected');
});
