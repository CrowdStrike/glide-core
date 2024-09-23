import { assert, expect, fixture, html } from '@open-wc/testing';
import GlideCoreToast from './toasts.toast.js';
import sinon from 'sinon';

GlideCoreToast.shadowRootOptions.mode = 'open';

it('pauses the count-down to close on mouse enter', async () => {
  const clock = sinon.useFakeTimers();
  const dateStub = sinon.stub(Date, 'now').returns(0);

  // The toast's default duration is 5 seconds.
  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  const shadowElement = component.shadowRoot?.querySelector('.component');

  assert(shadowElement);

  clock.tick(2000);
  dateStub.returns(2000);

  // The count-down to close should pause on `mouseenter`.
  shadowElement.dispatchEvent(new Event('mouseenter'));

  clock.tick(6000);
  dateStub.returns(6000);

  expect([...shadowElement!.classList]).to.deep.equal([
    'component',
    'informational',
  ]);

  dateStub.restore();
  clock.restore();
});

it('resumes the count-down to close on mouse leave', async () => {
  const clock = sinon.useFakeTimers();
  const dateStub = sinon.stub(Date, 'now').returns(0);

  // The toast's default duration is 5 seconds.
  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  const shadowElement = component.shadowRoot?.querySelector('.component');

  assert(shadowElement);

  clock.tick(2000);
  dateStub.returns(2000);

  // The count-down to close should pause on `mouseenter`.
  shadowElement.dispatchEvent(new Event('mouseenter'));

  clock.tick(6000);
  dateStub.returns(6000);

  expect([...shadowElement!.classList]).to.deep.equal([
    'component',
    'informational',
  ]);

  // The count-down to close should resume on `mouseleave`.
  shadowElement.dispatchEvent(new Event('mouseleave'));

  clock.tick(2900);
  dateStub.returns(2900);

  // Verify that the toast hasn't closed prematurely
  expect([...shadowElement!.classList]).to.deep.equal([
    'component',
    'informational',
  ]);

  clock.tick(110);
  dateStub.returns(110);

  expect([...shadowElement!.classList]).to.deep.equal([
    'component',
    'informational',
    'closed',
  ]);

  dateStub.restore();
  clock.restore();
});
