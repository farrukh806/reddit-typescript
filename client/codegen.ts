import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:8080/graphql',
	documents: 'src/graphql/**/*.graphql',
	generates: {
		'src/gql/': {
			preset: 'client',
			plugins: ['typescript', 'typescript-urql']
		}
	}
};

export default config;
