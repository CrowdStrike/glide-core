import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

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

    &.error {
      .input-box {
        border: 1px solid var(--cs-status-error);
      }

      .description {
        color: var(--cs-status-error);
      }

      .character-count {
        color: var(--cs-status-error);
        font-weight: var(--cs-font-weight-bold);
      }
    }
  }

  .required-indicator {
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

  .character-count {
    justify-self: flex-end;
  }

  :host([required])::part(form-control-label)::after {
    display: none;
  }

  .label {
    align-items: center;
    display: flex;
    font-size: var(--cs-body-sm-font-size);
    font-weight: var(--cs-font-weight-bold);
    gap: var(--cs-spacing-xxs);
    margin-block-end: 0;
  }

  .left {
    flex-direction: row;
    grid-column: 1;
    margin-inline-end: var(--cs-spacing-sm);
  }

  .top {
    flex-direction: row-reverse;
    grid-column: 2;
    justify-content: flex-end;
    margin-block-end: 0;
  }

  .visually-hidden {
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
    gap: var(--cs-spacing-xxs);
    grid-column: 2;
    overflow: hidden;
    padding: var(--cs-spacing-xs) var(--cs-spacing-sm);

    &.focused {
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

    /* we had to resort to an attribute selector because there may be a bug in chrome and safari
    * with ':read-only'
    * https://bugs.chromium.org/p/chromium/issues/detail?id=1519649
    */
    &.readonly {
      border: 1px solid transparent;

      input {
        padding-inline-start: 0;
      }
    }

    &.disabled {
      background-color: var(--cs-surface-base-gray-light);
      color: var(--cs-text-tertiary-disabled);
    }

    input:disabled {
      cursor: not-allowed;
    }
  }

  .clear-icon-button,
  .password-toggle,
  ::slotted([slot='suffix']) {
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
  ::slotted([slot='prefix']),
  ::slotted([slot='suffix']) {
    display: flex;
  }

  .empty .clear-icon-button {
    visibility: hidden;
  }
`;
