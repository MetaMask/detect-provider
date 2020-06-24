module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    '@metamask/eslint-config',
    '@metamask/eslint-config/config/nodejs',
  ],
  plugins: [
    'json',
  ],
  globals: {
    web3: true,
    window: true,
  },
  ignorePatterns: [
    '!.eslintrc.js',
    'node_modules/',
    'dist/',
  ],
}
