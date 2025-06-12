import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Option from './option.js';
import Select from './select.js';
import expectWindowError from './library/expect-window-error.js';
import pencilIcon from './icons/pencil.js';
import { click } from './library/mouse.js';

@customElement('glide-core-subclassed')
class Subclassed extends Option {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-option')).to.equal(Option);
});

it('has an icon when selected', async () => {
  const host = await fixture(
    html`<glide-core-option label="Label" selected></glide-core-option>`,
  );

  const iconContainer = host?.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(iconContainer?.checkVisibility()).to.be.true;
});

it('cancels the original click event when its icon is clicked', async () => {
  const host = await fixture(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label" href="/">
          <div slot="icon">${pencilIcon}</div>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating Ui

  let wasOriginalClickCanceled = false;

  // The simulated click via `click()` in `#onComponentClick()`.
  host.addEventListener('click', (event: Event) => {
    // Cancel the event so the browser doesn't navigate during the test.
    event.preventDefault();
  });

  host
    .querySelector('glide-core-option')
    // On the slot instead of because `#onComponentClick()` stops propagation
    // of the event.
    ?.shadowRoot?.querySelector('[data-test="icon-slot"]')
    // The original click. The one we want to verify was canceled.
    ?.addEventListener('click', (event: Event) => {
      // Wait a tick for `#onComponentClick()` to be called.
      setTimeout(() => {
        wasOriginalClickCanceled = event.defaultPrevented;
      });
    });

  await click(host.querySelector('[slot="icon"]'));

  expect(wasOriginalClickCanceled).to.be.true;
});

it('has a visible "content" slot when it has no slotted content', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label"></glide-core-option>`,
  );

  const contentSlot = host.shadowRoot?.querySelector(
    '[data-test="content-slot"]',
  );

  expect(contentSlot?.checkVisibility()).to.be.true;
});

it('does not have a visible "content" slot when it has slotted content', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label">
      <div slot="content">Label</div>
    </glide-core-option>`,
  );

  const contentSlot = host.shadowRoot?.querySelector(
    '[data-test="content-slot"]',
  );

  expect(contentSlot?.checkVisibility()).to.not.be.ok;
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-option></glide-core-option>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when `href` is present outside of a Menu', async () => {
  await expectWindowError(() => {
    return fixture<Select>(
      html`<glide-core-select label="Label">
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option href="/" label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-select>`,
    );
  });
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
