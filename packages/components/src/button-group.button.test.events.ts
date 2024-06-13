import './button-group.button.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButtonGroupButton from './button-group.button.js';
import sinon from 'sinon';

GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('emits a change event when clicked', async () => {
  const element = await fixture(
    html`<glide-core-button-group-button value="value"
      >Button</glide-core-button-group-button
    >`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  // This pattern is adopted from https://open-wc.org/docs/testing/helpers/#testing-events
  // Without setTimeout the test fails. The suspicion is this is related to task scheduling,
  // however this can be investigated later.
  setTimeout(() => {
    liElement?.click();
  });

  const changeEvent = await oneEvent(element, 'change');

  expect(changeEvent instanceof Event).to.be.true;
});

it('emits an input event when clicked', async () => {
  const element = await fixture(
    html`<glide-core-button-group-button value="value"
      >Button</glide-core-button-group-button
    >`,
  );

  const liElement = element.shadowRoot!.querySelector('li');

  setTimeout(() => {
    liElement?.click();
  });

  const inputEvent = await oneEvent(element, 'input');

  expect(inputEvent instanceof Event).to.be.true;
});

it('emits a change event when a space key is pressed and is not already selected', async () => {
  const buttonElement = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button value="value-1"
      >Button 1</glide-core-button-group-button
    >`,
  );

  buttonElement.focus();

  setTimeout(async () => {
    await sendKeys({ press: ' ' });
  });

  const changeEvent = await oneEvent(buttonElement, 'change');

  expect(changeEvent instanceof Event).to.be.true;
});

it('does not emit change event when a space key is pressed and is selected', async () => {
  const buttonElement = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button value="value-1" selected
      >Button 1</glide-core-button-group-button
    > `,
  );

  const spy = sinon.spy();
  buttonElement.addEventListener('change', spy);
  buttonElement.focus();
  await sendKeys({ press: ' ' });

  expect(spy.notCalled).to.be.true;
});

it('emits an input event when a space key is pressed and is not already selected', async () => {
  const buttonElement = await fixture<GlideCoreButtonGroupButton>(
    html` <glide-core-button-group-button value="value-1"
      >Button 1</glide-core-button-group-button
    >`,
  );

  buttonElement.focus();

  setTimeout(async () => {
    await sendKeys({ press: ' ' });
  });

  const inputEvent = await oneEvent(buttonElement, 'input');

  expect(inputEvent instanceof Event).to.be.true;
});

it('does not emit an input event when a space key is pressed and is selected', async () => {
  const buttonElement = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button value="value-1" selected
      >Button 1</glide-core-button-group-button
    >`,
  );

  buttonElement.focus();
  const spy = sinon.spy();
  buttonElement.addEventListener('input', spy);
  await sendKeys({ press: ' ' });

  expect(spy.notCalled).to.be.true;
});
