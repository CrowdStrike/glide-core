import { css } from 'lit';

export default css`
  .meta {
    column-gap: var(--cs-spacing-xs);
    display: flex;
    font-size: 0.75rem;
    grid-column: 2;
    justify-content: space-between;
  }

  .description {
    display: block;
  }

  .character-count {
    &.error {
      font-weight: var(--cs-font-weight-bold);
    }
  }

  .search-icon {
    align-items: center;
    display: flex;
  }

  .input-box {
    align-items: center;
    background-color: var(--cs-surface-base-lighter);
    block-size: 2.125rem;
    border: 1px solid var(--cs-border-base-light);
    border-radius: var(--cs-spacing-xs);
    box-sizing: border-box;
    color: var(--cs-text-body-1);
    display: flex;
    gap: var(--cs-spacing-xxs);
    line-height: var(--cs-body-xs-line-height);
    padding-inline: var(--cs-spacing-sm);

    &.error {
      border-color: var(--cs-status-error);
    }

    &.focused:not(.error) {
      border-color: var(--cs-border-focus);
    }

    /* we had to resort to an attribute selector because there may be a bug in chrome and safari
    * with ':read-only'
    * https://bugs.chromium.org/p/chromium/issues/detail?id=1519649
    */
    &.readonly {
      border: 1px solid transparent;
      padding-inline-start: 0;
    }

    &.disabled {
      background-color: var(--cs-surface-base-gray-light);
      color: var(--cs-text-tertiary-disabled);
    }

    input {
      border: none;
      color: inherit;
      cursor: inherit;
      font-family: var(--cs-font-sans);
      font-size: var(--cs-body-sm-font-size);
      font-weight: var(--cs-body-xs-font-weight);
      inline-size: 100%;
      min-inline-size: 0;
      outline: none;
      padding: 0;

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
