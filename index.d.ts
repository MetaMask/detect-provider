interface DetectEthereumProviderArgs {
  mustBeMetaMask?: boolean,
  silent?: boolean,
  timeout?: number,
}

/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param {Object} [options] - Options bag.
 * @param {boolean} [options.mustBeMetaMask] - Whether to only look for MetaMask
 * providers. Default: false
 * @param {boolean} [options.silent] - Whether to silence console errors. Does
 * not affect thrown errors. Default: false
 * @param {number} [options.timeout] - Milliseconds to wait for
 * 'ethereum#initialized' to be dispatched. Default: 3000
 * @returns {Promise<EthereumProvider | null>} A Promise that resolves with the
 * Provider if it is detected within the given timeout, otherwise null.
 */
export interface detectEthereumProvider {
  // You can get types for window.ethereum from @metamask/inpage-provider
  (options?: DetectEthereumProviderArgs): Promise<ReturnType<typeof window.ethereum | null>>;
}
