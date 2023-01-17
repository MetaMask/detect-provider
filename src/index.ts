// This must be an interface so that the return type of methods within that
// interface can be `this`
/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  removeAllListeners(event?: string | symbol): this;
}

type Window = {
  ethereum?: MetaMaskEthereumProvider;
};

export = detectEthereumProvider;

/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeMetaMask - Whether to only look for MetaMask providers
 * (default: false).
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors (default: false).
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched (default: 3000).
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
async function detectEthereumProvider<T = MetaMaskEthereumProvider>({
  mustBeMetaMask = false,
  silent = false,
  timeout = 3000,
} = {}): Promise<T | null> {
  _validateInputs();

  let handled = false;

  return new Promise((resolve) => {
    if ((window as Window).ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });

      setTimeout(() => {
        handleEthereum();
      }, timeout);
    }

    /**
     * Reads `window.ethereum`, resolving the promise with the value if it is is
     * present and matches the requirement of being a MetaMask provider or if no
     * such requirement has been specified; or otherwise rejects the promise
     * with an error.
     */
    function handleEthereum() {
      if (handled) {
        return;
      }
      handled = true;

      window.removeEventListener('ethereum#initialized', handleEthereum);

      const { ethereum } = window as Window;

      if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
        resolve(ethereum as unknown as T);
      } else {
        const message =
          mustBeMetaMask && ethereum
            ? 'Non-MetaMask window.ethereum detected.'
            : 'Unable to detect window.ethereum.';

        !silent && console.error('@metamask/detect-provider:', message);
        resolve(null);
      }
    }
  });

  /**
   * Ensures that the options to `detectEthereumProvider` are correct.
   */
  function _validateInputs() {
    if (typeof mustBeMetaMask !== 'boolean') {
      throw new Error(
        `@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.`,
      );
    }
    if (typeof silent !== 'boolean') {
      throw new Error(
        `@metamask/detect-provider: Expected option 'silent' to be a boolean.`,
      );
    }
    if (typeof timeout !== 'number') {
      throw new Error(
        `@metamask/detect-provider: Expected option 'timeout' to be a number.`,
      );
    }
  }
}
