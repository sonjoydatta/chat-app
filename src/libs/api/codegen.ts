import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
	documents: ['./src/libs/api/queries.ts', './src/libs/api/mutations.ts'],
	generates: {
		'src/libs/api/generated/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
};

export default config;
