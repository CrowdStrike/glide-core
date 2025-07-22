import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import OptionsGroup from './options.group.js';
import expectWindowError from './library/expect-window-error.js';

customElement('glide-core-subclassed');
class Subclassed extends OptionsGroup {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-options-group')).to.equal(
    OptionsGroup,
  );
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-options-group label="Label">
        <option>Option</option>
      </glide-core-options-group>`,
    );
  });
});
