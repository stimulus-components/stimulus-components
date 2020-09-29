// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // A preset that is used as a base for Jest's configuration
  preset: 'jest-puppeteer',

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: './jest/jest-setup.js',

  // A path to a module which exports an async function that is triggered once after all test suites
  globalTeardown: './jest/jest-teardown.js'
}
