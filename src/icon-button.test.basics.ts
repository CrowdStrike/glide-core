import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreIconButton from './icon-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreIconButton {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-icon-button')).to.equal(
    GlideCoreIconButton,
  );
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button aria-description="Description" label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="button"]');
  expect(button?.ariaDescription).to.equal('Description');

  await expect(host).to.be.accessible();
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-icon-button>
        <div>Icon</div>
      </glide-core-icon-button>`,
    );
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
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
      html`<glide-core-icon-button label="Label"></glide-core-icon-button>`,
    );
  });
});
