const jestConfig = require('@britania-crm/jest-config')

module.exports = {
  ...jestConfig,
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js']
}
