import * as sinon from 'sinon';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreRadioGroup from './radio-group.js';
import './radio-group.radio.js';
import { click } from './library/mouse.js';

it('dispatches a `change` event when arrow keys are pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');
  await sendKeys({ press: 'Tab' });

  // This pattern is adopted from https://open-wc.org/docs/testing/helpers/#testing-events
  // Without the setTimeout the test fails. An `await` is used since `sendKeys` returns a
  // promise, however the test seems to work without it. Keeping `await` here until this can
  // be investigated further.
  setTimeout(async () => await sendKeys({ press: 'ArrowLeft' }));
  const changeEventLeft = await oneEvent(radios[0], 'change');

  expect(changeEventLeft instanceof Event).to.be.true;
  expect(changeEventLeft.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowRight' }));
  const changeEventRight = await oneEvent(radios[1], 'change');

  expect(changeEventRight instanceof Event).to.be.true;
  expect(changeEventRight.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowUp' }));
  const changeEventUp = await oneEvent(radios[0], 'change');

  expect(changeEventUp instanceof Event).to.be.true;
  expect(changeEventUp.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowDown' }));
  const changeEventDown = await oneEvent(radios[1], 'change');

  expect(changeEventDown instanceof Event).to.be.true;
  expect(changeEventDown.bubbles).to.be.true;
});

it('dispatches an `input` event when arrow keys are pressed', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
        value="three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');
  await sendKeys({ press: 'Tab' });

  setTimeout(async () => await sendKeys({ press: 'ArrowLeft' }));
  const inputEventLeft = await oneEvent(radios[0], 'input');

  expect(inputEventLeft instanceof Event).to.be.true;
  expect(inputEventLeft.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowRight' }));
  const inputEventRight = await oneEvent(radios[1], 'input');

  expect(inputEventRight instanceof Event).to.be.true;
  expect(inputEventRight.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowUp' }));
  const inputEventUp = await oneEvent(radios[0], 'input');

  expect(inputEventUp instanceof Event).to.be.true;
  expect(inputEventUp.bubbles).to.be.true;

  setTimeout(async () => await sendKeys({ press: 'ArrowDown' }));
  const inputEventDown = await oneEvent(radios[1], 'input');

  expect(inputEventDown instanceof Event).to.be.true;
  expect(inputEventDown.bubbles).to.be.true;
  expect(inputEventDown.composed).to.be.true;
});

it('does not change focus or the `checked` attribute a disabled Radio is clicked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        disabled
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios.length).to.equal(2);
  await click(radios[1]);

  expect(radios[0]).to.have.focus;
  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1].hasAttribute('checked')).to.be.false;
});

it('does not change focus or the `checked` attribute when clicking a disabled group', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name" disabled>
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios.length).to.equal(2);
  await click(radios[1]);

  expect(radios[0]).to.not.have.focus;
  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1].hasAttribute('checked')).to.be.false;
});

it('dispatches a `change` event after an `input` event', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const changeSpy = sinon.spy();
  const inputSpy = sinon.spy();

  component.addEventListener('change', changeSpy);
  component.addEventListener('input', inputSpy);

  await click(component.querySelector('glide-core-radio-group-radio'));

  await waitUntil(() => changeSpy.callCount === 1);

  expect(changeSpy.calledAfter(inputSpy)).to.be.true;
});
