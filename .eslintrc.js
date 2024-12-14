// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  globals: {
    google: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
    "vue/no-v-html": "off",
  },
}
