# @metamask/detect-provider

A tiny utility for detecting the MetaMask Ethereum provider or any provider injected at `window.ethereum`.

It has zero dependencies and works out of the box in any modern browser for synchronously and asynchronously injected providers.

## Installation

`yarn add @metamask/detect-provider`

or

`npm install @metamask/detect-provider`

## Usage

Keep in mind that the providers detected by this package may or may not support the [Ethereum JavaScript Provider API](https://eips.ethereum.org/EIPS/eip-1193).
Please consult [the MetaMask documentation](https://docs.metamask.io/guide/ethereum-provider.html) to learn how to use our provider.

### Node.js

```javascript
import detectEthereumProvider from '@metamask/detect-provider';

const provider = await detectEthereumProvider();

if (provider) {
  console.log('Ethereum successfully detected!');

  // From now on, this should always be true:
  // provider === window.ethereum

  // Access the decentralized web!

  // Legacy providers may only have ethereum.sendAsync
  const chainId = await provider.request({
    method: 'eth_chainId',
  });
} else {
  // if the provider is not detected, detectEthereumProvider resolves to null
  console.error('Please install MetaMask!');
}
```

### HTML

```html
<script src="https://unpkg.com/@metamask/detect-provider/dist/detect-provider.min.js"></script>
<script type="text/javascript">
  const provider = await detectEthereumProvider()

  if (provider) {
    // handle provider
  } else {
    // handle no provider
  }
</script>
```

## API

`detectEthereumProvider` takes an optional `options` object.
If invalid options are provided, an error will be thrown.
All options have default values.

### `options.mustBeMetaMask`

Type: `boolean`

Default: `false`

Whether `window.ethereum.isMetaMask === true` is required for the returned Promise to resolve.

### `options.silent`

Type: `boolean`

Default: `false`

Whether error messages should be logged to the console.
Does not affect errors thrown due to invalid options.

### `options.timeout`

Type: `number`

Default: `3000`

How many milliseconds to wait for asynchronously injected providers.

## Advanced topics

### Synchronous and asynchronous injection

Providers can be either synchronously or asynchronously injected:

- _Synchronously_ injected providers will be available by the time website code starts executing.
- _Asynchronously_ injected providers may not become available until later in the page lifecycle.

The MetaMask _extension_ provider is synchronously injected, while the MetaMask _mobile_ provider is asynchronously injected.

To notify sites of asynchronous injection, MetaMask dispatches the `ethereum#initialized` event on `window` immediately after the provider has been set as `window.ethereum`.
This package relies on that event to detect asynchronous injection.

### Overwriting or modifying `window.ethereum`

The detected provider object returned by this package will strictly equal (`===`) `window.ethereum` for the entire page lifecycle, unless `window.ethereum` is overwritten.
In general, consumers should never overwrite `window.ethereum` or attempt to modify the provider object.

If, as a dapp developer, you notice that the provider returned by this package does not strictly equal `window.ethereum`, something is wrong.
This may happen, for example, if the user has multiple wallets installed.
After confirming that your code and dependencies are not modifying or overwriting `window.ethereum`, you should ask the user to ensure that they only have a single provider-injecting wallet enabled at any one time.

## Contributing

### Setup

- Install [Node.js](https://nodejs.org) version 17
  - If you are using [nvm](https://github.com/creationix/nvm#installation) (recommended) running `nvm use` will automatically choose the right node version for you.
- Install [Yarn v3](https://yarnpkg.com/getting-started/install)
- Run `yarn install` to install dependencies and run any required post-install scripts

### Testing and Linting

Run `yarn test` to run the tests once. To run tests on file changes, run `yarn test:watch`.

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and fix any automatically fixable issues.

### Release & Publishing

The project follows the same release process as the other libraries in the MetaMask organization. The GitHub Actions [`action-create-release-pr`](https://github.com/MetaMask/action-create-release-pr) and [`action-publish-release`](https://github.com/MetaMask/action-publish-release) are used to automate the release process; see those repositories for more information about how they work.

1. Choose a release version.

   - The release version should be chosen according to SemVer. Analyze the changes to see whether they include any breaking changes, new features, or deprecations, then choose the appropriate SemVer version. See [the SemVer specification](https://semver.org/) for more information.

2. If this release is backporting changes onto a previous release, then ensure there is a major version branch for that version (e.g. `1.x` for a `v1` backport release).

   - The major version branch should be set to the most recent release with that major version. For example, when backporting a `v1.0.2` release, you'd want to ensure there was a `1.x` branch that was set to the `v1.0.1` tag.

3. Trigger the [`workflow_dispatch`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch) event [manually](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow) for the `Create Release Pull Request` action to create the release PR.

   - For a backport release, the base branch should be the major version branch that you ensured existed in step 2. For a normal release, the base branch should be the main branch for that repository (which should be the default value).
   - This should trigger the [`action-create-release-pr`](https://github.com/MetaMask/action-create-release-pr) workflow to create the release PR.

4. Update the changelog to move each change entry into the appropriate change category ([See here](https://keepachangelog.com/en/1.0.0/#types) for the full list of change categories, and the correct ordering), and edit them to be more easily understood by users of the package.

   - Generally any changes that don't affect consumers of the package (e.g. lockfile changes or development environment changes) are omitted. Exceptions may be made for changes that might be of interest despite not having an effect upon the published package (e.g. major test improvements, security improvements, improved documentation, etc.).
   - Try to explain each change in terms that users of the package would understand (e.g. avoid referencing internal variables/concepts).
   - Consolidate related changes into one change entry if it makes it easier to explain.
   - Run `yarn auto-changelog validate --rc` to check that the changelog is correctly formatted.

5. Review and QA the release.

   - If changes are made to the base branch, the release branch will need to be updated with these changes and review/QA will need to restart again. As such, it's probably best to avoid merging other PRs into the base branch while review is underway.

6. Squash & Merge the release.

   - This should trigger the [`action-publish-release`](https://github.com/MetaMask/action-publish-release) workflow to tag the final release commit and publish the release on GitHub.

7. Publish the release on npm.

   - Wait for the `publish-release` GitHub Action workflow to finish. This should trigger a second job (`publish-npm`), which will wait for a run approval by the [`npm publishers`](https://github.com/orgs/MetaMask/teams/npm-publishers) team.
   - Approve the `publish-npm` job (or ask somebody on the npm publishers team to approve it for you).
   - Once the `publish-npm` job has finished, check npm to verify that it has been published.
