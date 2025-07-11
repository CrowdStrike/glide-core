import './form-controls-layout.js';
import './radio-group.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import CheckboxGroupComponent from './checkbox-group.js';
import DropdownComponent from './dropdown.js';
import InputComponent from './input.js';
import RadioGroupRadioComponent from './radio-group.radio.js';
import SliderComponent from './slider.js';
import TextareaComponent from './textarea.js';

const meta: Meta = {
  title: 'Form Controls Layout',
  decorators: [
    withActions,
    (story) =>
      html`<form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/form-controls-layout.js';
        </script>

        ${story()}
      </form>`,
  ],
  parameters: {
    actions: {
      handles: ['change', 'input', 'invalid', 'toggle'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    split: 'left',
    version: '',
    '<glide-core-checkbox-group>.value': [],
    '<glide-core-dropdown>.open': false,
    '<glide-core-dropdown>.value': [],
    '<glide-core-input>.value': '',
    '<glide-core-radio-group>.value': '',
    '<glide-core-radio-group-radio>.one.checked': false,
    '<glide-core-radio-group-radio>.two.checked': false,
    '<glide-core-radio-group-radio>.three.checked': false,
    '<glide-core-slider>.value': [],
    '<glide-core-textarea>.value': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: {
          summary:
            'Checkbox | CheckboxGroup | Dropdown | Input | RadioGroup | Slider | TextArea',
        },
      },
      type: { name: 'function', required: true },
    },
    split: {
      control: { type: 'radio' },
      options: ['left', 'middle', 'right'],
      table: {
        defaultValue: { summary: '"left"' },
        type: { summary: '"left" | "middle" | "right"' },
      },
    },
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-checkbox-group>.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-dropdown>.open': {
      table: {
        disable: true,
      },
    },
    '<glide-core-dropdown>.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-input>.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-radio-group>.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-radio-group-radio>.one.checked': {
      table: {
        disable: true,
      },
    },
    '<glide-core-radio-group-radio>.two.checked': {
      table: {
        disable: true,
      },
    },
    '<glide-core-radio-group-radio>.three.checked': {
      table: {
        disable: true,
      },
    },
    '<glide-core-slider>.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-textarea>.value': {
      table: {
        disable: true,
      },
    },
  },
  play(context) {
    context.canvasElement
      .querySelector('form')
      ?.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // We reload the page to give the impression of a submission while keeping
        // the user on the same page.
        window.location.reload();
      });

    const checkboxGroup = context.canvasElement.querySelector(
      'glide-core-checkbox-group',
    );

    if (checkboxGroup instanceof CheckboxGroupComponent) {
      checkboxGroup.addEventListener('change', () => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-checkbox-group>.value': checkboxGroup.value,
          },
        });
      });
    }

    const dropdown = context.canvasElement.querySelector('glide-core-dropdown');

    if (dropdown instanceof DropdownComponent) {
      dropdown.addEventListener('change', () => {
        const option = context.canvasElement.querySelector(
          'glide-core-dropdown-option',
        );

        if (option) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              '<glide-core-dropdown>.value': dropdown.value,
            },
          });
        }
      });

      dropdown.addEventListener('toggle', () => {
        if (dropdown instanceof DropdownComponent) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              '<glide-core-dropdown>.open': dropdown.open,
            },
          });
        }
      });
    }

    const input = context.canvasElement.querySelector('glide-core-input');

    if (input instanceof InputComponent) {
      input.addEventListener('input', () => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-input>.value': input.value,
          },
        });
      });
    }

    const radioGroup = context.canvasElement.querySelector(
      'glide-core-radio-group',
    );

    radioGroup?.addEventListener('change', (event: Event) => {
      if (event.target instanceof RadioGroupRadioComponent) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-radio-group>.value': radioGroup.value,
            '<glide-core-radio-group-radio>.one.checked':
              event.target.value === 'one',
            '<glide-core-radio-group-radio>.two.checked':
              event.target.value === 'two',
            '<glide-core-radio-group-radio>.three.checked':
              event.target.value === 'three',
          },
        });
      }
    });

    const slider = context.canvasElement.querySelector('glide-core-slider');

    if (slider instanceof SliderComponent) {
      slider.addEventListener('change', () => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-slider>.value': slider.value,
          },
        });
      });
    }

    const textarea = context.canvasElement.querySelector('glide-core-textarea');

    if (textarea instanceof TextareaComponent) {
      textarea.addEventListener('input', () => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-textarea>.value': textarea.value,
          },
        });
      });
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-form-controls-layout
        split=${arguments_.split === 'left' ? nothing : arguments_.split}
      >
        <glide-core-checkbox-group label="Label">
          <glide-core-checkbox
            label="One"
            value="one"
            ?checked=${arguments_['<glide-core-checkbox-group>.value'].includes(
              'one',
            )}
          ></glide-core-checkbox>
          <glide-core-checkbox
            label="Two"
            value="two"
            ?checked=${arguments_['<glide-core-checkbox-group>.value'].includes(
              'two',
            )}
          ></glide-core-checkbox>
          <glide-core-checkbox
            label="Three"
            value="three"
            ?checked=${arguments_['<glide-core-checkbox-group>.value'].includes(
              'three',
            )}
          ></glide-core-checkbox>
        </glide-core-checkbox-group>

        <glide-core-dropdown
          label="Label"
          ?open=${arguments_['<glide-core-dropdown>.open']}
        >
          <glide-core-dropdown-option
            label="One"
            value="one"
            ?selected=${arguments_['<glide-core-dropdown>.value'].includes(
              'one',
            )}
          ></glide-core-dropdown-option>

          <glide-core-dropdown-option
            label="Two"
            value="two"
            ?selected=${arguments_['<glide-core-dropdown>.value'].includes(
              'two',
            )}
          ></glide-core-dropdown-option>

          <glide-core-dropdown-option
            label="Three"
            value="three"
            ?selected=${arguments_['<glide-core-dropdown>.value'].includes(
              'three',
            )}
          ></glide-core-dropdown-option>
        </glide-core-dropdown>

        <glide-core-input
          label="Label"
          value=${arguments_['<glide-core-input>.value'] || nothing}
        ></glide-core-input>

        <glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            ?checked=${arguments_['<glide-core-radio-group-radio>.one.checked']}
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
            ?checked=${arguments_['<glide-core-radio-group-radio>.two.checked']}
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Three"
            value="three"
            ?checked=${arguments_[
              '<glide-core-radio-group-radio>.three.checked'
            ]}
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>

        <glide-core-slider
          label="Label"
          .value=${arguments_['<glide-core-slider>.value'] || nothing}
        ></glide-core-slider>

        <glide-core-textarea
          label="Label"
          value=${arguments_['<glide-core-textarea>.value'] || nothing}
        ></glide-core-textarea>
      </glide-core-form-controls-layout>
    `;
  },
};

export default meta;

export const FormControlsLayout: StoryObj = {};
