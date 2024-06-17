import './radio-group.js';
import './radio.js';
import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreRadio from './radio.js';
import GlideCoreRadioGroup from './radio-group.js';

GlideCoreRadio.shadowRootOptions.mode = 'open';
GlideCoreRadioGroup.shadowRootOptions.mode = 'open';

it('emits a change event when arrow keys are pressed', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');
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

it('emits an input event when arrow keys are pressed', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');
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
});

it('moves focus to previous radio when left or up arrow keys are pressed', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio
        value="value-3"
        checked
        label="Three"
      ></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[1]).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(radios[0]).to.have.focus;
});

it('moves focus to last radio when left or up arrow keys are pressed on the first radio', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[2]).to.have.focus;

  radios[0].focus();
  await sendKeys({ press: ' ' });

  await sendKeys({ press: 'ArrowUp' });
  expect(radios[2]).to.have.focus;
});

it('moves focus to next radio when right or down arrow keys are pressed', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[1]).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(radios[2]).to.have.focus;
});

it('moves focus to first radio when right or down arrow keys are pressed on the last radio', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio
        value="value-3"
        checked
        label="Three"
      ></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[0]).to.have.focus;

  radios[2].focus();
  await sendKeys({ press: ' ' });
  expect(radios[2]).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(radios[0]).to.have.focus;
});

it('moves focus to previous enabled radio when pressing left or up arrow keys', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" disabled label="Two"></glide-core-radio>
      <glide-core-radio
        value="value-3"
        checked
        label="Three"
      ></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0]).to.have.focus;

  radios[2].focus();
  await sendKeys({ press: ' ' });
  expect(radios[2]).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(radios[0]).to.have.focus;
});

it('moves focus to next enabled radio when pressing right or down arrow keys', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
      <glide-core-radio value="value-2" disabled label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[2]).to.have.focus;

  radios[0].focus();
  await sendKeys({ press: ' ' });
  expect(radios[0]).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(radios[2]).to.have.focus;
});

it('does not move focus if there is only one button when pressing arrow keys', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radio = document.querySelector('glide-core-radio');
  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowLeft' });
  expect(radio).to.have.focus;

  await sendKeys({ press: 'ArrowRight' });
  expect(radio).to.have.focus;

  await sendKeys({ press: 'ArrowUp' });
  expect(radio).to.have.focus;

  await sendKeys({ press: 'ArrowDown' });
  expect(radio).to.have.focus;
});

it('changes the "checked" attribute when clicking', async () => {
  const element = await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios.length).to.equal(3);
  radios[2].click();
  await elementUpdated(element);

  expect(radios[2]).to.have.focus;
  expect(radios[2]).to.have.attribute('checked');
  expect(radios[0]).to.not.have.attribute('checked');
});

it('does not change focus nor the "checked" attribute when clicking a disabled radio', async () => {
  const element = await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
      <glide-core-radio value="value-2" disabled label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios.length).to.equal(2);
  radios[1].click();
  await elementUpdated(element);

  expect(radios[0]).to.have.focus;
  expect(radios[0]).to.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');
});

it('does not change focus nor the "checked" attribute when clicking a disabled group', async () => {
  const element = await fixture(
    html`<glide-core-radio-group name="name" disabled>
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios.length).to.equal(2);
  radios[1].click();
  await elementUpdated(element);

  expect(radios[0]).to.not.have.focus;
  expect(radios[0]).to.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');
});

it('changes the "checked" attribute when pressing arrow and space keys', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(radios[1]).to.have.focus;
  expect(radios[1]).to.have.attribute('checked');
  expect(radios[0]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowDown' });

  expect(radios[2]).to.have.focus;
  expect(radios[2]).to.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowUp' });

  expect(radios[1]).to.have.focus;
  expect(radios[1]).to.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0]).to.have.focus;
  expect(radios[0]).to.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');

  radios[2].focus();
  await sendKeys({ press: ' ' });
  expect(radios[2]).to.have.focus;
  expect(radios[2]).to.have.attribute('checked');
  expect(radios[0]).to.not.have.attribute('checked');
});

it('does not change the "checked" attribute nor focus when pressing arrow and space keys when the group is disabled', async () => {
  await fixture(
    html`<glide-core-radio-group name="name" disabled>
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  radios[0].focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(radios[0]).to.have.focus;
  expect(radios[0]).to.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowDown' });

  expect(radios[0]).to.have.focus;
  expect(radios[0]).to.have.attribute('checked');
  expect(radios[2]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowUp' });

  expect(radios[0]).to.have.focus;
  expect(radios[0]).to.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');

  await sendKeys({ press: 'ArrowLeft' });

  expect(radios[0]).to.have.focus;
  expect(radios[0]).to.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');

  radios[1].focus();
  await sendKeys({ press: ' ' });

  expect(radios[0]).to.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');
});
