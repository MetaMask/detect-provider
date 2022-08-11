# @0xzoz/tallyho-detect-provider

A tiny utility for detecting the Tally Ho Ethereum provider, or any provider injected at `window.ethereum`.

It has 0 dependencies and works out of the box in any modern browser, for synchronously and asynchronously injected providers.

## Usage

Keep in mind that the providers detected by this package may or may not support [the Ethereum JavaScript Provider API](https://eips.ethereum.org/EIPS/eip-1193).
Please consult [the Tally Ho documentation](https://docs.tally.cash/tally/developers/integrating-dapps) to learn how to integrate our wallet.

### Node.js

```javascript
import detectEthereumProvider from '@tallyho-detect-provider'

const provider = await detectEthereumProvider()

if (provider) {

  console.log('Ethereum successfully detected!')

  // From now on, this should always be true:
  // provider === window.ethereum

  // Access the decentralized web!

  // Legacy providers may only have ethereum.sendAsync
  const chainId = await provider.request({
    method: 'eth_chainId'
  })
} else {

  // if the provider is not detected, detectEthereumProvider resolves to null
  console.error('Please install Tally Ho!', error)
}
```

### HTML

```html
<script src=""></script>
<script type="text/javascript">
  const provider = await detectEthereumProvider()

  if (provider) {
    // handle provider
  } else {
    // handle no provider
  }
</script>
```

### Options

The exported function takes an optional `options` object.
If invalid options are provided, an error will be thrown.
All options have default values.

#### `options.mustBeTallyHo`

Type: `boolean`

Default: `false`

Whether `window.ethereum.isTally === true` is required for the returned Promise to resolve.

#### `options.silent`

Type: `boolean`

Default: `false`

Whether error messages should be logged to the console.
Does not affect errors thrown due to invalid options.

#### `options.timeout`

Type: `number`

Default: `3000`

How many milliseconds to wait for asynchronously injected providers.

## Advanced Topics

### Overwriting or Modifying `window.ethereum`

The detected provider object returned by this package will strictly equal (`===`) `window.ethereum` for the entire page lifecycle, unless `window.ethereum` is overwritten.
In general, consumers should never overwrite `window.ethereum` or attempt to modify the provider object.

If, as a dapp developer, you notice that the provider returned by this package does not strictly equal `window.ethereum`, something is wrong.
This may happen, for example, if the user has multiple wallets installed.
After confirming that your code and dependencies are not modifying or overwriting `window.ethereum`, you should ask the user to ensure that they only have a single provider-injecting wallet enabled at any one time.
