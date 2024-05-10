import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default css`
  .textarea {
    color: var(--cs-text-body-1);
    display: flex;
    font-family: var(--cs-body-xs-font-family);
    font-size: var(--cs-body-sm-font-size);
    font-weight: var(--cs-body-xs-font-weight);
    line-height: normal;

    & .label-font {
      font-weight: var(--cs-font-weight-bold);
    }

    &.column {
      display: flex;
      flex-direction: column;
    }

    & .label-container {
      block-size: min-content;
      display: flex;
      margin-block-start: var(--cs-spacing-sm);
      margin-inline-end: var(--cs-spacing-sm);

      &.top {
        margin-block-start: 0;
        margin-inline-end: 0;
      }
    }

    & .visually-hidden {
      ${visuallyHidden};
    }

    & .required {
      color: var(--cs-status-error);
      font-weight: var(--cs-font-weight-bold);
      margin-inline-start: var(--cs-spacing-xxxs);
    }

    & .container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    & .description-container {
      display: flex;
      font-size: var(--cs-body-xs-font-size);
      justify-content: space-between;

      &.invalid-color > *,
      .invalid-color {
        color: var(--cs-status-error);
      }

      & .character-count-container {
        margin-block-start: var(--cs-spacing-xxs);
      }

      & ::slotted([slot='description']) {
        margin-block-start: var(--cs-spacing-xxs);
      }
    }

    textarea {
      appearance: none;
      background-color: var(--cs-surface-base-lighter);
      border: 0.0625rem solid var(--cs-border-base-light);
      border-radius: 0.5rem;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      margin-block-start: 0.1875rem;
      min-block-size: 1.1875rem;
      padding: var(--cs-spacing-xs) var(--cs-spacing-sm);
      resize: vertical;
      transition: border-color 200ms ease-in-out;

      &.top {
        margin-block-start: var(--cs-spacing-xxxs);
      }

      &:hover {
        border-color: var(--cs-border-base);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        border-color: var(--cs-border-focus);
      }

      &.invalid-color {
        border-color: var(--cs-status-error);
        color: var(--cs-status-error);
      }

      &:focus-visible.invalid-color {
        border-color: var(--cs-status-error);
      }

      &[readonly] {
        border-color: transparent;
        outline: none;
        transition: none;
      }

      &[disabled] {
        background-color: var(--cs-surface-base-gray-light);
        border: 0.0625rem solid var(--cs-border-base-light);
        color: var(--cs-text-tertiary-disabled);
        cursor: not-allowed;
      }
    }
  }
`;
