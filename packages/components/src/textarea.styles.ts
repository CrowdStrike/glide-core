import { css } from 'lit';
import { visuallyHidden } from '../styles.js';

export default css`
  .textarea {
    --textarea--border-width: 0.0625rem;
    --textarea--border-radius: 0.5rem;
    --textarea--border-color--transition: 200ms;
    --textarea--margin-block-start: 0.1875rem;
    --textarea--min-height: 1.1875rem;

    display: flex;

    font-family: var(--cs-body-xs-font-family);
    font-size: var(--cs-body-sm-font-size);
    font-weight: var(--cs-body-xs-font-weight);
    line-height: normal;
    color: var(--cs-text-body-1);

    & .label--font {
      font-weight: var(--cs-font-weight-bold);
    }

    &.column {
      display: flex;
      flex-direction: column;
    }

    & .label-container {
      display: flex;
      height: min-content;
      margin-block-start: var(--cs-spacing-sm);
      margin-inline-end: var(--cs-spacing-sm);

      &.label-container--top {
        margin-block-start: 0;
        margin-inline-end: 0;
      }
    }

    & .label-container--visually-hidden {
      ${visuallyHidden};
    }

    & .label--required {
      font-weight: var(--cs-font-weight-bold);
      margin-inline-start: var(--cs-spacing-xxxs);
      color: var(--cs-status-error);
    }

    & .container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    & .description-container {
      display: flex;
      justify-content: space-between;
      font-size: var(--cs-body-xs-font-size);

      &.description-container--invalid-color > *,
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
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      color: inherit;

      padding: var(--cs-spacing-xs) var(--cs-spacing-sm);
      margin-block-start: var(--textarea--margin-block-start);
      background-color: var(--cs-surface-base-lighter);
      resize: vertical;
      min-height: var(--textarea--min-height);

      border-radius: var(--textarea--border-radius);
      border: var(--textarea--border-width) solid var(--cs-border-base-light);

      transition: border-color var(--textarea--border-color--transition) ease-in-out;

      &.label-container--top {
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
        color: var(--cs-status-error);
        border-color: var(--cs-status-error);
      }

      &:focus-visible.invalid-color {
        border-color: var(--cs-status-error);
      }

      &[readonly] {
        border-color: transparent;
        transition: none;
        outline: none;
      }

      &[disabled] {
        background-color: var(--cs-surface-base-gray-light);
        color: var(--cs-text-tertiary-disabled);
        border: var(--textarea--border-width) solid var(--cs-border-base-light);
        cursor: not-allowed;
      }
    }
  }
`;
