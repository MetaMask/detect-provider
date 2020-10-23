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
    window: true,
  },
  ignorePatterns: [
    '!eslintrc.js',
    'node_modules/',
    'dist/',
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
}
