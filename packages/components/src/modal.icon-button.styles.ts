import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

// The styling for this component somewhat overlaps with our existing icon-button
// component; however, there are a couple of different features that are specific
// to icon buttons in modals:
//
// 1) The color
//    Design didn't think the icon button colors defined made sense in Modals.
// 2) The icon size
//    Design wanted the SVG size to be a bit larger than what the traditional
//    icon button provides.
export default [
  css`
    .component {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: var(--cs-spacing-sm);
      color: var(--cs-icon-default);
      cursor: pointer;
      display: flex;
      padding: 0;
      transition: color 200ms ease-in-out;

      &:hover {
        color: var(--cs-text-primary-hover);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }

      & .label {
        ${visuallyHidden};
      }

      & ::slotted(*) {
        --size: 1.25rem;

        block-size: 1.25rem;
        inline-size: 1.25rem;
      }
    }
  `,
];
