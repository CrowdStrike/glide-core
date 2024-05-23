import { css } from 'lit';

export default css`
  .component {
    font-family: var(--cs-font-sans);

    &.error {
      .input-box {
        border: 1px solid var(--cs-status-error);
      }

      .character-count {
        color: var(--cs-status-error);
        font-weight: var(--cs-font-weight-bold);
      }
    }
  }

  .meta {
    column-gap: var(--cs-spacing-xs);
    display: flex;
    font-size: 0.75rem;
    grid-column: 2;
    justify-content: space-between;
    margin-block-start: var(--cs-spacing-xxxs);
  }

  .description {
    display: block;
  }

  .character-count {
    justify-self: flex-end;
  }

  .search-icon {
    align-items: center;
    display: flex;
  }

  .input-box {
    align-items: center;
    background-color: var(--cs-surface-base-lighter);
    block-size: 34px;
    border: 1px solid var(--cs-border-base-light);
    border-radius: var(--cs-spacing-xs);
    box-sizing: border-box;
    display: flex;
    flex-grow: 1;
    gap: var(--cs-spacing-xxs);
    grid-column: 2;
    line-height: var(--cs-body-xs-line-height);
    overflow: hidden;
    padding-inline: var(--cs-spacing-sm);

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
