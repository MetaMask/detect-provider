/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param {Object} [options] - Options bag.
 * @param {boolean} [options.mustBeMetaMask] - Whether to only look for MetaMask
 * providers. Default: false
 * @param {number} [options.timeout] - Milliseconds to wait for
 * 'ethereum#initialized' to be dispatched. Default: 3000
 * @returns {Promise<EthereumProvider | null>} A Promise that resolves with the Provider if it
 * is detected within the given timeout, otherwise null.
 */
module.exports = function detectProvider ({
  mustBeMetaMask = false,
  timeout = 3000,
} = {}) {

  if (typeof timeout !== 'number') {
    throw new Error(`@metamask/detect-provider: Expected 'number' timeout.`)
  }
  if (typeof mustBeMetaMask !== 'boolean') {
    throw new Error(`@metamask/detect-provider: Expected 'boolean' mustBeMetaMask.`)
  }

  let handled = false

  return new Promise((resolve) => {
    if (window.ethereum) {

      handleEthereum()

    } else {

      window.addEventListener(
        'ethereum#initialized',
        handleEthereum,
        { once: true },
      )

      setTimeout(() => {
        handleEthereum()
      }, timeout)
    }

    function handleEthereum () {

      if (handled) {
        return
      }
      handled = true

      window.removeEventListener('ethereum#initialized', handleEthereum)

      const { ethereum } = window

      if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
        resolve(ethereum)
      } else {

        const message = mustBeMetaMask && ethereum
          ? 'Non-MetaMask window.ethereum detected.'
          : 'Unable to detect window.ethereum.'

        console.error('@metamask/detect-provider:', message)
        resolve(null)
      }
    }
  })
}
