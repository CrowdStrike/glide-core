import { expect, fixture, html } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import GlideCoreToasts from './toast.toasts.js';
import './toast.js';

afterEach(() => {
  // Toasts isn't removed for us by `fixture()` because Toasts is rendered as
  // a side effect of Toast and is appended to `document.body`. So we have to
  // manually remove it. Otherwise, Toasts that haven't been dismissed may be
  // left hanging around. And we want each test to start fresh.
  document.querySelector('glide-core-private-toasts')?.remove();
});

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-private-toasts')).to.equal(
    GlideCoreToasts,
  );
});

it('is accessible', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });
  await fixture(html`<glide-core-toast label="Label"></glide-core-toast>`);

  const toasts = document.querySelector('glide-core-private-toasts');
  await expect(toasts).to.be.accessible();
});
