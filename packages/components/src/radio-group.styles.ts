import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      color: var(--cs-text-body-1, #212121);
      display: inline-flex;
      font-family: var(--cs-font-sans, 'Nunito');
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1;

      & .vertical {
        appearance: none;
        border: none;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
      }

      & .label-container {
        display: inline-block;
        margin-inline-end: var(--cs-spacing-sm, 0.75rem);
      }

      legend {
        ${visuallyHidden};
      }

      & .radio-container {
        border: 1px solid transparent;
        border-radius: 8px;
        display: flex;
        gap: var(--cs-spacing-xs, 0.5rem);
        margin-block-end: var(--cs-spacing-xxs, 0.25rem);
        padding: var(--cs-spacing-xxs, 0.25rem) 0.375rem;

        &.error {
          border: 1px solid var(--cs-status-error);
        }
      }

      /*
      & ::slotted(:not([slot='description'])) {
        line-height: 1;
        block-size: 14px;
      }
      */

      & ::slotted([slot='description']) {
        line-height: 1;
        padding-inline-start: 0.375rem;
      }
    }
  `,
];
