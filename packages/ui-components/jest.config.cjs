module.exports = {
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
