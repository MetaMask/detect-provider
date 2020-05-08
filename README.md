# @metamask/detect-provider

A tiny utility for detecting the MetaMask Ethereum provider, or any provider injected at `window.ethereum`.

It has 0 dependencies and works out of the box in any modern browser, for synchronously and asynchronously injected providers.

## Usage

Keep in mind that the providers detected by this package may or may not support [the Ethereum JavaScript Provider API](https://eips.ethereum.org/EIPS/eip-1193).
Please consult [the MetaMask documentation](https://docs.metamask.io/guide/ethereum-provider.html) to learn how to use our provider.

```javascript
import detectEthereumProvider from '@metamask/detect-provider'

let provider

try {

  provider = await detectEthereumProvider()
  console.log('Ethereum successfully detected!')

  // From now on, this _should_ always be true:
  // provider === window.ethereum

  // Access the decentralized web!
  const chainId = await provider.request({
    method: 'eth_chainId
  })
} catch (error) {
  console.error('Please install MetaMask!', error)
}
```

### Options

The exported function takes an `options` object.
In most cases, you won't need to specify anything, but read on for details.

#### `options.timeout`

How many milliseconds to wait for asynchronously injected providers.

Default: `3000`

#### `options.mustBeMetaMask`

Whether `window.ethereum.isMetaMask === true` is required for the returned Promise to resolve.

Default: `false`

## Synchronous and Asynchronous Injection

Providers can be either synchronously or asynchronously injected:

- Synchronously injected providers will be available by the time website code starts executing.
- Asynchronously injected providers may not become available until later in the page lifecycle.

The MetaMask extension provider is synchronously injected, while the MetaMask mobile provider is asynchronously injected.

To notify sites of asynchronous injection, MetaMask dispatches the `ethereum#initialized` event on `window` immediately after the provider has been set as `window.ethereum`. This package relies on this event to detect asynchronous injection.
