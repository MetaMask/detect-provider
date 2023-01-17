global.window = global; // mock

const sinon = require('sinon');
const test = require('tape');

const detectProvider = require('../dist');

// test mocking utility
const mockGlobalProps = (ethereum) => {
  global.addEventListener = sinon.fake();
  global.removeEventListener = sinon.fake();
  console.error = sinon.fake();
  if (ethereum) {
    global.ethereum = ethereum;
  } else {
    delete global.ethereum;
  }
};

// different mock providers
const providerWithMetaMask = {
  isMetaMask: true,
};
const providerNoMetaMask = {};
const noProvider = null;

test('detectProvider: defaults with ethereum already set', async function (t) {
  mockGlobalProps(providerNoMetaMask);

  const provider = await detectProvider();

  t.deepEquals({}, provider, 'resolve with expected provider');
  t.ok(
    global.addEventListener.notCalled,
    'addEventListener should not have been called',
  );
  t.ok(
    global.removeEventListener.calledOnce,
    'removeEventListener called once',
  );
  t.end();
});

test('detectProvider: mustBeMetamask with ethereum already set', async function (t) {
  mockGlobalProps(providerWithMetaMask);

  const provider = await detectProvider();

  t.ok(provider.isMetaMask, 'should have resolved expected provider object');
  t.ok(
    global.addEventListener.notCalled,
    'addEventListener should not have been called',
  );
  t.ok(
    global.removeEventListener.calledOnce,
    'removeEventListener called once',
  );
  t.end();
});

test('detectProvider: mustBeMetamask with non-MetaMask ethereum already set', async function (t) {
  mockGlobalProps(providerNoMetaMask);

  const result = await detectProvider({ timeout: 1, mustBeMetaMask: true });
  t.equal(result, null, 'promise should have resolved null');
  t.ok(
    global.addEventListener.notCalled,
    'addEventListener should not have been called',
  );
  t.ok(
    global.removeEventListener.calledOnce,
    'removeEventListener called once',
  );
  t.end();
});

test('detectProvider: ethereum set on ethereum#initialized', async function (t) {
  mockGlobalProps(noProvider);
  const clock = sinon.useFakeTimers();

  const detectPromise = detectProvider({ timeout: 1 });

  // set ethereum and call event handler as though event was dispatched
  global.ethereum = providerWithMetaMask;
  global.addEventListener.lastCall.args[1]();

  // advance clock to ensure nothing blows up
  clock.tick(1);
  clock.tick(1);

  const provider = await detectPromise;

  t.ok(provider.isMetaMask, 'should have resolved expected provider object');
  t.ok(
    global.addEventListener.calledOnce,
    'addEventListener should have been called once',
  );
  t.ok(
    global.removeEventListener.calledOnce,
    'removeEventListener should have been called once',
  );

  clock.restore();
  t.end();
});

test('detectProvider: ethereum set at end of timeout', async function (t) {
  mockGlobalProps(noProvider);
  const clock = sinon.useFakeTimers();

  const detectPromise = detectProvider({ timeout: 1 });

  // set ethereum
  global.ethereum = providerWithMetaMask;

  // advance clock to trigger timeout function
  clock.tick(1);

  const provider = await detectPromise;

  t.ok(provider.isMetaMask, 'should have resolved expected provider object');
  t.ok(
    global.addEventListener.calledOnce,
    'addEventListener should have been called once',
  );
  t.ok(
    global.removeEventListener.calledOnce,
    'removeEventListener should have been called once',
  );

  clock.restore();
  t.end();
});

test('detectProvider: ethereum never set', async function (t) {
  mockGlobalProps(noProvider);

  const result = await detectProvider({ timeout: 1 });
  t.equal(result, null, 'promise should have resolved null');
  t.ok(
    global.addEventListener.calledOnce,
    'addEventListener should have been called once',
  );
  t.ok(
    global.removeEventListener.calledOnce,
    'removeEventListener should have been called once',
  );
  t.ok(console.error.calledOnce, 'console.error should have been called once');
  t.end();
});

test('detectProvider: ethereum never set (silent mode)', async function (t) {
  mockGlobalProps(noProvider);

  const result = await detectProvider({ timeout: 1, silent: true });
  t.equal(result, null, 'promise should have resolved null');
  t.ok(
    global.addEventListener.calledOnce,
    'addEventListener should have been called once',
  );
  t.ok(
    global.removeEventListener.calledOnce,
    'removeEventListener should have been called once',
  );
  t.ok(console.error.notCalled, 'console.error should not have been called');
  t.end();
});
