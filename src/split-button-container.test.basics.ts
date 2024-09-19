/* eslint-disable @typescript-eslint/no-unused-expressions */

import './split-button-container.button.js';
import './split-button-container.link.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import GlideCoreSplitButtonContainer from './split-button-container.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreSplitButtonContainer.shadowRootOptions.mode = 'open';
GlideCoreMenuButton.shadowRootOptions.mode = 'open';
GlideCoreMenuLink.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(
    window.customElements.get('glide-core-split-button-container'),
  ).to.equal(GlideCoreSplitButtonContainer);
});

it('is accessible', async () => {
  const component = await fixture(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="One" url="/"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-button-container>
  `);

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-link
        label="Label"
        slot="primary-action"
        url="/"
      ></glide-core-split-button-container-link>

      <glide-core-menu-link label="One" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  expect(component.disabled).to.be.false;
  expect(component.menuOpen).to.be.false;
  expect(component.menuPlacement).to.equal('bottom-end');
  expect(component.size).to.equal('large');
  expect(component.variant).to.equal('primary');

  expect(component.shadowRoot?.querySelector('glide-core-menu')?.open).to.be
    .false;

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-menu')
      ?.getAttribute('placement'),
  ).to.equal('bottom-end');
});

it('focuses the "primary-action" button when `focus()` is called', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.focus();

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="primary-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.focus;
});

it('throws when its default slot is empty', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-button-container menu-label="Label">
        <glide-core-split-button-container-button
          label="Label"
          slot="primary-action"
        ></glide-core-split-button-container-button>
      </glide-core-split-button-container>`,
    ),
  );
});

it('throws when its default slot is an unsupported type', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-button-container menu-label="Label">
        <glide-core-split-button-container-button
          label="Label"
          slot="primary-action"
        ></glide-core-split-button-container-button>

        <div></div>
      </glide-core-split-button-container>`,
    ),
  );

  // Menu is rendered asynchronously outside of Split Button Container's
  // lifecycle and asserts against its default slot. That assertion, which
  // is expected to fail in this case, results in an unhandled rejection that
  // gets logged. `console.error` is stubbed so the logs aren't muddied.
  const stub = sinon.stub(console, 'error');

  // Menu asserts against its default slot once on `firstUpdated` and
  // again on "slotchange". So we wait until the stub has been called
  // twice before restoring it.
  await waitUntil(() => stub.calledTwice);
  stub.restore();
});
