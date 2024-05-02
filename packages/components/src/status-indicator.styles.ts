import { css } from 'lit';
export default [
  css`
    :host {
      display: contents;
    }

    .component {
      block-size: var(--cs-status-indicator-size, 1rem);
      inline-size: var(--cs-status-indicator-size, 1rem);
    }

    .failed {
      color: var(--cs-status-failed);
    }

    .idle {
      color: var(--cs-status-unknown);
    }

    .in-progress {
      color: var(--cs-status-in-progress);
    }

    .queued {
      color: var(--cs-status-queued);
    }

    .scheduled {
      color: var(--cs-status-scheduled);
    }

    .success {
      color: var(--cs-status-success);
    }

    .warning-critical {
      color: var(--cs-status-warning-critical);
    }

    .warning-high {
      color: var(--cs-status-warning-high);
    }

    .warning-informational {
      color: var(--cs-status-warning-informational);
    }

    .warning-low {
      color: var(--cs-status-warning-low);
    }

    .warning-medium {
      color: var(--cs-status-warning-medium);
    }

    .warning-zero {
      color: var(--cs-status-success);
    }
  `,
];
