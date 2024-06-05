<p align="center">
  <a href="https://www.crowdstrike.com">
    <img src="https://github.com/CrowdStrike/glide-core/blob/main/.github/cs-logo.png?raw=true" alt="CrowdStrike logo" width="300" />
  </a>
</p>

<h1 align="center">The Glide Design System from CrowdStrike</h1>

<br>

![CI status](https://github.com/crowdstrike/ember-toucan-core/actions/workflows/ci.yml/badge.svg?branch=main)

## Development

### Contributing

Follow our [Contribution Guidelines](./CONTRIBUTING.md).

### Getting started

First you'll need to install the dependencies for the repository. We use [PNPM](https://pnpm.io). Run the following command from the root of the repository:

```bash
pnpm install
pnpm dlx playwright install
```

> [!NOTE]
>
> - If you have `ignore-scripts=true` in your `~/.npmrc`, you'll also need to run `pnpm prepare`, which will install some Git hooks for linting, formatting, typechecking, and testing.
> - If you use [Volta](https://volta.sh), add `export VOLTA_FEATURE_PNPM=1` to your shell configuration to enable PNPM support.

### Running Storybook

Run the following command from the root of the repository:

```bash
pnpm start
```

After Storybook's build completes, your browser should navigate to the Storybook instance.
If this doesn't happen automatically, a URL will be shown in your terminal for you to browse to.
