import { css } from 'lit';
import { visuallyHidden } from '../styles.js';

export default css`
  .display-none {
    display: none;
  }

  .flex-align-center {
    align-items: center;
    display: flex;
  }

  .component {
    display: grid;
    font-family: var(--cs-body-xs-font-family);
    font-size: var(--cs-body-sm-font-size);
    font-weight: var(--cs-body-xs-font-weight);
    /*
    * Since 1fr is actually minmax(auto, 1fr), this explicit minmax
    * will make it so the first column is sized to content, and the second column
    * extends the rest of the space.
    * */
    grid-template-columns: auto minmax(0, 1fr);
    line-height: var(--cs-body-xs-line-height);

    &.component--error {
      .input-box {
        border: 1px solid var(--cs-status-error);
      }

      .description {
        color: var(--cs-status-error);
      }

      .meta__character-count {
        color: var(--cs-status-error);
        font-weight: var(--cs-font-weight-bold);
      }
    }
  }

  .label {
    font-weight: var(--cs-font-weight-bold);
  }

  .label__required {
    color: var(--cs-status-error);
    margin-inline-start: var(--cs-spacing-xxxs);
  }

  .meta {
    display: flex;
    font-size: 0.75rem;
    grid-column: 2;
    justify-content: space-between;
    margin-block-start: var(--cs-spacing-xxxs);
  }

  .meta__character-count {
    justify-self: flex-end;
  }

  :host([required])::part(form-control-label)::after {
    display: none;
  }

  .label {
    align-items: center;
    display: flex;
    font-size: var(--cs-body-sm-font-size);
    gap: var(--cs-spacing-xxs);
    margin-block-end: 0;
  }

  .label--left {
    flex-direction: row;
    grid-column: 1;
    margin-inline-end: var(--cs-spacing-sm);
  }

  .label--top {
    flex-direction: row-reverse;
    grid-column: 2;
    justify-content: flex-end;
    margin-block-end: 0;
  }

  .label--visually-hidden {
    ${visuallyHidden};
  }

  .search-icon {
    align-items: center;
    display: flex;
  }

  .input-box {
    align-items: center;
    background-color: var(--cs-surface-base-lighter);
    border: 1px solid var(--cs-border-base-light);
    border-radius: var(--cs-spacing-xs);
    display: flex;
    flex-grow: 1;
    font-family: var(--cs-font-sans);
    grid-column: 2;
    overflow: hidden;

    &.input-box--focused {
      border-color: var(--cs-border-focus);
    }

    input {
      border: none;
      color: var(--cs-text-body-1);
      flex: 1 1 auto;
      font-family: var(--cs-font-sans);
      font-size: var(--cs-body-sm-font-size);
      font-weight: var(--cs-body-xs-font-weight);
      line-height: inherit;
      min-inline-size: 0;
      outline: none;
      padding: var(--cs-spacing-xs) var(--cs-spacing-sm);

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        appearance: none;
      }
    }

    .suffix {
      align-items: center;
      display: flex;
    }

    .prefix {
      align-items: center;
      display: flex;
    }

    /* we had to resort to an attribute selector because there may be a bug in chrome and safari
    * with ':read-only'
    * https://bugs.chromium.org/p/chromium/issues/detail?id=1519649
    */
    &.input-box--readonly {
      border: 1px solid transparent;

      input {
        padding-inline-start: 0;
      }
    }

    input:disabled {
      background-color: var(--cs-surface-base-gray-light);
      color: var(--cs-text-tertiary-disabled);
      cursor: not-allowed;
    }
  }

  .clear-icon-button,
  .password-toggle,
  .suffix {
    align-items: center;
    background: none;
    border: none;
    color: var(--cs-icon-default);
    display: inline-flex;
    justify-content: center;
    padding: 0;
  }

  .clear-icon-button,
  .password-toggle,
  .search-icon,
  ::slotted([slot='suffix']) {
    display: flex;
    padding-inline-end: var(--cs-spacing-sm);
  }

  ::slotted([slot='prefix']) {
    display: flex;
    padding-inline-start: var(--cs-spacing-sm);
  }

  .input-box--empty .clear-icon-button {
    visibility: hidden;
  }
`;
