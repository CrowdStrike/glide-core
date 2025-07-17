import { expect, fixture, html } from '@open-wc/testing';
import './option.js';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import SplitButtonSecondaryButton from './split-button.secondary-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class Subclassed extends SplitButtonSecondaryButton {}

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-split-button-secondary-button'),
  ).to.equal(SplitButtonSecondaryButton);
});

it('is accessible', async () => {
  const host = await fixture<SplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-option label="Label"></glide-core-option>
    </glide-core-split-button-secondary-button>
  `);

  await expect(host).to.be.accessible();

  host.disabled = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-split-button-secondary-button>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-split-button-secondary-button>`,
    );
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
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

it('throws when its default slot is empty', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`
      <glide-core-split-button-secondary-button
        label="Label"
      ></glide-core-split-button-secondary-button>
    `);
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-split-button-secondary-button label="Label">
        <div></div>
      </glide-core-split-button-secondary-button>
    `);
  });
});
