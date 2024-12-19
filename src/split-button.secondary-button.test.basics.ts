/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  elementUpdated,
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreSplitButtonSecondaryButton.shadowRootOptions.mode = 'open';
GlideCoreMenuButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(
    globalThis.customElements.get('glide-core-split-button-secondary-button'),
  ).to.equal(GlideCoreSplitButtonSecondaryButton);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreSplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  await expect(component).to.be.accessible();

  component.disabled = true;
  await elementUpdated(component);

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreSplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  expect(component.disabled).to.be.false;
  expect(component.menuOpen).to.be.false;
  expect(component.menuPlacement).to.be.equal('bottom-end');
  expect(component.privateSize).to.be.equal('large');
  expect(component.privateVariant).to.be.equal('primary');
});

it('throws when its default slot is empty', async () => {
  await expectArgumentError(() =>
    fixture(html`
      <glide-core-split-button-secondary-button
        label="Label"
      ></glide-core-split-button-secondary-button>
    `),
  );
});

it('throws when its default slot is the incorrect type', async () => {
  await expectArgumentError(() =>
    fixture(html`
      <glide-core-split-button-secondary-button label="Label">
        <div></div>
      </glide-core-split-button-secondary-button>
    `),
  );

  // Menu is rendered asynchronously outside of this component's lifecycle
  // and asserts against its default slot. That assertion, which is expected
  // to fail in this case, results in an unhandled rejection that gets logged.
  // `console.error` is stubbed so the logs aren't muddied.
  const stub = sinon.stub(console, 'error');

  // Menu asserts against its default slot once on `firstUpdated` and again
  // on "slotchange". So we wait until the stub is called twice before restoring
  // it.
  await waitUntil(() => stub.calledTwice);
  stub.restore();
});
