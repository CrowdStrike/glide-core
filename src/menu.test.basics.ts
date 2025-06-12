import './options.js';
import './option.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Menu from './menu.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class Subclassed extends Menu {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu')).to.equal(Menu);
});

it('is accessible', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
        <glide-core-option label="Label" href="/"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelector('glide-core-options');

  expect(target?.getAttribute('aria-controls')).to.equal(options?.id);
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.ariaHasPopup).to.equal('true');
  expect(options?.ariaLabelledby).to.equal(target?.id);

  await expect(host).to.be.accessible();
});

it('can be open', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot = host?.shadowRoot?.querySelector('slot:not([name])');
  const options = host.querySelector('glide-core-options');
  const target = host.querySelector('button');
  const link = host.querySelector('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

it('activates the first link by default', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-option');
  const options = host.querySelector('glide-core-options');

  expect(links[0]?.privateActive).to.be.true;
  expect(links[1]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0]?.id);
});

it('activates the first button by default', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const buttons = host.querySelectorAll('glide-core-option');
  const options = host.querySelector('glide-core-options');

  expect(buttons[0]?.privateActive).to.be.true;
  expect(buttons[1]?.privateActive).to.be.false;

  expect(options?.getAttribute('aria-activedescendant')).to.equal(
    buttons[0]?.id,
  );
});

it('is not opened when open and its target is `disabled`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" disabled>Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelector('glide-core-options');

  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('is accessible when its target is a SPAN', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('span');

  expect(target?.tabIndex).to.equal(0);
  expect(target?.role).to.equal('button');
});

it('is accessible when its target is a DIV', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <div slot="target">Target</div>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('div');

  expect(target?.tabIndex).to.equal(0);
  expect(target?.role).to.equal('button');
});

it('is accessible when its target is an SVG', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <svg slot="target">Target</svg>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('svg');

  expect(target?.tabIndex).to.equal(0);
  expect(target?.role).to.equal('button');
});

it('shows loading feedback', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu loading open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const target = host.querySelector('button');

  const feedback = host
    ?.querySelector('glide-core-options')
    ?.shadowRoot?.querySelector('[data-test="loading-feedback"]');

  expect(target?.ariaDescription).to.equal('Loading');
  expect(feedback?.checkVisibility()).to.be.true;
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

it('throws when it does not have a "target" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-menu>
        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-menu>`,
    );
  });
});
