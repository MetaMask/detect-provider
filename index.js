/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, and rejects otherwise.
 *
 * @param {Object} options - Options bag.
 * @param {number} options.timeout - Milliseconds to wait for
 * 'ethereum#initialized' to be dispatched. Default: 3000
 * @param {boolean} options.mustBeMetaMask - True if the Provider must be MetaMask,
 * false if it can be from another wallet. Default: false
 * @returns {Promise<EthereumProvider>} A Promise that resolves to the Provider if it
 * is detected within the given timeout, and rejects otherwise.
 */
function detectProvider ({
  timeout = 3000,
  mustBeMetaMask = false,
} = {}) {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {

      handleEthereum()

    } else {

      window.addEventListener(
        'ethereum#initialized',
        handleEthereum,
        { once: true },
      )

      setTimeout(() => {
        window.removeEventListener('ethereum#initialized', handleEthereum)
        handleEthereum()
      }, timeout)
    }

    function handleEthereum () {
      const { ethereum } = window
      if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
        resolve(ethereum)
      } else {
        const message = mustBeMetaMask && ethereum
          ? 'Non-MetaMask window.ethereum detected.'
          : 'Unable to detect window.ethereum.'
        reject(new Error(message))
      }
    }
  })
}

module.exports = detectProvider
