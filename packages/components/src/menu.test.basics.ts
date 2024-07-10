import './menu.button.js';
import './menu.link.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreMenu from './menu.js';
import GlideCoreMenuOptions from './menu.options.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreMenu.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-menu')).to.equal(GlideCoreMenu);
});

it('has defaults', async () => {
  // Required attributes are supplied here and thus left unasserted below. The
  // idea is that this test shouldn't fail to typecheck if these templates are
  // eventually typechecked, which means supplying all required attributes and slots.
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const options = component.querySelector('glide-core-menu-options');

  expect(component.getAttribute('size')).to.equal('large');
  expect(component.size).to.equal('large');
  expect(options?.privateSize).to.equal('large');
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = component.querySelector('button');
  const options = component.querySelector('glide-core-menu-options');

  expect(target?.getAttribute('aria-controls')).to.equal(options?.id);
  expect(options?.ariaLabelledby).to.equal(target?.id);
  await expect(component).to.be.accessible();
});

it('can be opened', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = component.querySelector('button');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('can have a default slot', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelectorAll('slot')[1]
    .assignedElements();

  expect(assignedElements?.at(0) instanceof GlideCoreMenuOptions).to.be.true;
});

it('can have a target slot', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="target"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Target');
});

it('activates the first menu link by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  expect(links[0].privateActive).to.be.true;
  expect(links[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0].id);
});

it('activates the first menu button by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  const buttons = component.querySelectorAll('glide-core-menu-button');
  const options = component.querySelector('glide-core-menu-options');

  expect(buttons[0].privateActive).to.be.true;
  expect(buttons[1].privateActive).to.be.false;

  expect(options?.getAttribute('aria-activedescendant')).to.equal(
    buttons[0].id,
  );
});

it('is not opened when initially `open` and its target is `disabled`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target" disabled>Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = component.querySelector('button');

  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.be.ok;
  expect(target?.ariaExpanded).to.equal('false');
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreMenu>(
      html`<glide-core-menu
        ><button slot="target">Target</button></glide-core-menu
      >`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreMenu>(
      html`<glide-core-menu>
        <option>Option</option>
        <button slot="target">Target</button>
      </glide-core-menu>`,
    );
  });
});

it('throws if it does not have a "target" slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreMenu>(
      html`<glide-core-menu>
        <glide-core-menu-options>
          <glide-core-menu-link label="Link"></glide-core-menu-link>
        </glide-core-menu-options>
      </glide-core-menu>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('sets accessibility attributes', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = component.querySelector('button');
  const options = component.querySelector('glide-core-menu-options');

  expect(target?.getAttribute('aria-expanded')).to.equal('false');
  expect(target?.getAttribute('aria-haspopup')).to.equal('true');
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.ariaHasPopup).to.equal('true');
  expect(options?.ariaLabelledby).to.equal(target?.id);
});
