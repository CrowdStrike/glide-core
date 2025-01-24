import * as sinon from 'sinon';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './radio-group.js';
import './radio-group.radio.js';
import { click } from './library/mouse.js';

it('dispatches a "change" event when arrowing', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');
  await sendKeys({ press: 'Tab' });

  let event: Event;

  sendKeys({ press: 'ArrowLeft' });
  event = await oneEvent(radios[0], 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;

  sendKeys({ press: 'ArrowRight' });
  event = await oneEvent(radios[1], 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;

  sendKeys({ press: 'ArrowUp' });
  event = await oneEvent(radios[0], 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;

  sendKeys({ press: 'ArrowDown' });
  event = await oneEvent(radios[1], 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event when arrowing', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Three"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radios = host.querySelectorAll('glide-core-radio-group-radio');
  await sendKeys({ press: 'Tab' });

  let event: Event;

  sendKeys({ press: 'ArrowLeft' });
  event = await oneEvent(radios[0], 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;

  sendKeys({ press: 'ArrowRight' });
  event = await oneEvent(radios[1], 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;

  sendKeys({ press: 'ArrowUp' });
  event = await oneEvent(radios[0], 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;

  sendKeys({ press: 'ArrowDown' });
  event = await oneEvent(radios[1], 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches a "change" event after an "input" event', async () => {
  const host = await fixture(
    html`<glide-core-radio-group label="Label">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
      <glide-core-radio-group-radio label="Two"></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const changeSpy = sinon.spy();
  const inputSpy = sinon.spy();

  host.addEventListener('change', changeSpy);
  host.addEventListener('input', inputSpy);

  await click(host.querySelector('glide-core-radio-group-radio'));
  await waitUntil(() => changeSpy.callCount === 1);

  expect(changeSpy.calledAfter(inputSpy)).to.be.true;
});
