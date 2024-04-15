import './button-group-button.js';
import { expect, fixture, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsButtonGroup from './button-group.js';
import CsButtonGroupButton from './button-group-button.js';

CsButtonGroup.shadowRootOptions.mode = 'open';
CsButtonGroupButton.shadowRootOptions.mode = 'open';

it('emits a private change event when clicked', async () => {
  const template = `<cs-button-group-button value="value">Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector('li');
  setTimeout(() => {
    liElement?.click();
  });
  const changeEvent = await oneEvent(element, 'cs-private-change');

  expect(changeEvent instanceof Event).to.be.true;
});

it('emits a private input event when clicked', async () => {
  const template = `<cs-button-group-button value="value">Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector('li');
  setTimeout(() => {
    liElement?.click();
  });
  const inputEvent = await oneEvent(element, 'cs-private-input');

  expect(inputEvent instanceof Event).to.be.true;
});

it('emits a private change event when arrow and space keys are pressed', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2" selected>Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  setTimeout(async () => {
    await sendKeys({ press: 'Tab' });
  });

  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];

  for (const key of keys) {
    setTimeout(async () => {
      await sendKeys({ press: key });
    });

    const index = ['ArrowLeft', 'ArrowUp'].includes(key) ? 0 : 1;
    const changeEvent = await oneEvent(
      buttonElements[index],
      'cs-private-change',
    );
    expect(changeEvent instanceof Event).to.be.true;
  }
});

it('emits a private input event when arrow and space keys are pressed', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2" selected>Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  setTimeout(async () => {
    await sendKeys({ press: 'Tab' });
  });

  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];

  for (const key of keys) {
    setTimeout(async () => {
      await sendKeys({ press: key });
    });

    const index = ['ArrowLeft', 'ArrowUp'].includes(key) ? 0 : 1;
    const inputEvent = await oneEvent(
      buttonElements[index],
      'cs-private-input',
    );
    expect(inputEvent instanceof Event).to.be.true;
  }
});
