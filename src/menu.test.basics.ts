import './menu.options.js';
import './menu.button.js';
import './menu.link.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreMenu from './menu.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreMenu {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu')).to.equal(GlideCoreMenu);
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Label"></glide-core-menu-button>
        <glide-core-menu-link label="Label" href="/"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelector('glide-core-menu-options');

  expect(target?.getAttribute('aria-controls')).to.equal(options?.id);
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.ariaHasPopup).to.equal('true');
  expect(options?.ariaLabelledby).to.equal(target?.id);

  await expect(host).to.be.accessible();
});

it('can be open', async () => {
  const host = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot = host?.shadowRoot?.querySelector('slot:not([name])');
  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

it('activates the first link by default', async () => {
  const host = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  expect(links[0]?.privateActive).to.be.true;
  expect(links[1]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0]?.id);
});

it('activates the first button by default', async () => {
  const host = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Label"></glide-core-menu-button>
        <glide-core-menu-button label="Label"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const buttons = host.querySelectorAll('glide-core-menu-button');
  const options = host.querySelector('glide-core-menu-options');

  expect(buttons[0]?.privateActive).to.be.true;
  expect(buttons[1]?.privateActive).to.be.false;

  expect(options?.getAttribute('aria-activedescendant')).to.equal(
    buttons[0]?.id,
  );
});

it('is not opened when open and its target is `disabled`', async () => {
  const host = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target" disabled>Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelector('glide-core-menu-options');

  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('adds `tabIndex` to its target when it is a `<span>`', async () => {
  const host = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('span');
  expect(target?.tabIndex).to.equal(0);
});

it('shows loading feedback', async () => {
  const host = await fixture<GlideCoreMenu>(
    html`<glide-core-menu loading open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const target = host.querySelector('button');

  const feedback = host
    ?.querySelector('glide-core-menu-options')
    ?.shadowRoot?.querySelector('[data-test="loading-feedback"]');

  expect(target?.ariaDescription).to.equal('Loading');
  expect(feedback?.checkVisibility()).to.be.true;
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-menu
        ><button slot="target">Target</button></glide-core-menu
      >`,
    );
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-menu>
        <option>Option</option>
        <button slot="target">Target</button>
      </glide-core-menu>`,
    );
  });
});

it('throws when it does not have a "target" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-menu>
        <glide-core-menu-options>
          <glide-core-menu-link label="Label"></glide-core-menu-link>
        </glide-core-menu-options>
      </glide-core-menu>`,
    );
  });
});
