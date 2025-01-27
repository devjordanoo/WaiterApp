import type {JestConfigWithTsJest} from 'ts-jest';
import type { Config } from 'jest'

// Add any custom config to be passed to Jest
const config: JestConfigWithTsJest = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest/presets/default-esm',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {},
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
		'@models/(.*)$': '<rootDir>/src/models/$1',
		'@repositories/(.*)$': '<rootDir>/src/repositories/$1',
		'@controllers/(.*)$': '<rootDir>/src/controllers/$1',
		'@usecases/(.*)$': '<rootDir>/src/useCases/$1',
		'@database/(.*)$': '<rootDir>/src/database/$1',
		'@seeds/(.*)$': '<rootDir>/src/database/seeds/$1',
  },
  testEnvironment: 'node'
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default config
