module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': [2, 'always'],
    '@typescript-eslint/triple-slash-reference': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/display-name': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
