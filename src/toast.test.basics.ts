import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import { emulateMedia } from '@web/test-runner-commands';
import Link from './link.js';
import expectWindowError from './library/expect-window-error.js';
import Toast from './toast.js';

// "transitionend" is dispatched manually throughout these tests because that
// event isn't consistently emitted in CI. It's not clear why. The below issue
// may be related.
//
// https://github.com/modernweb-dev/web/issues/2588

@customElement('glide-core-subclassed')
class Subclassed extends Toast {}

afterEach(() => {
  // Toasts isn't removed for us by `fixture()` because Toasts is rendered as
  // a side effect of Toast and is appended to `document.body`. So we have to
  // manually remove it. Otherwise, Toasts that haven't been automatically or
  // manually dismissed may be left hanging around. And we want each test to
  // start fresh.
  document.querySelector('glide-core-private-toasts')?.remove();
});

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-toast')).to.equal(Toast);
});

it('can have a label', async () => {
  await fixture(html`<glide-core-toast label="Label"></glide-core-toast>`);

  const label = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector('[data-test="toast"]')
    ?.querySelector('[data-test="label"]')?.textContent;

  expect(label?.trim()).to.equal('Label');
});

it('can have a description', async () => {
  await fixture(
    html`<glide-core-toast label="Label">
      Description
      <glide-core-link
        label="Label"
        data-test="link"
        href="/"
      ></glide-core-link>
    </glide-core-toast>`,
  );

  const description = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector('[data-test="toast"]')
    ?.querySelector('[data-test="description"]');

  const link = description?.querySelector<Link>('[data-test="link"]');

  expect(description?.textContent?.trim()).to.equal('Description');
  expect(link?.label).to.equal('Label');
  expect(link?.href).to.equal('/');
});

it('can have a `duration` when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  // `100` because it's a round and relatively small number.
  const duration = 100;

  const host = await fixture(
    html`<glide-core-toast
      label="Label"
      duration=${duration}
    ></glide-core-toast>`,
  );

  const toast = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector<Toast>('[data-test="toast"]');

  toast?.style.setProperty('--private-test-transition-duration', '0ms');

  await aTimeout(duration);
  toast?.dispatchEvent(new TransitionEvent('transitionend'));

  expect(toast?.isConnected).to.be.false;
  expect(host.isConnected).to.be.false;
});

it('can have a `duration` when not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  // `100` because it's a round and relatively small number.
  const duration = 100;

  const host = await fixture(
    html`<glide-core-toast
      label="Label"
      duration=${duration}
    ></glide-core-toast>`,
  );

  const toast = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector<Toast>('[data-test="toast"]');

  await aTimeout(duration);

  expect(toast?.isConnected).to.be.false;
  expect(host.isConnected).to.be.false;
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture<Toast>(html`<glide-core-toast></glide-core-toast>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
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

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-toast label="Label">
        <button>Button</button>
      </glide-core-toast>`,
    );
  });
});
