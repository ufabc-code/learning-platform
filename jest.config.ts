/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})
const jestConfig = createJestConfig({
  clearMocks: true,
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/server/**/*.ts'],
  coveragePathIgnorePatterns: [
    '.d.ts',
    '.spec.ts',
    'Factory.ts',
    '<rootDir>/src/server/repositories/',
    '<rootDir>/src/server/providers/',
  ],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/src/server/providers'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
})

export default jestConfig
