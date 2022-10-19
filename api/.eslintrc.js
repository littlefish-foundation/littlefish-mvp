module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: { 'max-len': ['error', { code: 180 }], 'no-underscore-dangle': 'off', 'no-plusplus': 'off' },
};
