global.window = global // mock

const test = require('tape')
const sinon = require('sinon')

const { detectEthereumProvider } = require('../dist')

// test mocking utility
const mockGlobalProps = (ethereum) => {
  window.addEventListener = sinon.fake()
  window.removeEventListener = sinon.fake()
  console.error = sinon.fake()
  if (ethereum) {
    window.ethereum = ethereum
  } else {
    delete window.ethereum
  }
}

// different mock providers
const providerWithMetaMask = {
  isMetaMask: true,
}
const providerNoMetaMask = {}
const noProvider = null

test('detectEthereumProvider: defaults with ethereum already set', async function (t) {

  mockGlobalProps(providerNoMetaMask)

  const provider = await detectEthereumProvider()

  t.deepEquals({}, provider, 'resolve with expected provider')
  t.ok(window.addEventListener.notCalled, 'addEventListener should not have been called')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener called once')
  t.end()
})

test('detectEthereumProvider: mustBeMetamask with ethereum already set', async function (t) {

  mockGlobalProps(providerWithMetaMask)

  const provider = await detectEthereumProvider()

  t.ok(provider.isMetaMask, 'should have resolved expected provider object')
  t.ok(window.addEventListener.notCalled, 'addEventListener should not have been called')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener called once')
  t.end()
})

test('detectEthereumProvider: mustBeMetamask with non-MetaMask ethereum already set', async function (t) {

  mockGlobalProps(providerNoMetaMask)

  const result = await detectEthereumProvider({ timeout: 1, mustBeMetaMask: true })
  t.equal(result, null, 'promise should have resolved null')
  t.ok(window.addEventListener.notCalled, 'addEventListener should not have been called')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener called once')
  t.end()
})

test('detectEthereumProvider: ethereum set on ethereum#initialized', async function (t) {

  mockGlobalProps(noProvider)
  const clock = sinon.useFakeTimers()

  const detectPromise = detectEthereumProvider({ timeout: 1 })

  // set ethereum and call event handler as though event was dispatched
  window.ethereum = providerWithMetaMask
  window.addEventListener.lastCall.args[1]()

  // advance clock to ensure nothing blows up
  clock.tick(1)
  clock.tick(1)

  const provider = await detectPromise

  t.ok(provider.isMetaMask, 'should have resolved expected provider object')
  t.ok(window.addEventListener.calledOnce, 'addEventListener should have been called once')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener should have been called once')

  clock.restore()
  t.end()
})

test('detectEthereumProvider: ethereum set at end of timeout', async function (t) {

  mockGlobalProps(noProvider)
  const clock = sinon.useFakeTimers()

  const detectPromise = detectEthereumProvider({ timeout: 1 })

  // set ethereum
  window.ethereum = providerWithMetaMask

  // advance clock to trigger timeout function
  clock.tick(1)

  const provider = await detectPromise

  t.ok(provider.isMetaMask, 'should have resolved expected provider object')
  t.ok(window.addEventListener.calledOnce, 'addEventListener should have been called once')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener should have been called once')

  clock.restore()
  t.end()
})

test('detectEthereumProvider: ethereum never set', async function (t) {

  mockGlobalProps(noProvider)

  const result = await detectEthereumProvider({ timeout: 1 })
  t.equal(result, null, 'promise should have resolved null')
  t.ok(window.addEventListener.calledOnce, 'addEventListener should have been called once')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener should have been called once')
  t.ok(console.error.calledOnce, 'console.error should have been called once')
  t.end()
})

test('detectEthereumProvider: ethereum never set (silent mode)', async function (t) {

  mockGlobalProps(noProvider)

  const result = await detectEthereumProvider({ timeout: 1, silent: true })
  t.equal(result, null, 'promise should have resolved null')
  t.ok(window.addEventListener.calledOnce, 'addEventListener should have been called once')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener should have been called once')
  t.ok(console.error.notCalled, 'console.error should not have been called')
  t.end()
})
