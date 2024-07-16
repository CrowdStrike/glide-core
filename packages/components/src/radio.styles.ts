import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    :host {
      display: flex;
      outline: none;
    }

    /* Using nesting creates an issue on Safari with :host */
    /* stylelint-disable-next-line csstools/use-nesting */
    :host(:focus-visible) .component .radio-circle {
      ${focusOutline};
    }

    .component {
      align-items: center;
      color: var(--glide-core-text-body-1);
      display: inline-flex;
      font-weight: var(--glide-core-body-md-font-weight);
      line-height: 1;

      & .radio-circle {
        align-items: center;
        appearance: none;
        block-size: 1rem;
        border: 1px solid var(--glide-core-border-base-dark);
        border-radius: 50%;
        box-sizing: border-box;
        content: ' ';
        display: inline-flex;
        inline-size: 1rem;
        margin: 0;
        margin-inline-end: 0.625rem;
        min-inline-size: 1rem;
        padding: 0;
        position: relative;

        &.checked {
          background-color: var(--glide-core-color-white);
          border-color: var(--glide-core-surface-primary);

          &::after {
            background-color: var(--glide-core-surface-primary);
            block-size: 0.5rem;
            border-radius: 50%;
            box-sizing: border-box;
            content: ' ';
            display: block;
            inline-size: 0.5rem;
            inset-block-start: calc(50% - 0.25rem);
            inset-inline-start: calc(50% - 0.25rem);
            position: absolute;
          }
        }
      }

      &:hover {
        & .radio-circle {
          border-color: var(--glide-core-border-focus);
          box-shadow: var(--glide-core-glow-sm);
        }
      }

      &.disabled,
      &.disabled:hover {
        & .radio-circle {
          border-color: var(--glide-core-surface-primary-disabled);
          box-shadow: none;
          cursor: not-allowed;

          &::after {
            background-color: var(--glide-core-surface-primary-disabled);
          }
        }
      }
    }
  `,
];
