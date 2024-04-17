import './button-group-button.js';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsButtonGroup from './button-group.js';
import CsButtonGroupButton from './button-group-button.js';
import sinon from 'sinon';

CsButtonGroup.shadowRootOptions.mode = 'open';
CsButtonGroupButton.shadowRootOptions.mode = 'open';

it('emits a change event when a button is clicked', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>    
  </cs-button-group>`;
  const element = await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  const liElement = buttonElements[0].shadowRoot!.querySelector('li');

  expect(liElement).to.exist;

  setTimeout(() => liElement?.click());
  const changeEvent = await oneEvent(element, 'button-group-change');

  expect(changeEvent instanceof Event).to.be.true;
});

it('emits an input event when a button is clicked', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>    
  </cs-button-group>`;
  const element = await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  const liElement = buttonElements[0].shadowRoot!.querySelector('li');

  expect(liElement).to.exist;

  setTimeout(() => liElement?.click());
  const inputEvent = await oneEvent(element, 'button-group-input');

  expect(inputEvent instanceof Event).to.be.true;
});

it('emits a change event when an arrow key is pressed ', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>
  </cs-button-group>`;
  const element = await fixture(template);
  await sendKeys({ press: 'Tab' });
  const keys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

  for (const key of keys) {
    setTimeout(async () => {
      await sendKeys({ press: key });
    });

    const changeEvent = await oneEvent(element, 'button-group-change');
    expect(changeEvent instanceof Event).to.be.true;
  }
});

it('emits a change event when a space key is pressed on a button that is not selected', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
  </cs-button-group>`;
  const element = await fixture(template);
  setTimeout(async () => {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: ' ' });
  });
  const changeEvent = await oneEvent(element, 'button-group-change');

  expect(changeEvent instanceof Event).to.be.true;
});

it('does not emit a change event when a space key is pressed on a selected button', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1" selected>Button 1</cs-button-group-button>
  </cs-button-group>`;
  const element = await fixture(template);
  const spy = sinon.spy();
  element.addEventListener('button-group-change', spy);
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('emits an input event when an arrow key is pressed ', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>
  </cs-button-group>`;
  const element = await fixture(template);
  setTimeout(async () => {
    await sendKeys({ press: 'Tab' });
  });
  const keys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

  for (const key of keys) {
    setTimeout(async () => {
      await sendKeys({ press: key });
    });

    const inputEvent = await oneEvent(element, 'button-group-input');
    expect(inputEvent instanceof Event).to.be.true;
  }
});

it('emits a input event when an space key is pressed that is not selected', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
  </cs-button-group>`;
  const element = await fixture(template);
  setTimeout(async () => {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: ' ' });
  });
  const inputEvent = await oneEvent(element, 'button-group-input');

  expect(inputEvent instanceof Event).to.be.true;
});

it('does not emit an input event when a space key is pressed on a selected button', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1" selected>Button 1</cs-button-group-button>
  </cs-button-group>`;
  const element = await fixture(template);
  const spy = sinon.spy();
  element.addEventListener('button-group-input', spy);
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('throws an error when an element other than `cs-button-group-button` is a child of the default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`
      <cs-button-group>
        <div>Content</div>
      </cs-button-group>
    `);
  } catch {
    spy();
  }

  expect(spy.called).to.be.true;
});
