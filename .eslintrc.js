module.exports = {
  root: true,

  extends: ['@metamask/eslint-config'],

  rules: {},

  overrides: [
    {
      files: ['*.ts'],
      extends: [
        '@metamask/eslint-config-browser',
        '@metamask/eslint-config-typescript',
      ],
    },

    {
      files: ['*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      extends: ['@metamask/eslint-config-nodejs'],
      rules: {
        'id-length': [
          'error',
          {
            min: 2,
            properties: 'never',
            // "t" is an acceptable variable name in Tape tests.
            exceptionPatterns: ['_', 'a', 'b', 'i', 'j', 'k', 't'],
          },
        ],
      },
    },
  ],

  ignorePatterns: [
    '!.eslintrc.js',
    '!.prettierrc.js',
    'dist/',
    'docs/',
    '.yarn/',
  ],
};
