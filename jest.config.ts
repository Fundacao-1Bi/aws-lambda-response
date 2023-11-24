import type { Config } from 'jest';

const jestConfig: Config = {
  verbose: true,
  collectCoverage: false,
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/*.test.{ts,tsx}'],
  modulePathIgnorePatterns: ['mocks'],
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default jestConfig;
