module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/config/**/*',
    '/dist/**/*', // Ignore built files.
  ],
  plugins: ['svelte3', '@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    'quotes': ['error', 'single'],
    'max-len': ['error', {
      'code': 120,
    }],
    'object-curly-spacing': [1, 'always'],
    'indent': ['error', 2, {
      'MemberExpression': 'off',
    }],
    'import/no-unresolved': 0,
  },
};
