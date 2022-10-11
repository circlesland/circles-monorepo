/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: './svelte.config.test.cjs',
      },
    ],
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironmentOptions: {
    testUrl: 'http://localhost/',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx,svelte,js,jsx}'],
  transformIgnorePatterns: [],
};