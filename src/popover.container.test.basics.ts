import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import PopoverContainer from './popover.container.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class Subclassed extends PopoverContainer {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-popover-container')).to.equal(
    PopoverContainer,
  );
});

it('is accessible', async () => {
  const host = await fixture<PopoverContainer>(
    html`<glide-core-popover-container>Popover</glide-core-popover-container>`,
  );

  await expect(host).to.be.accessible();
});

it('gives itself an ID', async () => {
  const host = await fixture<PopoverContainer>(
    html`<glide-core-popover-container>
      Popover
    </glide-core-popover-container>`,
  );

  expect(host.id).to.not.be.empty.string;
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

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-popover-container></glide-core-popover-container>`,
    );
  });
});
