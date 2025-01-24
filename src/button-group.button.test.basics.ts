import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroupButton from './button-group.button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-button-group-button')).to.equal(
    GlideCoreButtonGroupButton,
  );
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  await expect(component).to.be.accessible();
});

it('sets `aria-checked` when selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
      selected
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.ariaChecked).to.equal('true');
});

it('sets `aria-checked` when not selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.ariaChecked).to.equal('false');
});

it('sets `aria-disabled` when disabled', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
      disabled
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.ariaDisabled).to.equal('true');
});

it('sets `aria-disabled` when not disabled', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.ariaDisabled).to.equal('false');
});

it('is tabbable when selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
      selected
    ></glide-core-button-group-button>`,
  );

  const radio =
    component.shadowRoot?.querySelector<HTMLInputElement>('[role="radio"]');

  expect(radio?.tabIndex).to.equal(0);
});

it('is not tabbable when not selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  const radio =
    component.shadowRoot?.querySelector<HTMLInputElement>('[role="radio"]');

  expect(radio?.tabIndex).to.equal(-1);
});

it('throws when `icon-only` and no "icon" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-button-group-button
        privateVariant="icon-only"
      ></glide-core-button-group-button>`,
    );
  });
});
