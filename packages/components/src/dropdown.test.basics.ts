import './dropdown.option.js';
import { ArgumentError } from 'ow';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { repeat } from 'lit/directives/repeat.js';
import CsDropdown from './dropdown.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

CsDropdown.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-dropdown')).to.equal(CsDropdown);
});

it('has defaults', async () => {
  // Required attributes are supplied here and thus left unasserted below. The
  // idea is that this test shouldn't fail to typecheck if these templates are
  // eventually typechecked, which means supplying all required attributes and slots.
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.hasAttribute('disabled')).to.be.false;
  expect(component.disabled).to.equal(false);

  expect(component.getAttribute('name')).to.be.null;
  expect(component.name).to.equal(undefined);

  expect(component.hasAttribute('required')).to.be.false;
  expect(component.required).to.equal(false);

  expect(component.getAttribute('size')).to.equal('large');
  expect(component.size).to.equal('large');

  // Not reflected, so no attribute assertion is necessary.
  expect(component.value).to.deep.equal([]);
});

it('is accessible', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a placeholder', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.getAttribute('placeholder')).to.equal('Placeholder');
  expect(component.placeholder).to.equal('Placeholder');
});

it('can have a description', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <div slot="description">Description</div>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a tooltip', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
      <div slot="tooltip">Tooltip</div>
    </glide-core-dropdown>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can have a `name`', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.getAttribute('name')).to.equal('name');
  expect(component.name).to.equal('name');
});

it('can be `disabled`', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" disabled>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.equal(true);
});

it('can be `required`', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.hasAttribute('required')).to.be.true;
  expect(component.required).to.equal(true);
});

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  expect(component.form).to.equal(form);
  expect(component.validity instanceof ValidityState).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity).to.be.a('function');
  expect(component.reportValidity).to.be.a('function');
});

it('updates `value` dynamically', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'two';

  expect(component.value).to.deep.equal(['two']);
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<CsDropdown>(
      html`<glide-core-dropdown label="Label" placeholder="Placeholder">
        <button>Button</button>
      </glide-core-dropdown>`,
    );
  });
});

it('does not throw if the default slot only contains whitespace', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-dropdown label="Label" placeholder="Placeholder">
        ${repeat(
          [],
          () =>
            html`<glide-core-dropdown-option
              label="Option"
              value="option"
            ></glide-core-dropdown-option>`,
        )}
      </glide-core-dropdown>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.notCalled).to.be.true;
});
