export default {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
	setupFiles: ['react-app-polyfill/jsdom'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
	],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.cjs',
		'^.+\\.css$': '<rootDir>/config/jest/cssTransform.cjs',
		'^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.cjs',
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
		'^.+\\.module\\.(css|sass|scss)$',
	],
	modulePaths: [],
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
	moduleFileExtensions: [
		'web.js',
		'js',
		'web.ts',
		'ts',
		'web.tsx',
		'tsx',
		'json',
		'web.jsx',
		'jsx',
		'node',
	],
	resetMocks: true,
};
