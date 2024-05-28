import { css } from 'lit';

export default css`
  cs-label::part(tooltip-and-label-container) {
    align-items: flex-start;
    margin-block-start: var(--cs-spacing-sm);
  }

  .textarea-container {
    display: flex;
  }

  textarea {
    appearance: none;
    background-color: var(--cs-surface-base-lighter);
    border: 1px solid var(--cs-border-base-light);
    border-radius: 0.5rem;
    color: var(--cs-text-body-1);
    display: block;
    flex-grow: 1;
    font-family: var(--cs-body-xs-font-family);
    font-size: var(--cs-body-sm-font-size);
    font-weight: var(--cs-body-xs-font-weight);
    min-block-size: 1.1875rem;
    padding: var(--cs-spacing-xs) var(--cs-spacing-sm);
    resize: vertical;
    transition: border-color 200ms ease-in-out;

    &:hover {
      border-color: var(--cs-border-base);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border-color: var(--cs-border-focus);
    }

    &.error {
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

  .meta {
    column-gap: var(--cs-spacing-xs);
    display: flex;
    font-size: var(--cs-body-xs-font-size);
    justify-content: space-between;
  }

  .character-count {
    &.error {
      font-weight: var(--cs-font-weight-bold);
    }
  }
`;
