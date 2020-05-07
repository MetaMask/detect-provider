# @metamask/detect-provider

A tiny utility for detecting the MetaMask Ethereum Provider, or any [EIP 1193](https://eips.ethereum.org/EIPS/eip-1193)-compliant Provider.

It has 0 dependencies and works out of the box in the browser, for synchronously and asynchronously detected providers.

## Usage

```javascript
import detectProvider from '@metamask/detect-provider'

try {
  await detectProvider()
  console.log('Ethereum successfully detected!')
  // The provider will always be available here
  const { ethereum } = window
  // Do stuff!
} catch (_) {
  console.log('Please install MetaMask!')
}
```
