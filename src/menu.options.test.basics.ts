import './menu.button.js';
import './menu.link.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import { repeat } from 'lit/directives/repeat.js';
import GlideCoreMenu from './menu.js';
import GlideCoreMenuOptions from './menu.options.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreMenu.shadowRootOptions.mode = 'open';

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreMenuOptions>(
      html`<glide-core-menu-options></glide-core-menu-options>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreMenuOptions>(
      html`<glide-core-menu-options>
        <option>Option</option>
      </glide-core-menu-options>`,
    );
  });
});

it('does not throw if the default slot only contains whitespace', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreMenuOptions>(
      html`<glide-core-menu-options>
        ${repeat(
          [],
          () =>
            html`<glide-core-menu-link label="Link"></glide-core-menu-link>`,
        )}
      </glide-core-menu-options>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(0);
});
