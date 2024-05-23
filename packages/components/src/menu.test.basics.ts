import './menu.button.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import CsMenu from './menu.js';
import CsMenuLink from './menu.link.js';
import sinon from 'sinon';

CsMenu.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-menu')).to.equal(CsMenu);
});

it('has defaults', async () => {
  // Required attributes are supplied here and thus left unasserted below. The
  // idea is that this test shouldn't fail to typecheck if these templates are
  // eventually typechecked, which means supplying all required attributes and slots.
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  expect(component.getAttribute('size')).to.equal('large');
  expect(component.size).to.equal('large');
});

it('is accessible', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a default slot', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelectorAll('slot')[1]
    .assignedElements();

  expect(assignedElements?.at(0) instanceof CsMenuLink).to.be.true;
});

it('can have a target slot', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="target"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Target');
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<CsMenu>(
      html`<cs-menu><button slot="target">Target</button></cs-menu>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('throws if the default slot is the incorrect type', async () => {
  const onerror = window.onerror;

  // Prevent Mocha from failing the test because of the failed "slotchange" assertion,
  // which is expected. We'd catch the error below. But it happens in an event handler
  // and so propagates to the window.
  //
  // https://github.com/mochajs/mocha/blob/99601da68d59572b6aa931e9416002bcb5b3e19d/browser-entry.js#L75
  //
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = null;

  const spy = sinon.spy();

  try {
    await fixture<CsMenu>(
      html`<cs-menu>
        <option>Option</option>
        <button slot="target">Target</button>
      </cs-menu>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;
});

it('throws if it does not have a "target" slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<CsMenu>(
      html`<cs-menu>
        <cs-menu-link label="Link"></cs-menu-link>
      </cs-menu>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('sets accessibility attributes on the target', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const button = component.querySelector('button');

  expect(button?.getAttribute('aria-expanded')).to.equal('false');
  expect(button?.getAttribute('aria-haspopup')).to.equal('true');

  expect(button?.ariaExpanded).to.equal('false');
  expect(button?.ariaHasPopup).to.equal('true');
});
