module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testTimeout: 20000,
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/(?:.+?)/node_modules/",
  ],
  coveragePathIgnorePatterns: ["<rootDir>/aws"],
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    ".+\\.(t|j)s$": "ts-jest",
  },
  cacheDirectory: ".jest/.cache",
  collectCoverage: true,
  coverageDirectory: ".jest/coverage",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  collectCoverageFrom: ["<rootDir>/**/*.service.ts"],
  projects: ["<rootDir>/packages/**/jest.config.js"],
  testMatch: ["*.spec.ts", "*.spec.tsx"],
};
