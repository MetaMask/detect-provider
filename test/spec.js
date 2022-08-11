global.window = global // mock

const test = require('tape')
const sinon = require('sinon')

const detectProvider = require('../dist')

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
const providerWithTallyHo = {
  isTally: true,
}
const providerNoTallyHo = {}
const noProvider = null

test('detectProvider: defaults with ethereum already set', async function (t) {

  mockGlobalProps(providerNoTallyHo)

  const provider = await detectProvider()

  t.deepEquals({}, provider, 'resolve with expected provider')
  t.ok(window.addEventListener.notCalled, 'addEventListener should not have been called')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener called once')
  t.end()
})

test('detectProvider: mustBeTallyHo with ethereum already set', async function (t) {

  mockGlobalProps(providerWithTallyHo)

  const provider = await detectProvider()

  t.ok(provider.isTally, 'should have resolved expected provider object')
  t.ok(window.addEventListener.notCalled, 'addEventListener should not have been called')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener called once')
  t.end()
})

test('detectProvider: mustBeTallyHo with non-TallyHo ethereum already set', async function (t) {

  mockGlobalProps(providerNoTallyHo)

  const result = await detectProvider({ timeout: 1, mustBeTally: true })
  t.equal(result, null, 'promise should have resolved null')
  t.ok(window.addEventListener.notCalled, 'addEventListener should not have been called')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener called once')
  t.end()
})

test('detectProvider: ethereum set on ethereum#initialized', async function (t) {

  mockGlobalProps(noProvider)
  const clock = sinon.useFakeTimers()

  const detectPromise = detectProvider({ timeout: 1 })

  // set ethereum and call event handler as though event was dispatched
  window.ethereum = providerWithTallyHo
  window.addEventListener.lastCall.args[1]()

  // advance clock to ensure nothing blows up
  clock.tick(1)
  clock.tick(1)

  const provider = await detectPromise

  t.ok(provider.isTally, 'should have resolved expected provider object')
  t.ok(window.addEventListener.calledOnce, 'addEventListener should have been called once')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener should have been called once')

  clock.restore()
  t.end()
})

test('detectProvider: ethereum set at end of timeout', async function (t) {

  mockGlobalProps(noProvider)
  const clock = sinon.useFakeTimers()

  const detectPromise = detectProvider({ timeout: 1 })

  // set ethereum
  window.ethereum = providerWithTallyHo

  // advance clock to trigger timeout function
  clock.tick(1)

  const provider = await detectPromise

  t.ok(provider.isTally, 'should have resolved expected provider object')
  t.ok(window.addEventListener.calledOnce, 'addEventListener should have been called once')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener should have been called once')

  clock.restore()
  t.end()
})

test('detectProvider: ethereum never set', async function (t) {

  mockGlobalProps(noProvider)

  const result = await detectProvider({ timeout: 1 })
  t.equal(result, null, 'promise should have resolved null')
  t.ok(window.addEventListener.calledOnce, 'addEventListener should have been called once')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener should have been called once')
  t.ok(console.error.calledOnce, 'console.error should have been called once')
  t.end()
})

test('detectProvider: ethereum never set (silent mode)', async function (t) {

  mockGlobalProps(noProvider)

  const result = await detectProvider({ timeout: 1, silent: true })
  t.equal(result, null, 'promise should have resolved null')
  t.ok(window.addEventListener.calledOnce, 'addEventListener should have been called once')
  t.ok(window.removeEventListener.calledOnce, 'removeEventListener should have been called once')
  t.ok(console.error.notCalled, 'console.error should not have been called')
  t.end()
})
