module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    '@metamask/eslint-config',
    '@metamask/eslint-config/config/nodejs',
  ],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        '@metamask/eslint-config/config/typescript',
      ],
    },
    {
      files: [
        '.eslintrc.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  plugins: [
    'json',
  ],
  globals: {
    window: true,
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
  ],
}
