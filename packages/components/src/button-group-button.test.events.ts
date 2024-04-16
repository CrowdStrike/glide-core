import './button-group-button.js';
import { aTimeout, expect, fixture, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsButtonGroup from './button-group.js';
import CsButtonGroupButton from './button-group-button.js';
import sinon from 'sinon';

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

it('emits a private change event when arrow keys are pressed', async () => {
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

  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

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

it('emits a private input event when arrow keys are pressed', async () => {
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
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

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

it('moves focus to previous button when left or up arrow keys are pressed', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3" selected>Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(buttonElements[1]).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(buttonElements[0]).to.have.focus;
});

it('moves focus to last button when left or up arrow keys are pressed on the first button', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1" selected>Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
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
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1" selected>Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(buttonElements[1]).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(buttonElements[2]).to.have.focus;
});

it('moves focus to first button when right or down arrow keys are pressed on the last button', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3" selected>Button 3</cs-button-group-button>
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(buttonElements[0]).to.have.focus;

  buttonElements[2].focus();
  await sendKeys({ press: ' ' });

  await sendKeys({ press: 'ArrowDown' });
  expect(buttonElements[0]).to.have.focus;
});

it('moves focus to previous enabled button when pressing left or up arrow keys', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2" disabled>Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3" selected>Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(buttonElements[0]).to.have.focus;

  buttonElements[2].focus();
  await sendKeys({ press: ' ' });

  await sendKeys({ press: 'ArrowUp' });
  expect(buttonElements[0]).to.have.focus;
});

it('moves focus to next enabled button when pressing right or down arrow keys', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1" selected>Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2" disabled>Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(buttonElements[2]).to.have.focus;

  buttonElements[0].focus();
  await sendKeys({ press: ' ' });

  await sendKeys({ press: 'ArrowDown' });
  expect(buttonElements[2]).to.have.focus;
});

it('does not move focus if there is only one button when pressing arrow keys', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
  </cs-button-group>`;
  await fixture(template);
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  await sendKeys({ press: 'Tab' });

  for (const key of keys) {
    await sendKeys({ press: key });
    expect(buttonElement).to.have.focus;
  }
});

it('emits a private change event when a space key is pressed and is not selected', async () => {
  const template = `<cs-button-group><cs-button-group-button value="value-1">Button 1</cs-button-group-button></cs-button-group>`;
  await fixture(template);
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  setTimeout(async () => {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: ' ' });
  });
  const changeEvent = await oneEvent(buttonElement!, 'cs-private-change');

  expect(changeEvent instanceof Event).to.be.true;
});

it('does not emit private change event when a space key is pressed and is selected', async () => {
  const template = `<cs-button-group><cs-button-group-button value="value-1" selected>Button 1</cs-button-group-button></cs-button-group>`;
  await fixture(template);
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  const spy = sinon.spy();
  buttonElement!.addEventListener('cs-private-change', spy);
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('emits a private input event when a space key is pressed and is not selected', async () => {
  const template = `<cs-button-group><cs-button-group-button value="value-1">Button 1</cs-button-group-button></cs-button-group>`;
  await fixture(template);
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  setTimeout(async () => {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: ' ' });
  });
  const inputEvent = await oneEvent(buttonElement!, 'cs-private-input');

  expect(inputEvent instanceof Event).to.be.true;
});

it('does not emit private input event when a space key is pressed and is selected', async () => {
  const template = `<cs-button-group><cs-button-group-button value="value-1" selected>Button 1</cs-button-group-button></cs-button-group>`;
  await fixture(template);
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  const spy = sinon.spy();
  buttonElement!.addEventListener('cs-private-input', spy);
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});
