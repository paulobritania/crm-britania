module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/*/*.test.js', '**/*/*.test.jsx'],
  cacheDirectory: '.jest/.cache',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/(?:.+?)/node_modules/'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  moduleNameMapper: {
    '.+\\.(png|jpg|ttf|woff|woff2)$': 'file-loader'
  },
  transformIgnorePatterns: ['node_modules/(?!(@meta-*|@britania-crm))/']
}
