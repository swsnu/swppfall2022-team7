module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
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
    "@typescript-eslint/semi": [2, "always"],
    "@typescript-eslint/triple-slash-reference": "off",
    
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
