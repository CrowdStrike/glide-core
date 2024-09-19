/* eslint-disable @typescript-eslint/no-unused-expressions */

import './menu.link.js';
import './split-button-container.button.js';
import './split-button-container.button.js';
import './split-button-container.js';
import {
  aTimeout,
  assert,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreSplitButtonContainer from './split-button-container.js';

GlideCoreSplitButtonContainer.shadowRootOptions.mode = 'open';

it('opens its menu on click', async () => {
  const component = await fixture(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="menu-button"]')
    ?.click();

  expect(component.shadowRoot?.querySelector('glide-core-menu')?.open).to.be
    .true;
});

it('opens its menu on Space', async () => {
  const component = await fixture(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="menu-button"]')
    ?.focus();

  await sendKeys({ press: ' ' });

  expect(component.shadowRoot?.querySelector('glide-core-menu')?.open).to.be
    .true;
});

it('opens its menu on Enter', async () => {
  const component = await fixture(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="menu-button"]')
    ?.focus();

  await sendKeys({ press: 'Enter' });

  expect(component.shadowRoot?.querySelector('glide-core-menu')?.open).to.be
    .true;
});

it('sets `menuOpen` when its menu is opened', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="menu-button"]')
    ?.click();

  // Wait for the Mutation Observer to pick up the attribute change.
  await aTimeout(0);

  expect(component?.menuOpen).to.be.true;
});

it('sets `menuOpen` when its menu is closed', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label" menu-open>
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  // Wait for Menu to open.
  await aTimeout(0);

  document.body.click();

  // Wait for the Mutation Observer to pick up the attribute change.
  await aTimeout(0);

  expect(component?.menuOpen).to.be.false;
});

it('sets `privateDisabled` on its "primary-action" button when `disabled` is set programmatically', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.disabled = true;

  const button = component.querySelector(
    'glide-core-split-button-container-button',
  );

  expect(button?.privateDisabled).to.be.true;
});

it('sets `privateSize` on its "primary-action" button when `size` is set programmatically', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.size = 'small';

  const button = component.querySelector(
    'glide-core-split-button-container-button',
  );

  expect(button?.privateSize).to.equal('small');
});

it('sets `privateVariant` on its "primary-action" button when `variant` is set programmatically', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.variant = 'secondary';

  const button = component.querySelector(
    'glide-core-split-button-container-button',
  );

  expect(button?.privateVariant).to.equal('secondary');
});

it('clicks the "primary-action" button', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  setTimeout(() => {
    component.click();
  });

  const button = component.querySelector(
    'glide-core-split-button-container-button',
  );

  assert(button);

  const event = await oneEvent(button, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('clicks the menu button', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  setTimeout(() => {
    component.click({ target: 'menu-button' });
  });

  const button = component.shadowRoot?.querySelector(
    '[data-test="menu-button"]',
  );

  assert(button);

  const event = await oneEvent(button, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});
