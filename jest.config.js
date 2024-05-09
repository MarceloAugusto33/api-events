/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: true,
  coverageProvider: 'v8',

  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ]
};