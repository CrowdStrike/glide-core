import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    :host {
      display: flex;
    }

    /* stylelint-disable-next-line csstools/use-nesting */
    :host(:focus-visible) {
      outline: none;

      & .component .radio-circle {
        box-shadow: var(--cs-glow-sm);

        ${focusOutline};
        outline-offset: 4px;
      }
    }

    .component {
      align-items: center;
      color: var(--cs-text-body-1, #212121);
      display: inline-flex;
      font-weight: var(--cs-body-md-font-weight);
      line-height: 1;

      /*
        The radio circle size may change to 16 x 16 as per Design
      */
      & .radio-circle {
        align-items: center;
        appearance: none;
        background-color: var(--cs-color-white, #fff);

        /* 14px = 0.875rem */
        block-size: 0.875rem;
        border: 1px solid var(--cs-border-base-dark, #6d6d6d);
        border-radius: 50%;
        box-sizing: border-box;
        content: ' ';
        display: inline-flex;
        inline-size: 0.875rem;
        margin: 0;
        margin-inline-end: 0.625rem;
        min-inline-size: 0.875rem;
        padding: 0;
        position: relative;

        &.checked {
          border-color: var(--cs-surface-primary, #0073e6);

          &::after {
            background-color: var(--cs-surface-primary, #0073e6);

            /*
              svg in figma has viewbox 16px, with inner circle radius of 8px, however figma element has height & width of 14px;
              14px = 0.875rem;
              8px * 0.875 = 7px = 0.4375rem;
            */
            block-size: 0.4375rem;
            border-radius: 50%;
            box-sizing: border-box;
            content: ' ';
            display: block;
            inline-size: 0.4375rem;

            /*
              svg in figma has viewbox 16px, however figma element has height & width of 14px;
              14px/16px = 0.875;
              4px radius * 0.875 = 3.5px = 0.21875rem;
            */
            inset-block-start: calc(50% - 0.2187rem);
            inset-inline-start: calc(50% - 0.2187rem);
            position: absolute;
          }
        }

        &.invalid {
          border-color: var(--cs-status-error);
        }

        &.disabled {
          border-color: var(--cs-surface-primary-disabled);
          box-shadow: none;

          &::after {
            background-color: var(--cs-surface-primary-disabled);
          }
        }
      }

      &:hover {
        & .radio-circle {
          border-color: var(--cs-border-focus, #0073e6);
          box-shadow: var(--cs-glow-sm);

          &.disabled {
            border-color: var(--cs-surface-primary-disabled);
            box-shadow: none;

            &::after {
              background-color: var(--cs-surface-primary-disabled);
            }
          }
        }
      }
    }
  `,
];
